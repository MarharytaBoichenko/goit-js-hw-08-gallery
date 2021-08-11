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
  console.log(e.target);
const target = e.target;
  const url = target.dataset.source;

  modalEl.classList.add("is-open");
  if (e.target.nodeName !== "IMG") {
    return;
  }
  window.addEventListener('keydown', onEscapeClose);

  modalImg.dataset.source === target.dataset.source;
  console.log(modalImg.dataset.source);
  //чтобы модалку можно было закрывать клав escape  вешаем на window  слушателя клавиатуры
  

//  modalImg.dataset.source === url;// с переменной то  же что и  выше строка
  //подменить ссылку с превью на оригинад


  

};

function onBtnModalClose(e) {
window.removeEventListener('keydown', onEscapeClose);
  modalEl.classList.remove("is-open");
  modalImg.dataset.source === "";
  //Очистка значения атрибута src элемента img.lightbox__image
}

function onEscapeClose(e) {
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
