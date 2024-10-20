export function toggleComments() {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');
  
    const HIDE_COMMENTS = 'Hide comments';
    const SHOW_COMMENTS = 'Show comments';

    commentWrapper.style.display = 'none';
  
    showHideBtn.onclick = function() {
      const showHideText = showHideBtn.textContent;
      if (showHideText == 'Show comments') {
        showHideBtn.textContent = HIDE_COMMENTS;
        commentWrapper.style.display = 'block';
      } else {
        showHideBtn.textContent = SHOW_COMMENTS;
        commentWrapper.style.display = 'none';
      }
    };
  }
  
  export function addComment() {
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');
  
    form.onsubmit = function(e) {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      
      const sanitizeInput = (input) => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
      };
      
      const nameValue = sanitizeInput(nameField.value);
      const commentValue = sanitizeInput(commentField.value);      
  
      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;
  
      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    };
  }
  