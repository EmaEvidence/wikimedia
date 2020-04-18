const fetchArticle = (event) => {
  event.preventDefault();
  const parentElement = document.getElementById('table-of-content');
  const article = document.getElementById('article').value;
  const loading = document.getElementById('loader');
  const lang = document.getElementById('lang').value;
  loading.innerText = 'Loading...'
  fetch(`https://${lang}.wikipedia.org/w/api.php?action=parse&format=json&page=${parseSectionLine(article)}&origin=*`, {
    method: 'GET',
    headers: {
      'User-Agent': 'emmanuelalabi563@gmail.com',
    },
  }).then(function(response){
      return response.json();
    }).then(function(response) {
      const { sections } = response.parse;
      const result = {};
      const len = sections.length;
      if (len === 0) {
        const span = document.createElement('span');
        parentElement.innerHTML = '';
        span.innerText = 'No Table of Content found for this Article';
        parentElement.appendChild(span);
        document.getElementById('textHolder').innerHTML = response.parse.text['*'];
      } else {
        parentElement.innerHTML = '';
        for (let a = 0; a < len; a++) {
          const tempLen = sections[a].number.split('.').length;
          result[Number(sections[a].number)] = sections[a];
          const newDiv = document.createElement('div');
          const newAnchor = document.createElement('a');
          newAnchor.setAttribute('href', `https://${lang}.wikipedia.org/wiki/${article}#${parseSectionLine(sections[a].line)}`);
          newAnchor.setAttribute('target', 'new');
          newAnchor.innerHTML = `${sections[a].number}. ${sections[a].line}`;
          newDiv.appendChild(newAnchor);
          newDiv.style.marginLeft = `${(tempLen - 1) * 20}px`;
          parentElement.appendChild(newDiv);
        }
      }
      loading.innerText = '';
    }).catch(function (err) {
      loading.innerText = '';
      parentElement.innerHTML = 'Error Fetching Article';
    });
}

function parseSectionLine(line) {
  return line.replace(' ', '_');
}

