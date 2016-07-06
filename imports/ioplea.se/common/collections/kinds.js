import KindsSchema from '../schemas/kinds-schema.js';

export const Kinds = new Mongo.Collection("Kinds");
Kinds.attachSchema(KindsSchema);
