// main.ts
import { toggleComments, addComment } from './ui';
import { getBearData } from './bears';

document.addEventListener('DOMContentLoaded', () => {
  toggleComments();
  addComment();
  getBearData();
});
