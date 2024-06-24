import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { displayImage } from "./js/pixabay-api";
import { renderImage } from "./js/render-functions";

const formSearch = document.querySelector(".form-js");
const inputSearch = document.querySelector(".input-js");
const list = document.querySelector(".image-list");
const loader = document.querySelector(".loader");
const btnSearch = document.querySelector(".btn-js");
const btnLoadMore =document.querySelector(".btn-load-more")



formSearch.addEventListener('submit', async e => {
    e.preventDefault();
    const inputValue = inputSearch.value.trim();
    if (inputValue === '') {
        list.innerHTML = ' ';
    }
    showLoader();

    try {
        const images = await displayImage(inputValue);
     if (images.hits.length !== 0) {
            renderImage(images.hits);
        }
        else {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                messageColor: '#fafafa',
                color: '#ef4040',
                position: 'topRight'

            });
        }
    }
    catch (error) {
        iziToast.error({
            message: "An error occurred while fetching images. Please try again later."
        })
    };
    hideLoader();
    e.target.reset();
    
});


let image = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 15;


btnSearch.addEventListener('click', async () => {
    image = inputSearch.value.trim();
    currentPage = 1;
    hideLoadMore();
    const data = await displayImage(image, currentPage);
    console.log(data);
    maxPage = Math.ceil(data.totalHits / perPage);
    const markup = renderImage(data.hits);
    list.innerHTML = markup;

    updateBtnStatus();
})
btnLoadMore.addEventListener('click', async () => {

    currentPage++;
    hideLoadMore();
    const data = await displayImage(image, currentPage);
    const markup = renderImage(data.hits);
    list.insertAdjacentElement('beforeend', markup);
    updateBtnStatus();
}
)

function updateBtnStatus() {
    if (currentPage >= maxPage) {
        hideLoadMore();
        iziToast.info({
            title: 'The End!',
            message: 'The end of collection',
        })
    } else {
        showLoadMore();
    }
}



function showLoadMore() {
    btnLoadMore.classList.remove('hidden');
}
function hideLoadMore() {
    btnLoadMore.classList.add('hidden');
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

