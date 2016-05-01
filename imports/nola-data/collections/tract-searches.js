import TractSearchesSchema from '../schemas/tract-searches-schema.js';

export const TractSearches = new Mongo.Collection("TractSearches");
TractSearches.attachSchema(TractSearchesSchema);
