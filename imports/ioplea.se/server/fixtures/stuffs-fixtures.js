import { Stuffs } from '../../common/collections/stuffs.js';

const stuffs = [
  {
    name: "Fitbit",
    description: "The free Fitbit app is designed to work with Fitbit activity trackers and smart scales.",
    company: "Fitbit",
    url: "https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile",
    iconUrl: "https://lh3.googleusercontent.com/dIpnDB-EbJhzSkF1jpdHKMq0q1oq58ZsRWVKuEGzmGGaPSIwHKFq05ROAOLS4SzFUw=w300",
    // popularity:
    // version:
    // updatedAt:
  }
]

export function seedStuffs() {
  if(Stuffs.find().count() === 0) {
    _.each(stuffs, stuff => { Stuffs.insert(stuff) })
  }
}
