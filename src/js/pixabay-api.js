import Axios from 'axios';

const axios = Axios.create(
    {
        baseURL: 'https://pixabay.com/api/',
        params: {
            key: '44419663-0e2c09df92781957132f7cc0f',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,

        }
    });


export async function displayImage(image, currentPage) {
    try {
        const res = await axios.get('', {
            params:
            {
                q: image,
                page: currentPage,
            }
        })
        return res.data;
    } catch (error) {
        iziToast.error({
            message: "Error!",
        })
    }
}




