function setActiveItems(el, name) {
  const links = document.getElementsByTagName('a');
  for (let link of links) {
    if (link === el) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  }

  getDataFromApi(`${URL}/${name}`).then(({ data }) => {
    console.log(data);
    switch (name) {
      case 'recipe':
        addItemsToDom(data);
        break;
      case 'ingredient':
        addItemsToDom(data);
        break;
      case 'nutrition':
        addItemsToDom(data);
        break;
    }
  });
}

const createItem = (item) => {
  const { id, name, description, imgUrl } = item;

  const settingsDomEl = document.createElement('div');
  settingsDomEl.setAttribute('class', 'item_settings');

  const editDomEl = document.createElement('span');
  editDomEl.innerHTML = '&#62;';

  const removeDomEl = document.createElement('span');
  removeDomEl.innerHTML = '&#215;';

  removeDomEl.addEventListener('click', (e) => removeDomElListener(e));

  const itemDomEl = document.createElement('div');
  itemDomEl.setAttribute('id', `${id}`);
  itemDomEl.setAttribute('class', 'item');

  const titleDomEl = document.createElement('h2');
  titleDomEl.className = 'item_title heading-tertiary';
  titleDomEl.innerText = name;

  const imgDomEl = document.createElement('img');
  imgDomEl.setAttribute(
    'src',
    `${
      imgUrl && imgUrl.match(/\.(jpeg|jpg|png|gif)/g)
        ? imgUrl
        : 'img/not-found.jpg'
    }`
  );
  imgDomEl.setAttribute('class', 'item_img');

  const pDomEl = document.createElement('p');
  pDomEl.innerText = textTruncate(description);
  pDomEl.setAttribute('class', 'paragraph');

  settingsDomEl.appendChild(editDomEl);
  settingsDomEl.appendChild(removeDomEl);
  itemDomEl.appendChild(settingsDomEl);
  itemDomEl.appendChild(titleDomEl);
  itemDomEl.appendChild(imgDomEl);
  itemDomEl.appendChild(pDomEl);
  return itemDomEl;
};

const addItemsToDom = (items) => {
  const list = document.querySelector('.items-list');
  removeAllChildren(list);

  if (Array.isArray(items) && items.length > 0) {
    items.map((item) => {
      list.appendChild(createItem(item));
    });
  } else if (items) {
    list.appendChild(createItem(items));
  }
};

function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function textTruncate(str = '', length = 100, ending = '...') {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

function removeDomElListener(el) {
  const currElId = el.target.parentNode.parentNode.id;
  const currLinkName = document.querySelector('.active-link').name;

  deleteDataFromApi(`${URL}/${currLinkName}/${currElId}`)
    .then((res) => {
      console.log(res);
      alert(`el from ${currLinkName} with id=${currElId} removed`);
    })
    .catch((error) => {
      console.log(error);
    });
}

const forms = document.querySelectorAll('form');

forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(form);
    form.reset();
  });
});

forms.forEach((form) => {
  form.addEventListener('formdata', (e) => {
    const data = Object.fromEntries(e.formData);
    const formName = e.target.getAttribute('name');

    postDataToApi(`${URL}/${formName}`, data)
      .then((res) => {
        if (res.status === 201) {
          alert(`${formName} with name ${data.name} created`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
