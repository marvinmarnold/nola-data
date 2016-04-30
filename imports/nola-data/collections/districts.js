import DistrictsSchema from '../schemas/districts-schema.js';

export const Districts = new Mongo.Collection("Districts");
Districts.attachSchema(DistrictsSchema);
