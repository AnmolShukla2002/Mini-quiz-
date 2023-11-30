import express from "express";

const router = express.Router();

router.get("/get-questions", getQuestions);
router.post("/submit-answer", submitAnswer);
router.post("/post-question", postQuestion);
router.get("/start-quiz", startQuiz);

export default router;
