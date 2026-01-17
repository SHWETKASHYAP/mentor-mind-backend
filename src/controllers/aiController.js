import OpenAI from "openai";
import Subject from "../models/Subject.js";
import Availability from "../models/Availability.js";
import StudyPlan from "../models/StudyPlan.js";

let client;

export const generateStudyPlan = async (req, res) => {
  try {
    // Initialize OpenAI client once
    if (!client) {
      client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    // Fetch required data
    const subjects = await Subject.find({ userId: req.user.id });
    const availability = await Availability.findOne({
      userId: req.user.id,
    });

    // Guard: subjects must exist
    if (!subjects.length) {
      return res.status(400).json({
        message: "Please add at least one subject before generating a study plan",
      });
    }

    // Guard: availability must exist
    if (!availability) {
      return res.status(400).json({
        message: "Please set your availability before generating a study plan",
      });
    }

    // Date range logic
    const startDate = new Date();

    const endDate = new Date(
      Math.max(...subjects.map(s => new Date(s.examDate).getTime()))
    );

    // Build AI prompt
    const prompt = `
You are an expert AI study planner.

Create a REALISTIC day-wise study plan in STRICT JSON only.

Study period:
- Start date: ${startDate.toDateString()}
- End date: ${endDate.toDateString()}

User availability:
- Weekdays: ${availability.weekdayHours} hours per day
- Weekends: ${availability.weekendHours} hours per day

Subjects:
${subjects
  .map(
    s =>
      `- ${s.name} (${s.difficulty}), exam on ${new Date(
        s.examDate
      ).toDateString()}`
  )
  .join("\n")}

Rules:
- Do NOT include dates outside the given range
- Prioritize subjects with earlier exams
- Hard subjects get more time
- Do NOT exceed daily available hours
- Balance workload realistically
- Output ONLY valid JSON (no markdown, no explanation)

JSON format:
{
  "summary": "",
  "plan": [
    {
      "date": "",
      "sessions": [
        {
          "subject": "",
          "hours": number,
          "focus": ""
        }
      ]
    }
  ]
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const rawText = response.choices[0].message.content;

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsedPlan = JSON.parse(cleaned);

    const savedPlan = await StudyPlan.create({
      userId: req.user.id,
      summary: parsedPlan.summary,
      plan: parsedPlan.plan,
    });

    res.json(savedPlan);
  } catch (err) {
    console.error("AI GENERATION ERROR:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
};
