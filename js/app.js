const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEl = document.querySelector(".js-gallery")
console.log(galleryEl);
const galleryMarkup = createGalleryMarkup(galleryItems);
console.log(galleryMarkup);

 galleryEl.insertAdjacentHTML("beforeend", galleryMarkup)

function createGalleryMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => 
   
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  ).join("");
  
};

const modalEl = document.querySelector(".lightbox")
console.log(modalEl);
const btnModalClose = document.querySelector("[data-action='close-lightbox']");
console.log(btnModalClose);
const overlayEl = document.querySelector(".lightbox__overlay")
console.log(overlayEl);
const modalImg = document.querySelector(".lightbox__image")

galleryEl.addEventListener('click', onImgLinkClick);
btnModalClose.addEventListener("click", onBtnModalClose);
overlayEl.addEventListener('click', onBtnModalClose)

function onImgLinkClick(e) {
  e.preventDefault();
  modalEl.classList.add("is-open");
  if (e.target.nodeName !== "IMG") {
    return;
  }

  window.addEventListener('keydown', onEscapeClose);
  modalImg.src = e.target.dataset.source;
};

function onBtnModalClose(e) {
window.removeEventListener('keydown', onEscapeClose);
  modalEl.classList.remove("is-open");
  modalImg.src === "";
  //Очистка значения атрибута src элемента img.lightbox__image
}

function onEscapeClose(e) {
  console.log(e);
  // проверяем  клавишу  нажатую
  if (e.code === "Escape") {
    onBtnModalClose();
}
}

function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    onBtnModalClose();
  }
}

//пролистывание 




window.addEventListener('keydown', onRightPress);
window.addEventListener("keydown", onLeftPress)



function onRightPress({ code }) {
//картинка,  что сейчас открыта  в модалке
  const currentImgRef = galleryEl
    .querySelector(`[data-source="${modalImg.src}"]`);
  
  console.log(currentImgRef);

  //лишка-предок от которой будем  искать след  эл-т 
  const parentNode = currentImgRef.closest('.gallery__item');
  console.log(parentNode);
  
  //лед картинка - это выбрать след лишку,  если она есть(если не последняя
  // и в этом эл-те ли  найти  эл-т  gallery-img)
  const nextImgRef = parentNode.nextElementSibling?.querySelector('.gallery__image');
  console.log(nextImgRef);

  // ссылка  на  изображение  в найденной след  картинке -  это  то, что  находится в атрибуте data-source
  console.log(nextImgRef.dataset.source);

 //если нажата клавиif Вправо и если след картинка  существует,  то подменяем  ссылку  в модалке на ссылку след  картинки
  if (code === 'ArrowRight' && nextImgRef) {
      modalImg.src = nextImgRef.dataset.source
      
  } //а  если  нет  дальше эл-та -??? что  сделать чтоб консоль не выдавала ошибку??

};

function onLeftPress({ code }) {
  const currentImgRef = galleryEl.querySelector(`[data-source="${modalImg.src}"]`);
  console.log(currentImgRef);

  const parentNode = currentImgRef.closest(".gallery__item");
  console.log(parentNode);

  const previousImgRef = parentNode.previousElementSibling?.querySelector(".gallery__image");
  console.log(previousImgRef);

  ////может так? 
  if (code !== "ArrowLeft") {
    return;
  }
    if (previousImgRef) {
      modalImg.src = previousImgRef.dataset.source; 
    } 
   
}
///почему  при нажатии любой    стрелки отрабатывают консоли двух функций??
///и при нажатии  любой клавиши ///

  

