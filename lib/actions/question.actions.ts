"use server";

import Question from "@/database/question.modal";
import { connectToDB } from "../mongoose";
import Tag from "@/database/tag.modal";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.types";
import User from "@/database/user.modal";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDB();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDB();
    const { title, content, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    // Create the tags or get them if they already exist;
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // update the question to include the
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: create an interaction record for the user's ask_question action

    // TODO: Increment autho's reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDB();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
