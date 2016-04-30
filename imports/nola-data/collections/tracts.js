import TractsSchema from '../schemas/tracts-schema.js';

export const Tracts = new Mongo.Collection("Tracts");
Tracts.attachSchema(TractsSchema);
