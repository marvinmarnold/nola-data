import { Things } from '../../common/collections/things.js';

const things = [
  {
    name: "Fitbit Flex",
    description: "Whether you want to use heart rate to take your fitness to the next level or just want to see how your steps add up each day, there’s a Fitbit tracker for your goals.",
    company: "Fitbit",
    url: "http://www.fitbit.com/flex",
    iconUrl: "http://static1.fitbit.com/simple.b-cssdisabled-png.h6d47c4010744d1379bddd255a4f3c7ab.pack?items=%2Fcontent%2Fassets%2Fflex%2Fimages%2Fslide-1-flex.png"
  }
]

export function seedThings() {
  if(Things.find().count() === 0) {
    _.each(things, thing => { Things.insert(thing) })
  }
}
