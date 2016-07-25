import AnswersSchema from '../schemas/answers-schema.js';

export const Answers = new Mongo.Collection("Answers");
Answers.attachSchema(AnswersSchema);
