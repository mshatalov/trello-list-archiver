'use strict';

const t = TrelloPowerUp.iframe({
  appKey: window.appKey,
  appName: window.appName
});
const Promise = TrelloPowerUp.Promise;

const archiveAction = 'Archive Selected';
const undoAction = 'Undo Selected';

function clear () {
  let uiList = window.archivalList;
  uiList.innerHTML = '';
  return uiList;
}

let archiveSelectedLists = function (token, close) {
  let checkboxes = window.archivalList.getElementsByClassName('list-item');
  let requests = [];
  for (let i in checkboxes) {
    if (checkboxes[i].checked) {
      let request = new XMLHttpRequest();
      request.open('PUT', `https://api.trello.com/1/lists/${checkboxes[i].value}/closed?value=${!!close}&key=${window.appKey}&token=${token}`, true);
      requests.push(new Promise((resolve, reject) => {
        request.onload = () => request.status === 200 ? resolve() : reject(request.status);
        request.onerror = reject;
        request.send();
      }));
    }
  }
  return requests;
};

let archiveSubmit = window.archiveSubmit;

let showList = function () {
  archiveSubmit.innerHTML = archiveAction;
  window.notFound.setAttribute('hidden', '');
  window.archive.removeAttribute('hidden');
};

let showNotFound = function () {
  window.archive.setAttribute('hidden', '');
  window.notFound.removeAttribute('hidden');
};

let getAction = function () {
  return archiveSubmit.innerHTML === archiveAction;
};

let toggleAction = function () {
  archiveSubmit.innerHTML = getAction() ? undoAction : archiveAction;
};

// search action
window.search.addEventListener('submit', (event) => {
  event.preventDefault();

  let q = window.search.listName.value.trim();
  return t.lists('all')
    .then((lists) => {
      let uiList = clear();

      let re = new RegExp(q);
      let found = false;
      for (let l in lists) {
        if (re.test(lists[l].name)) {
          uiList.insertAdjacentHTML(
            'beforeend',
            `<label for="i${lists[l].id}"><input type="checkbox" id="i${lists[l].id}" class="list-item" value="${lists[l].id}" checked />${lists[l].name}</label>`
          );
          found = true;
        }
      }
      return found;
    })
    .then((any) => any ? showList() : showNotFound())
    .then(() => t.sizeTo('#content'));
});

// archive/undo action
window.archive.addEventListener('submit', (event) => {
  event.preventDefault();

  archiveSubmit.setAttribute('disabled', '');
  Promise.resolve()
    .then(() => t.getRestApi().getToken())
    .then((token) => Promise.all(archiveSelectedLists(token, getAction())))
    .catch(() => t.popup({
      title: 'Oops',
      url: './error.html',
      height: 70
    }))
    .then(toggleAction)
    .then(() => archiveSubmit.removeAttribute('disabled'));
});

t.sizeTo('#content').done();
