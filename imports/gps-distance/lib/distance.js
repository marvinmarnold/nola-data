
// http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
// http://www.movable-type.co.uk/scripts/latlong.html
export default function distance {
  const R = 6371; // km
  const dLat = (lat2-lat1).toRad();
  const dLon = (lon2-lon1).toRad();
  const lat1 = lat1.toRad();
  const lat2 = lat2.toRad();

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;  
};
