
const list = document.querySelector(".image-list");

export function renderImage(images) {
    const markup = images.map((image) => {
        return `
    <li class="images-item">
    <a class="large-img-link" href="${image.largeImageURL}">
    <img class="small-img-link" src="${image.webformatURL}" alt="${image.tags}"></img>
    <div class="image-box">
    <p class="img-list-item-text">Likes: ${image.likes}</p>
    <p class="img-list-item-text">Views: ${image.views}</p>
    <p class="img-list-item-text">Comments: ${image.comments}</p>
    <p class="img-list-item-text">Downloads: ${image.downloads}</p>
    </div>
        </a>
    </li>`;
    }).join('');
    list.insertAdjacentHTML('beforeend', markup);

    return markup;
}
