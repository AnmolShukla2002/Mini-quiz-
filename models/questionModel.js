import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      answers: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswerIndex: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Question", questionSchema);
