import Questions from "../models/questionModel.js";

export const getQuestions = async (req, res) => {};

export const submitAnswer = async (req, res) => {};

export const postQuestion = async (req, res) => {};

export const startQuiz = async (req, res) => {
  const sections = ["verbal", "reasoning", "other", "quantitative"];
  const selectedQuestions = [];

  try {
    for (const section of sections) {
      const questions = await Questions.aggregate([
        { $match: { section } },
        { $sample: { size: 5 } },
      ]);
      selectedQuestions.push(...questions);
    }

    res.json({ questions: selectedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
