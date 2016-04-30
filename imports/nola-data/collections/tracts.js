import TractsSchema from '../schemas/tracts-schema.js';

let Tracts = new Mongo.Collection("Tracts");
Tracts.attachSchema(TractsSchema);
