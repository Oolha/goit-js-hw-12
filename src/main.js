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
const btnLoadMore =document.querySelector(".btn-load-more")

let image = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

formSearch.addEventListener('submit', async e => {
    e.preventDefault();
    image = inputSearch.value.trim();
    currentPage = 1;
    list.innerHTML = '';

    showLoader();
    hideLoadMore();

    if (image === '') {
        iziToast.warning({
            title: 'Warning!',
            message: "Query must be field!",
            position: 'topRight',
            backgroundColor: '#ef4040',
            layout: 2,
        })
        hideLoader();
        return;
    }
    try {
        const data = await displayImage(image, currentPage);
        console.log(data);
        maxPage = Math.ceil(data.totalHits / perPage);
        if (maxPage === 0) {
            iziToast.error({
                title: "Empty result",
                message: "No images found!"
            });
            
            hideLoader();
            updateBtnStatus();
            return; 
        }
        renderImage(data.hits);
        
    } catch(error) {
        iziToast.error({
            message: "Error!",
        })
    }
    hideLoader();
    updateBtnStatus();
    e.target.reset();
});
btnLoadMore.addEventListener('click', async () => {

    currentPage++;
    hideLoadMore();
    showLoader();
    try {
        const data = await displayImage(image, currentPage);
        
        list.insertAdjacentHTML('beforeend', renderImage(data.hits));
        skipOldElem();
    } catch {
        console.log('error');
    }
    hideLoader();
    updateBtnStatus();
});
function updateBtnStatus() {
    if (currentPage >= maxPage) {
        hideLoadMore();

        if (maxPage !== 0) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            })
        }
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

function skipOldElem() {
   const liElem = list.querySelector('.images-item');
    if (liElem) {
        const height = liElem.getBoundingClientRect().height;
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth',
        });
    }
}

 