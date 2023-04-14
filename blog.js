let sliderOne = document.getElementById('slider-1');
let sliderTwo = document.getElementById('slider-2');
let displayValOne = document.getElementById('ftco__number-input1');
let displayValTwo = document.getElementById('ftco__number-input2');
let minGap = 0;
let sliderTrack = document.querySelector('.slider-track');
let sliderMax = document.getElementById('slider-2').max;

const root = document.getElementById('root');
const listContainer = document.createElement('ul');

let max;
let min;
let currentPage = 1;
let allPages;
let input1;
let input2;
const developerClasses = [];
const locationClasses = [];
const handoverClasses = [];

async function getMinMaxRangeInputValues() {
  const response = await fetch('http://localhost:8000/getMinMax', { method: 'GET' });
  const data = await response.json();
  min = data.min;
  max = data.max;

  sliderOne.value = data.min;
  sliderOne.min = data.min;
  sliderOne.max = data.max;
  // fillColor();

  displayValOne.value = data.min;
  displayValOne.min = data.min;
  displayValOne.max = data.max;
  // fillColor();

  sliderTwo.value = data.max;
  sliderTwo.min = data.min;
  sliderTwo.max = data.max;
  // fillColor();

  displayValTwo.value = data.max;
  sliderTwo.value = displayValTwo.value;
  displayValTwo.min = data.min;
  displayValTwo.max = data.max;
  input2 = sliderTwo.value;
  input1 = sliderOne.value;

  fillColor();
  return data;
}

getMinMaxRangeInputValues();

