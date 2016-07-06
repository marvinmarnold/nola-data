import ThingsSchema from '../schemas/things-schema.js';

export const Things = new Mongo.Collection("Things");
Things.attachSchema(ThingsSchema);
