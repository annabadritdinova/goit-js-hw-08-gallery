import items from './gallery-items.js';
const refs = {
	lightbox: document.querySelector('.js-lightbox'),
	gallery: document.querySelector('.js-gallery'),
	lightbox__overlay: document.querySelector('.lightbox__overlay'),
	lightbox__button: document.querySelector('.lightbox__button'),
	lightbox__image: document.querySelector('.lightbox__image'),
};
let index = 0;
const createdListOfElements = function (array) {
	let itemElement = array.map((picture) => {
		
		let itemList = document.createElement('li');
		let imageElement = document.createElement('img');
		let linkElement = document.createElement('a');
		
		imageElement.classList.add('gallery__image');
		itemList.classList.add('gallery__item');
		linkElement.classList.add('gallery__link');
		
		imageElement.src = picture.preview;
		imageElement.dataset.source = picture.original;
		imageElement.alt = picture.description;
		imageElement.dataset.id = index += 1;
		
		itemList.append(linkElement);
		linkElement.append(imageElement);
		return itemList;
	});
	return itemElement;
};
refs.gallery.append(...createdListOfElements(items));

function openLightbox() {
	refs.lightbox.classList.add('is-open');
	refs.lightbox__image.src = event.target.dataset.source;
	index = parseInt(event.target.dataset.id);
	
    window.addEventListener('keydown', nextImage);
	window.addEventListener('keydown', previousImage);
	window.addEventListener('keydown', pressEscape);
}

function closeLightbox() {
	refs.lightbox.classList.remove('is-open');
	refs.lightbox__image.src = '';
	
	window.removeEventListener('keydown', nextImage);
	window.removeEventListener('keydown', previousImage);
	window.removeEventListener('keydown', pressEscape);
}

function pressEscape() {
	if (event.key === 'Escape') {
		closeLightbox();
	}
}

function nextImage() {
	if (event.key === 'ArrowRight') {
		if (index < items.length) {
			index += 1;
			refs.lightbox__image.src = items[index - 1].original;
		} else {
			index = 1;
			refs.lightbox__image.src = items[index - 1].original;
		}
	}
}

function previousImage() {
	if (event.key === 'ArrowLeft') {
		if (index !== 1) {
			index -= 1;
			refs.lightbox__image.src = items[index - 1].original;
		} else {
			index = items.length;
			refs.lightbox__image.src = items[index - 1].original;
		}
	}
}

refs.lightbox__button.addEventListener('click', closeLightbox);
refs.lightbox__overlay.addEventListener('click', () => {
	if (event.target === event.currentTarget) {
		closeLightbox();
	}
});

refs.gallery.addEventListener('click', () => {
	event.preventDefault;
	if (event.target.nodeName !== 'IMG') {
		return;
	}
	openLightbox();
});



