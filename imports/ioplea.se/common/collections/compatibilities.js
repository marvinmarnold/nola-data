import CompatibilitiesSchema from '../schemas/compatibilities-schema.js';

export const Compatibilities = new Mongo.Collection("Compatibilities");
Compatibilities.attachSchema(CompatibilitiesSchema);
