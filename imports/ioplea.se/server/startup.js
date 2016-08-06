import { seed } from './fixtures/fixtures.js';
import './publications/compatibilities-publications.js';
import './publications/stuffs-publications.js';
import './publications/things-publications.js';

export function startupIOPlease() {
  seed();
}
