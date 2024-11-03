// ui.ts

export function toggleComments(): void {
  const showHideBtn =
    document.querySelector<HTMLButtonElement>('button.show-hide');
  const commentWrapper =
    document.querySelector<HTMLElement>('.comment-wrapper');

  const HIDE_COMMENTS = 'Hide comments';
  const SHOW_COMMENTS = 'Show comments';

  if (commentWrapper != null) {
    commentWrapper.style.display = 'none';
  }

  if (showHideBtn != null && commentWrapper != null) {
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
  const form = document.querySelector<HTMLFormElement>('.comment-form');
  const nameField = document.querySelector<HTMLInputElement>('#name');
  const commentField = document.querySelector<HTMLInputElement>('#comment');
  const list = document.querySelector<HTMLElement>('.comment-container');

  if (
    form != null &&
    nameField != null &&
    commentField != null &&
    list != null
  ) {
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
