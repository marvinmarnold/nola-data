import { Kinds } from '../../common/collections/kinds.js';

const kinds = [
  {
    name: "Official",
    iconUrl: "check-square-o"
  },
  {
    name: "Dating",
    iconUrl: "heart"
  },
  {
    name: "Party",
    iconUrl: "birthday-cake"
  },
  {
    name: "Competition",
    iconUrl: "trophy"
  },
  {
    name: "Remote Control",
    iconUrl: "gamepad"
  },
  {
    name: "Analytics",
    iconUrl: "line-chart"
  },
]

export function seedKinds() {
  if(Kinds.find().count() === 0) {
    _.each(kinds, kind => { Kinds.insert(kind) })
  }
}
