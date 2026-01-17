import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    const { name, difficulty, examDate } = req.body;

    if (!name || !difficulty || !examDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subject = await Subject.create({
      userId: req.user.id,
      name,
      difficulty,
      examDate,
    });

    res.status(201).json(subject);
  } catch (err) {
    console.error("CREATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Failed to create subject" });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(subjects);
  } catch (err) {
    console.error("FETCH SUBJECTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    await Subject.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Subject deleted" });
  } catch (err) {
    console.error("DELETE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Failed to delete subject" });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { name, difficulty, examDate } = req.body;

    const subject = await Subject.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        name,
        difficulty,
        examDate,
      },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(subject);
  } catch (err) {
    console.error("UPDATE SUBJECT ERROR:", err);
    res.status(500).json({ message: "Failed to update subject" });
  }
};

