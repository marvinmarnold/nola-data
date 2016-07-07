import { Compatibilities } from '../../common/collections/compatibilities.js';
import { Things } from '../../common/collections/things.js';
import { Stuffs } from '../../common/collections/stuffs.js';

const compatibilities = [
  {
    thingName: "Fitbit Flex",
    stuffName: "Fitbit",
  }
]

export function seedCompatibilities() {
  if(Compatibilities.find().count() === 0) {
    _.each(compatibilities, compatibility => {
      const thing = Things.findOne({name: compatibility.thingName});
      const stuff = Stuffs.findOne({name: compatibility.stuffName});

      if(thing && stuff)
        Compatibilities.insert({thingId: thing._id, stuffId: stuff._id});
    })
  }
}
