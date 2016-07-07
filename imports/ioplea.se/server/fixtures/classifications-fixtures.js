import { Classifications } from '../../common/collections/classifications.js';
import { Kinds } from '../../common/collections/kinds.js';
import { Stuffs } from '../../common/collections/stuffs.js';

const classifications = [
  {
    kindName: "Official",
    stuffName: "Fitbit",
  }
]

export function seedClassifications() {
  if(Classifications.find().count() === 0) {
    _.each(classifications, classification => {
      const kind = Kinds.findOne({name: classification.kindName});
      const stuff = Stuffs.findOne({name: classification.stuffName});

      if(stuff && kind)
        Classifications.insert({stuffId: stuff._id, kindId: kind._id})
    })
  }
}
