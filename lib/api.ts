import axios from 'axios';
export const uploadImage = async (image) => {
    console.log(image);
    const { data } = await axios.post('/api/image', image);
    return data;
}