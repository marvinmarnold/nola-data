import ClassificationssSchema from '../schemas/classifications-schema.js';

export const Classifications = new Mongo.Collection("Classifications");
Classifications.attachSchema(ClassificationsSchema);
