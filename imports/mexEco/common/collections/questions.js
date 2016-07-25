import QuestionsSchema from '../schemas/questions-schema.js';

export const Questions = new Mongo.Collection("Questions");
Questions.attachSchema(QuestionsSchema);
