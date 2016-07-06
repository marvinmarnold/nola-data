import { Meteor } from 'meteor/meteor';
import { Tracts } from '../collections/tracts.js';
import { ServiceCalls } from '../collections/service-calls.js';
import { TractSearches } from '../collections/tract-searches.js';

Meteor.publish('tracts', () => {
  return Tracts.find();
});

Meteor.methods({
  'tracts.avgWaits': function(priorityFilter, typeFilter) {
    let tractSearch = {};
    let selector = {};

    if(priorityFilter) {
      selector.priorityNum = priorityFilter;
    }

    if(typeFilter) {
      selector.nopdType = typeFilter;
    }

    tractSearch = TractSearches.findOne(selector);

    if(tractSearch) {
      console.log('Cached tract search located');
      // console.log(tractSearch);
      return tractSearch.results;
    } else {
      console.log('No cached tract search');
      // console.log(selector);
      tractSearch = selector;
      selector.arrivedIn = {$exists: true}
      let avgWaits = [];
      let tracts = Tracts.find().fetch();

      // Caluculate waitTime (average in ms) for each district
      _.each(tracts, tract => {
        let _selector = selector;
        _selector.tractId = tract._id;

        const serviceCalls = ServiceCalls.find(_selector).fetch();

        const totalWait = _.reduce(serviceCalls, (total, serviceCall) => {
          return total + serviceCall.arrivedIn;
        }, 0);

        let waitTime;
        if(totalWait === 0) {
          waitTime = -1;
        } else {
          waitTime = totalWait / serviceCalls.length;
        }

        avgWaits.push({
          objectId: tract._id,
          waitTime: waitTime,
          message: "Wait time: " + parseInt(waitTime / 1000 / 60 )+ "min\n" +
            "Percent white: " + parseInt(tract.white / tract.totalPop * 100) + "%\n"
        })
      });

      avgWaits = _.sortBy(avgWaits, "waitTime");

      for(let i = 0; i < avgWaits.length; i++) {
        avgWaits[i].rank = i;
      }

      tractSearch.updatedAt = new Date();
      tractSearch.results = avgWaits;
      TractSearches.insert(tractSearch);

      return avgWaits;
    }
  }
});
