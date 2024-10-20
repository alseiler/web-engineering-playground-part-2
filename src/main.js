// main.js
import { toggleComments, addComment } from './ui.js';
import { getBearData } from './bears.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleComments();
  addComment();
  getBearData();
});
