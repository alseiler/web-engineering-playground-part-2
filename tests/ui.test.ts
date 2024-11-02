// tests/ui.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { toggleComments } from '../src/ui';

describe('toggleComments', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="show-hide">Show comments</div>
      <div class="comment-wrapper" style="display: none;"></div>
    `;
    toggleComments();
  });

  it('should display comments when "Show comments" is clicked', () => {
    const showHideBtn = document.querySelector<HTMLElement>('.show-hide') as HTMLElement;
    const commentWrapper = document.querySelector('.comment-wrapper') as HTMLElement;

    showHideBtn.click();

    expect(showHideBtn.textContent).toBe('Hide comments');
    expect(commentWrapper.style.display).toBe('block');
  });

  it('should hide comments when "Hide comments" is clicked', () => {
    const showHideBtn = document.querySelector('.show-hide') as HTMLElement;
    const commentWrapper = document.querySelector('.comment-wrapper') as HTMLElement;

    // First click to show comments
    showHideBtn.click();
    // Second click to hide comments
    showHideBtn.click();

    expect(showHideBtn.textContent).toBe('Show comments');
    expect(commentWrapper.style.display).toBe('none');
  });
});
