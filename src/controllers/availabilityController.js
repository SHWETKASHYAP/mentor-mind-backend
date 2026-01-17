import Availability from "../models/Availability.js";

export const setAvailability = async (req, res) => {
  try {
    const { weekdayHours, weekendHours } = req.body;

    if (weekdayHours == null || weekendHours == null) {
      return res.status(400).json({ message: "All fields required" });
    }

    const availability = await Availability.findOneAndUpdate(
      { userId: req.user.id },
      { weekdayHours, weekendHours },
      { upsert: true, new: true }
    );

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Failed to save availability" });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      userId: req.user.id,
    });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};
