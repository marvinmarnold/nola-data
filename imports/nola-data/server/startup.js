import '../api/districts-publications.js';
import '../api/tracts-publications.js';

import seedDistrictFixtures from './fixtures/district-fixtures.js';
import seedTractFixtures from './fixtures/tract-fixtures.js';

export default function startupNolaDataServer() {
  seedDistrictFixtures();
  seedTractFixtures();
}
