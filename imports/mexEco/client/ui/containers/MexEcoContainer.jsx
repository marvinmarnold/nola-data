import { createContainer } from 'meteor/react-meteor-data';

import Draw from 'mapbox-gl-draw';

import MexEco from '../pages/MexEco.jsx';
import { SESSION } from '../../constants.js';
import { Polygons } from '../../../common/collections/polygons.js';

let map
export default MexEcoContainer = createContainer(() => {
  currentPolygon = Session.get(SESSION.POLYGON);
  insertingPolygon = Session.get(SESSION.INSERTING);

  console.log("insertingPolygon");
  console.log(insertingPolygon);

  console.log("currentPolygon");
  console.log(currentPolygon);

  const initMap = () => {
    if(!map) {
      mapboxgl.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/unplugged/ciqzoiuob0008bmm6gxph8irp',
        center: [-99.138173, 19.416424],
        zoom: 5
      });

      var draw = Draw({
        controls: {
          point: false,
          line_string: false,
          polygon: true,
          trash: false
        }
      });
      map.addControl(draw);

      // draw controls
      map.on('draw.create', (event) => {
        _.each(event.features, poly => {
          const polygon = {
            name: poly.id,
            geoJSON: {
              type: poly.type,
              geometry: {
                type: poly.geometry.type,
                coordinates: poly.geometry.coordinates[0]
              }
            }
          }

          Session.set(SESSION.POLYGON, polygon);
          Session.set(SESSION.INSERTING, true);
        })
      });
    }

  };

  return {
    map,
    initMap,
    currentPolygon,
    insertingPolygon,
  };
}, MexEco);
