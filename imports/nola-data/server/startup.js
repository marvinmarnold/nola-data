import '../api/districts-publications.js';
import seedDistrictFeatures from './fixtures/district-fixtures.js';

export default function startupNolaDataServer() {
  seedDistrictFeatures();
}
