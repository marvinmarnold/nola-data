import { Tracts } from '../../collections/tracts.js';
import { RawTracts } from './raw-tracts.js';

export default function seedTractFixtures() {
  // console.log('district-fixtures:seedDistrictFeatures');
  if(Tracts.find().count() === 0) {
    _.each(RawTracts, tract => {
      // console.log('district-fixtures:seedDistrictFeatures each');

      let i = 0;
      const boundaries = _.map(tract.geometry.coordinates[0], lnglat => {
        const edge = { longitude: lnglat[0], latitude: lnglat[1], ordinal: ++i };
        // console.log('district-features:seedDistrictFeatures edge');
        // console.log(edge);

        return edge;
      })
      // console.log('district-features:seedDistrictFeatures boundary length: ' + boundaries.length);

      const properties = tract.properties;
      const tractId = Tracts.insert({
        name: properties.GEOID10,
        landArea: properties.ALAND10,
        waterArea: properties.AWATER10,
        latitude: parseFloat(properties.INTPTLAT10),
        longitude: parseFloat(properties.INTPTLON10),
        totalPop: properties.TOTAL_POP,
        white: properties.WHITE,
        black: properties.BLACK,
        amerIndian: properties.AMER_IND,
        asian: properties.ASIAN,
        pacIslander: properties.PAC_ISLNDR,
        other: properties.OTHER_RACE,
        multi: properties.MULTI_RACE,
        hispanic: properties.HISPANIC,
        nonHispanic: properties.NON_HISP,
        totalHomes: properties.TOTAL_HU,
        occupiedHomes: properties.OCC_HU,
        unoccoupiedHomes: properties.VACANT_HU,
        boundaries: boundaries
      });

      console.log("Tract inserted " + tractId);
    });
  }
}
