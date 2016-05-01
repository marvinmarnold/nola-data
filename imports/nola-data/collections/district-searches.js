import DistrictSearchesSchema from '../schemas/district-searches-schema.js';

export const DistrictSearches = new Mongo.Collection("DistrictSearches");
DistrictSearches.attachSchema(DistrictSearchesSchema);
