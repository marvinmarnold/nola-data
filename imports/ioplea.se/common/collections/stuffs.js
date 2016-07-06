import StuffsSchema from '../schemas/stuffs-schema.js';

export const Stuffs = new Mongo.Collection("Stuffs");
Stuffs.attachSchema(StuffsSchema);
