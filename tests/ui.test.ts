// tests/ui.test.ts

import { toggleComments, addComment } from '../src/ui';
import { beforeEach, describe, expect, it } from 'vitest';

describe('toggleComments', () => {
  let showHideBtn: HTMLButtonElement | null;
  let commentWrapper: HTMLElement | null;

  beforeEach(() => {
    // Set up the DOM elements needed for the tests
    document.body.innerHTML = `
      <section class="comments">
        <button class="show-hide">Show comments</button>
        <div class="comment-wrapper">
          <!-- Comments will be here -->
        </div>
      </section>
    `;

    // Initialize the toggleComments function
    toggleComments();

    showHideBtn = document.querySelector('button.show-hide');
    commentWrapper = document.querySelector('.comment-wrapper');
  });

  it('should display comments when "Show comments" is clicked', () => {
    // Initial state: comments are hidden
    expect(commentWrapper?.style.display).toBe('none');
    expect(showHideBtn?.textContent).toBe('Show comments');

    // Simulate click event
    showHideBtn?.click();

    // After click: comments are shown
    expect(commentWrapper?.style.display).toBe('block');
    expect(showHideBtn?.textContent).toBe('Hide comments');
  });

  it('should hide comments when "Hide comments" is clicked', () => {
    // Show comments first
    showHideBtn?.click();

    // Comments should now be visible
    expect(commentWrapper?.style.display).toBe('block');
    expect(showHideBtn?.textContent).toBe('Hide comments');

    // Simulate click event to hide comments
    showHideBtn?.click();

    // After click: comments are hidden
    expect(commentWrapper?.style.display).toBe('none');
    expect(showHideBtn?.textContent).toBe('Show comments');
  });
});

describe('addComment', () => {
  let form: HTMLFormElement | null;
  let nameField: HTMLInputElement | null;
  let commentField: HTMLInputElement | null;
  let list: HTMLElement | null;

  beforeEach(() => {
    // Set up the DOM elements needed for the tests
    document.body.innerHTML = `
      <section class="comments">
        <div class="comment-wrapper">
          <form class="comment-form">
            <div class="flex-pair">
              <label for="name">Your name:</label>
              <input type="text" name="name" id="name" placeholder="Enter your name">
            </div>
            <div class="flex-pair">
              <label for="comment">Your comment:</label>
              <input type="text" name="comment" id="comment" placeholder="Enter your comment">
            </div>
            <div>
              <input type="submit" value="Submit comment">
            </div>
          </form>
          <h2>Comments</h2>
          <ul class="comment-container"></ul>
        </div>
      </section>
    `;

    // Initialize the addComment function
    addComment();

    form = document.querySelector('.comment-form');
    nameField = document.querySelector('#name');
    commentField = document.querySelector('#comment');
    list = document.querySelector('.comment-container');
  });

  it('should add a comment to the list when the form is submitted', () => {
    if (
      form != null &&
      nameField != null &&
      commentField != null &&
      list != null
    ) {
      // Set input values
      nameField.value = 'Jane Doe';
      commentField.value = 'This is a test comment.';

      // Simulate form submission
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // Check that the comment was added to the list
      const listItems = list.querySelectorAll('li');
      expect(listItems.length).toBe(1);

      const listItem = listItems[0];
      const namePara = listItem.querySelector('p:nth-child(1)');
      const commentPara = listItem.querySelector('p:nth-child(2)');

      expect(namePara?.textContent).toBe('Jane Doe');
      expect(commentPara?.textContent).toBe('This is a test comment.');

      // Ensure the input fields are cleared
      expect(nameField.value).toBe('');
      expect(commentField.value).toBe('');
    } else {
      throw new Error('Form elements not found');
    }
  });
});
