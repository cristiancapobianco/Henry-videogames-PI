// Acción para agregar un elemento
export const ADD_GAME = "ADD_GAME";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_DATA = "CLEAR_DATA"
export const STORE_DATA = "STORE_DATA"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const STORE_GENRES = 'STORE_GENRES';
export const SET_GENRE_FILTER = 'SET_GENRE_FILTER';
export const SET_SORT_FILTER = 'SET_SORT_FILTER';


export const addGame = (item) => ({ 
    type: ADD_GAME,
    payload: item,
});

export const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    payload: itemId,
});

export const clearData = () => ({
    type: CLEAR_DATA,
});

export const storeData = (data) => ({
    type: STORE_DATA,
    payload: data,
});
export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};
export const storeGenres = (genres) => ({
    type: STORE_GENRES,
    payload: genres,
});

export const setGenreFilter = (genre) => ({
    type: SET_GENRE_FILTER,
    payload: genre,
});

export const setSortFilter = (sortType) => ({
    type: SET_SORT_FILTER,
    payload: sortType,
});