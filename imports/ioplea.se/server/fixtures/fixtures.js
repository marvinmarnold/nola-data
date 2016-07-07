import { seedThings } from './things-fixtures.js';
import { seedStuffs } from './stuffs-fixtures.js';
import { seedCompatibilities } from './compatibilities-fixtures.js';
import { seedKinds } from './kinds-fixtures.js';
import { seedClassifications } from './classifications-fixtures.js';

export function seed() {
  seedThings();
  seedStuffs();
  seedCompatibilities();
  seedKinds();
  seedClassifications();
}
