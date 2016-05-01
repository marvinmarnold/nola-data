import ServiceCallsSchema from '../schemas/service-calls-schema.js';

export const ServiceCalls = new Mongo.Collection("ServiceCalls");
ServiceCalls.attachSchema(ServiceCallsSchema);
