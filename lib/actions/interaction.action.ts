"use server";

import Question from "@/database/question.modal";
import { connectToDB } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.modal";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDB();
    const { questionId, userId } = params;
    // update view count for the question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) return console.log("user already viewed this");

      // create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log("connection to db error", error);
    throw error;
  }
}
