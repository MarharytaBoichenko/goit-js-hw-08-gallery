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
  return gallery.map(({ preview, original, description }, index) => 
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      loading = "lazy"
      alt="${description}"
      data-index = "${index}"

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
  if (e.target.nodeName !== "IMG") {
    return;
  }
  modalEl.classList.add("is-open");

  modalImg.src = e.target.dataset.source;
  modalImg.alt = e.target.dataset.alt;

  window.addEventListener('keydown', onEscapeClose);
};

function onBtnModalClose(e) {
window.removeEventListener('keydown', onEscapeClose);
  modalEl.classList.remove("is-open");
  modalImg.src = "";
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
window.addEventListener("keydown", onLeftPress);

//вариант с findIndex 
//находим  индекс эл-та-картинки, что сейчас открыта в модалке
const activeImage = galleryItems.findIndex(img => img.original === modalImg.src);

function onRightPress(e) {
  console.log(e);
   if (e.code !== "ArrowRight") {
    return;
  }
  //если картінка  есть індек равен ее індеку, еслі нет індекс равен 0  и будет начинаться  с 0
  let index = activeImage ? activeImage : 0;

  if (index < galleryItems.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  console.log(index);
  console.log(galleryItems[index]);
  modalImg.src = galleryItems[index].original;
  modalImg.alt = galleryItems[index].alt;
}

function onLeftPress(e) {
  if (e.code !== "ArrowLeft") {
    return;
  }
  let index = activeImage ? activeImage : galleryItems.length - 1;
  if (index > 0) {
    index -=1
  } else {
    index = galleryItems.length - 1;
  }
  console.log(index);
  console.log(galleryItems[index].original);
  modalImg.src = galleryItems[index].original;
  modalImg.alt = galleryItems[index].alt;
}

///ленивая загрузка 
// в разметке каждой  картинке поставить  атрибут   loading = "lazy"

// можем прослушать событие загрузки картинки и   сделать например анимацию, когда картинка загрузилась

// картинка грузится ж один раз ,  поэтому слуш события  удаляется чтобы он дальше не висел , для этого  once: true
// сафари  не  поддерживает ленивки,   потому надо  не атрибутом, а пдключать библиотеку  lazysizes  

//библиотеку подключаем по условию 
const lazyImages = document.querySelectorAll('img[loading = "lazy"]');

if ('loading' in HTMLImageElement.prototype) {
  console.log(`поддерживает`);
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  })
} else {
  console.log(`НЕТ`)
  const script = document.createElement("script");
  script.scr = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";
  document.body.appendChild(script);
} 

lazyImages.forEach(img => {
  img.addEventListener('load', onImgLoaded, {once: true})
});

function onImgLoaded(e) {
  console.log(e);
  console.log("lazyImages");
  e.target.classList.add("is-loaded")
}






//вариант  с childElementCount
//не получается,  перелистывает срау на последнюю  картинку и все 

// function onRightPress() {
//   // const currentImgIndex = modalImg.dataset.index;
//   // console.log(Number(modalImg.dataset?.index));

//   const currentImgIndex = Number(modalImg.dataset?.index);
  
//   console.log(modalImg.dataset?.index);
//   console.log(galleryEl.childElementCount);
  
//   if (currentImgIndex + 1 < galleryEl.childElementCount) {
//     nextImageIndex = currentImgIndex + 1;
//   } else {
//     nextImageIndex = 0
//   }
// console.log(nextImageIndex);
//   // const nextImageIndex =
//   //   currentImgIndex + 1 < galleryEl.childElementCount ? currentImgIndex + 1 : 0;
//   //   console.log(nextImageIdx);

//     modalImg.src = galleryItems[nextImageIndex].original;
//   modalImg.alt = galleryItems[nextImageIndex].description;


//   //   setLightboxImageSrc(
//   //   galleryItems[nextImageIndex].original,
//   //   galleryItems[nextImageIndex].description,
//   //   nextImageIndex,
//   // );
// }

// function onLeftPress() {
// const currentImgIndex = Number(modalImg.dataset?.index);
//   const prevImageIndex =
//     currentImgIndex - 1 >= 0 ? currentImgIndex - 1 : galleryEl.childElementCount - 1;

//   modalImg.src = galleryItems[prevImageIndex].original;
//   modalImg.alt = galleryItems[prevImageIndex].description;


  
//   // setLightboxImageSrc(
//   //   galleryItems[prevImageIndex].original,
//   //   galleryItems[prevImageIndex].description,
//   //   prevImageIndex,
//   // );  
  
// }


///вариант  по DOM  нежелательный !
// function onRightPress({ code }) {
// //картинка,  что сейчас открыта  в модалке
//   const currentImgRef = galleryEl
//     .querySelector(`[data-source="${modalImg.src}"]`);
  
//   // console.log(currentImgRef);
//   //лишка-предок от которой будем  искать след  эл-т 
//   const parentNode = currentImgRef.closest('.gallery__item');
//   // console.log(parentNode);
//   //cлед картинка - это выбрать след лишку,  если она есть(если не последняя
//   // и в этом эл-те ли  найти  эл-т  gallery-img)
//   const nextImgRef = parentNode.nextElementSibling?.querySelector('.gallery__image');
//   // console.log(nextImgRef);
//   // ссылка  на  изображение  в найденной след  картинке -  это  то, что  находится в атрибуте data-source
//   console.log(nextImgRef.dataset.source);

//  //если нажата клавиif Вправо и если след картинка  существует,  то подменяем  ссылку  в модалке на ссылку след  картинки
//   if (code === 'ArrowRight' && nextImgRef) {
//       modalImg.src = nextImgRef.dataset.source  
//   } return;
//   //а  если  нет  дальше эл-та -??? что  сделать чтоб консоль не выдавала ошибку??
// };

// function onLeftPress({ code }) {
//   const currentImgRef = galleryEl.querySelector(`[data-source="${modalImg.src}"]`);
//   const parentNode = currentImgRef.closest(".gallery__item");
//   const previousImgRef = parentNode.previousElementSibling?.querySelector(".gallery__image");
//   ////может так лучше? 
//   if (code !== "ArrowLeft") {
//     return;
//   }
//     if (!previousImgRef) { 
//       return;
//     }  modalImg.src = previousImgRef.dataset.source; 
    
// }

  

