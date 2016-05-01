import Socrata from 'node-socrata';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { ServiceCalls } from '../../collections/service-calls.js';
import { Districts } from '../../collections/districts.js';
import { Tracts } from '../../collections/tracts.js';

export default function seedServiceCalls() {
  var config = {
    hostDomain: 'https://data.nola.gov',
    // An accessible API table from the host domain
    resource: 'wgrp-d3ma',
    // Create account and register app https://opendata.socrata.com
    XAppToken: Meteor.settings.SOCRATA_APP_TOKEN
  };

  const socrata = new Socrata(config);

  socrataFetch(socrata, 0);
}

const socrataFetch = function(socrata, offset) {
  console.log("socrataFetch " + offset);
  var socrataCallback = Meteor.bindEnvironment(function(err, response, data) {
    _.each(data, insertServiceCall)

      if(data.length > 0)
        socrataFetch(socrata, offset + 1000)
    }, function(error) {
      console.log("Socrata callback could not bind: " + error.message);
    })

  socrata.get({$offset: offset}, socrataCallback);
}

const insertServiceCall = function(doc) {
  let serviceCall = ServiceCalls.findOne({nopdItem: doc.nopd_item});
  let serviceCallId;

  if(!!serviceCall) {
    serviceCallId = serviceCall._id
  } else {
    serviceCall = {
      nopdItem: doc.nopd_item,
      latitude: doc.location.latitude,
      longitude: doc.location.longitude,
      createdAt: new Date(doc.timecreate),
      closedAt: new Date(doc.timeclosed),
      nopdType: doc.type_,
      nopdTypeDesc: doc.typetext,
      block: doc.block_address,
      priorityNum: doc.priority.substr(0,1),
      priorityLetter: doc.priority.substr(1),
    }

    const district = Districts.findOne({name: doc.policedistrict});

    if(district)
      serviceCall.districtId = district._id;

    if(doc.timearrive)
      serviceCall.arrivedAt = new Date(doc.timearrive)

    if(doc.timedispatch)
      serviceCall.dispatchedAt = new Date(doc.timedispatch)

    if(doc.zip)
      serviceCall.zip = doc.zip

    if(serviceCall.createdAt && serviceCall.dispatchedAt) {
      var createdAt = serviceCall.createdAt.getTime()
      var dispatchedAt = serviceCall.dispatchedAt.getTime()
      serviceCall.dispatchedIn = dispatchedAt - createdAt
    }

    if(serviceCall.createdAt && serviceCall.arrivedAt) {
      var createdAt = serviceCall.createdAt.getTime()
      var arrivedAt = serviceCall.arrivedAt.getTime()
      serviceCall.arrivedIn = arrivedAt - createdAt
    }

    serviceCallId = ServiceCalls.insert(serviceCall);
  }

  if(!serviceCall.tractId) {
    var tractLookupURL = "http://data.fcc.gov/api/block/2010/find?latitude=" +
      doc.location.latitude +
      "&longitude=" + doc.location.longitude +
      "&format=json";

    HTTP.get(tractLookupURL, function(error, response) {
      if(response.data && response.data.Block && response.data.Block.FIPS) {

        var geoId = response.data.Block.FIPS
        if(geoId) {
          geoId = geoId.substr(0,11);
          var tract = Tracts.findOne({name: geoId});

          if(tract) {
            ServiceCalls.update(serviceCallId, {$set: {tractId: tract._id}})
          }
        }
      }
    });
  }
}
