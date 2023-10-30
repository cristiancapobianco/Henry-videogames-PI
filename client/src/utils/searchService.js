import { clearData, storeData } from '../redux/actions';
import axios from 'axios';

export const onSearch = async (dispatch, searchQuery) => {

    dispatch(clearData());

    let url = '';
    if (!isNaN(searchQuery)) {
        url = `http://localhost:3001/idVideogames/${searchQuery}`;
    } else if (typeof searchQuery === 'string') {

        const lowercaseQuery = searchQuery.toLowerCase();
        url = `http://localhost:3001/videogames?name=${lowercaseQuery}`;
    }

    try {

        const { data } = await axios.get(url);
        if (Array.isArray(data)) {
            dispatch(storeData(data));
        } else {
            dispatch(storeData([data]));
        }
    } catch (error) {

        console.error('Error en la búsqueda:', error);
    }
}