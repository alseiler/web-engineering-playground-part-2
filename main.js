// functionality for showing/hiding the comments section

var showHideBtn = document.querySelector('.show-hide');
var commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideBtn.onclick = function() {
  var showHideText = showHideBtn.textContent;
  if(showHideText == 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// functionality for adding a new comment via the comments form

var form = document.querySelector('.comment-form');
var nameField = document.querySelector('#name');
var commentField = document.querySelector('#comment');
var list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  var listItem = document.createElement('li');
  var namePara = document.createElement('p');
  var commentPara = document.createElement('p');
  var nameValue = nameField.value;
  var commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
};

// Function to fetch the image URLs based on the file names
var baseUrl = "https://en.wikipedia.org/w/api.php";
var title = "List_of_ursids";

var params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
};

const fetchImageUrl = async (fileName) => {
  const imageParams = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const imageUrl = Object.values(pages)[0].imageinfo[0].url;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image URL: ", error);
    return 'placeholder-panda.jpg'; 
  }
};


// Function to extract bear data from the wikitext
const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|\(]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        
        try {
          const imageUrl = await fetchImageUrl(fileName);
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl, 
            range: rangeMatch[1].trim()
          };
          bears.push(bear);
        } catch (error) {
          console.error("Error fetching bear details: ", error)
        }
      }
    }
  }

  // Update UI after processing all bears
  const moreBearsSection = document.querySelector('.more_bears');
  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
  });     
};

const getBearData = async () => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const wikitext = data.parse.wikitext['*'];
    extractBears(wikitext);
  } catch(error) {
    console.error("Error fetching bear data: ", error);
  }
}

// Fetch and display the bear data
getBearData();
