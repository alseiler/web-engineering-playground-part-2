// ui.ts

export function toggleComments(): void {
  const showHideBtn = document.querySelector('.show-hide') as HTMLElement | null;
  const commentWrapper = document.querySelector('.comment-wrapper') as HTMLElement | null;

  const HIDE_COMMENTS = 'Hide comments';
  const SHOW_COMMENTS = 'Show comments';

  if (commentWrapper) {
    commentWrapper.style.display = 'none';
  }

  if (showHideBtn && commentWrapper) {
    showHideBtn.onclick = function () {
      const showHideText = showHideBtn.textContent;
      if (showHideText === 'Show comments') {
        showHideBtn.textContent = HIDE_COMMENTS;
        commentWrapper.style.display = 'block';
      } else {
        showHideBtn.textContent = SHOW_COMMENTS;
        commentWrapper.style.display = 'none';
      }
    };
  } else {
    console.error('Error: Required elements not found in the DOM.');
  }
}

export function addComment(): void {
  const form = document.querySelector('.comment-form') as HTMLFormElement | null;
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector('#comment') as HTMLInputElement | null;
  const list = document.querySelector('.comment-container') as HTMLElement | null;

  if (form && nameField && commentField && list) {
    form.onsubmit = function (e: Event) {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      const sanitizeInput = (input: string): string => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
      };

      const nameValue = sanitizeInput(nameField.value);
      const commentValue = sanitizeInput(commentField.value);

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
      list.appendChild(listItem);

      nameField.value = '';
      commentField.value = '';
    };
  } else {
    console.error('Error: Required form elements not found in the DOM.');
  }
}