async function getAllRealEstate() {
  const isDeveloperParam = !!developerClasses.length ? developerClasses.join('') : '';
  const isHandoverParam = !!handoverClasses.length ? handoverClasses.join('') : '';
  const isLocationParam = !!locationClasses.length ? locationClasses.join('') : '';
  const initialPrice = input1 && `&initialPrice=${input1}`;
  const finalPrice = input2 && `&finalPrice=${input2}`;

  if (
    !!developerClasses.length ||
    !!locationClasses.length ||
    !!handoverClasses.length ||
    !!input1 ||
    !!input2
  ) {
    const response = await fetch(
      `http://localhost:8000/getAll?page=${currentPage}${isDeveloperParam}${isHandoverParam}${isLocationParam}${initialPrice}${finalPrice}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    const data = await response.json();

    return data;
  } else {
    const response = await fetch(`http://localhost:8000/getAll?page=${currentPage}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    const data = await response.json();

    return data;
  }
}

displayValOne.addEventListener('change', async function (event) {
  const value = parseInt(event.target.value);

  if (value < min) event.target.value = min;
  if (value > max) event.target.value = max;
  sliderOne.value = value;
  input1 = value;
  listContainer.innerHTML = '';
  fillList();
  getTotalPages();
  fillColor();
});

displayValTwo.addEventListener('change', async function (event) {
  const value = parseInt(event.target.value);
  if (value < min) event.target.value = min;
  if (value > max) event.target.value = max;
  sliderTwo.value = value;
  input2 = value;
  listContainer.innerHTML = '';
  fillList();
  getTotalPages();
  fillColor();
});

sliderOne.addEventListener('change', function (event) {
  const value = parseInt(event.target.value);
  if (value < min) event.target.value = min;
  if (value > max) event.target.value = max;
  displayValOne.value = value;
  input1 = value;
  listContainer.innerHTML = '';
  fillList();
  getTotalPages();
  fillColor();
});

sliderTwo.addEventListener('change', function (event) {
  const value = parseInt(event.target.value);
  if (value < min) event.target.value = min;
  if (value > max) event.target.value = max;
  displayValTwo.value = value;
  input2 = value;
  listContainer.innerHTML = '';
  fillList();
  getTotalPages();
  fillColor();
});

function fillColor() {
  percent1 = ((sliderOne.value / sliderMax) * 10) / 430;
  percent2 = ((sliderTwo.value / sliderMax) * 10) / 430;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  // listContainer.innerHTML = '';
  // fillList();
}

async function getTotalPages() {
  const totalPages = await getAllRealEstate();
  allPages = totalPages.totalPages;
}

// filter value data
const filterData = {
  developers: [
    {
      id: 1,
      name: 'Aderans Construction',
      value: 'Aderans Construction',
    },
    {
      id: 2,
      name: 'Afik Group',
      value: 'Afik Group',
    },
    {
      id: 3,
      name: 'Ardem',
      value: 'Ardem',
    },
    {
      id: 4,
      name: 'Atoll Development',
      value: 'Atoll Development',
    },
    {
      id: 5,
      name: 'Avrasya Construction',
      value: 'Avrasya Construction',
    },
    {
      id: 6,
      name: 'Bastaslar',
      value: 'Bastaslar',
    },
  ],

  locations: [
    {
      id: 1,
      name: 'Alsancak',
      value: 'Alsancak',
    },
    {
      id: 2,
      name: 'Girne',
      value: 'Girne',
    },
    {
      id: 3,
      name: 'Boaz',
      value: 'Boaz',
    },
    {
      id: 4,
      name: 'Esentepe',
      value: 'Esentepe',
    },
    {
      id: 5,
      name: 'Famagusta',
      value: 'Famagusta',
    },
    {
      id: 6,
      name: 'Girne',
      value: 'Girne',
    },
    {
      id: 7,
      name: 'Güzelyurt',
      value: 'Güzelyurt',
    },
  ],

  handovers: [
    {
      id: 7,
      name: 'Handed over',
      value: 'Handed over',
    },
    {
      id: 1,
      name: 2022,
      value: 2022,
    },
    {
      id: 2,
      name: 2023,
      value: 2023,
    },
    {
      id: 3,
      name: 2024,
      value: 2024,
    },
    {
      id: 4,
      name: 2025,
      value: 2025,
    },
    {
      id: 5,
      name: 2025,
      value: 2025,
    },
    {
      id: 6,
      name: 2026,
      value: 2026,
    },
  ],
};
// item fill func
async function fillList() {
  const arr = await getAllRealEstate();
  function makeElem(arrItem) {
    const { name, handover, image, link, developer, location, price } = arrItem;
    let li = document.createElement('li');
    li.classList.add('filter');
    li.innerHTML = `
        <div class="${developer} ${location}">
          <div class="col-md-4 d-flex">
              <div class="blog-entry align-self-stretch">
                 <a href=${link} class="block-20 rounded image" style="background-image: url(${image});">
                </a>
                <div class="ftco__title-stack">
                  <a class="ftco__name" href=${link}>${name}</a>
                  <div class="stack">
                      <p class="ftco__item">Дата сдачи: 
                        <span class="ftco__subitem">${handover}</span>
                      </p>
                      <p class="ftco__item">Строитель: 
                        <span class="ftco__subitem">${developer}</span>
                      </p>
                      <p class="ftco__item">Локация: 
                        <span class="ftco__subitem">${location}</span>
                      </p>
                  </div>
                  <p class="ftco__price">Цена:
                      <strong class="ftco__price_child">${price.toLocaleString()}$</strong>
                  </p>
                  <div>
                      <a class="ftco__button" href=${link}>Подробнее</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
          `;
    return li;
  }

  listContainer.classList.add('list');
  const listFragment = document.createDocumentFragment();

  arr.content.forEach((item, index) => {
    try {
      const listElement = makeElem(item, index);
      listFragment.append(listElement);
    } catch (Error) {
      console.log(Error);
    }
  });
  listContainer.append(listFragment);
  root.append(listContainer);
}

// filter func
function fillFilterValue(arr, htmlTag) {
  let button = document.createElement('button');
  button.classList.add('show-all');

  const list = document.getElementById(htmlTag);
  function makeElem(arrItem) {
    const { name, value } = arrItem;
    let div = document.createElement('label');
    div.classList.add('ftco__filter_checkbox-item');
    div.innerHTML = `
        <input type="checkbox" class="ftco__checkbox-input ${htmlTag}" id=${htmlTag} name=${value} />
        <div class="ftco__custom-checkbox"></div>
        <span class="ftco__filter_label">${name}</span>
    `;
    return div;
  }

  const listContainer = document.createElement('div');
  listContainer.classList.add('ftco__filter_checkbox-list');
  const listFragment = document.createDocumentFragment();
  arr.slice(0, 5).forEach((item, index) => {
    try {
      const listElement = makeElem(item, index);
      listFragment.append(listElement);
    } catch (Error) {
      console.log(Error);
    }
  });
  listContainer.append(listFragment);
  list.append(listContainer);
}

fillFilterValue(filterData.developers, 'developer');
fillFilterValue(filterData.locations, 'location');
fillFilterValue(filterData.handovers, 'handover');
// checkbox on change func
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

async function developerCheckboxOnChange(checkboxValue, developerClasses) {
  const checkbox = document.querySelectorAll(`.${checkboxValue}`);
  const allItems = document.querySelectorAll('.filter');

  return checkbox.forEach((item) => {
    const el = document.createElement('span');
    item.addEventListener('change', async function () {
      if (this.checked) {
        el.classList.add('ftc__checkbox-check');
        el.classList.remove('ftc__checkbox-check-hide');
        insertAfter(this, el);
        developerClasses.push(`&${checkboxValue}=${this.name}`);

        listContainer.innerHTML = '';
        fillList();
        getTotalPages();
      } else {
        el.classList.remove('ftc__checkbox-check');
        el.classList.add('ftc__checkbox-check-hide');
        const index = developerClasses.indexOf(`&${checkboxValue}=${this.name}`);
        if (index > -1) {
          developerClasses.splice(index, 1);
        }
        listContainer.innerHTML = '';
        fillList();
        getTotalPages();
      }

      if (!this.checked && developerClasses.length === 0) {
        allItems.forEach((item) => (item.style.display = 'block'));
        getTotalPages();
      }
      console.log(developerClasses.join(''));
    });
  });
}

developerCheckboxOnChange('developer', developerClasses);
developerCheckboxOnChange('location', locationClasses);
developerCheckboxOnChange('handover', handoverClasses);

function showPaginationButtons() {
  const list = document.getElementById('root');
  const col = document.createElement('div');
  col.classList.add('col');
  col.classList.add('text-center');
  col.classList.add('block-27');
  col.innerHTML = `
      <ul class='pagination-button'>
      </ul>
  `;

  list.append(col);
}

showPaginationButtons();

const ul = document.querySelector('.pagination-button');

getTotalPages();

function elem(allPages, page) {
  let li = '';

  let beforePages = page - 1;
  let afterPages = page + 1;
  let liActive;

  if (page > 1) {
    const prevPage = page - 1;
    li += `<li class="ftco-pagination-arrow" onclick="elem(allPages, ${prevPage})" >&lt;</li>`;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > allPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (page == pageLength) {
      liActive = 'ftco__pagination-active';
      currentPage = pageLength;
    } else {
      liActive = '';
    }

    li += `<li class="ftco__pagination ${liActive}" onclick="elem(allPages, ${pageLength})"><span class="ftco__pagination-span">${pageLength}</span></li>`;
  }

  if (page < allPages) {
    const nexPage = page + 1;
    li += `<li class="ftco-pagination-arrow" onclick="elem(allPages, ${nexPage})">&gt;</li>`;
  }
  ul.innerHTML = li;
  getTotalPages();
  listContainer.innerHTML = '';
  fillList();
}

elem(allPages, 1);
