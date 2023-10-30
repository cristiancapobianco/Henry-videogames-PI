
import { ADD_GAME, REMOVE_ITEM, CLEAR_DATA, STORE_DATA, SET_CURRENT_PAGE, STORE_GENRES, SET_GENRE_FILTER, SET_SORT_FILTER } from "./actions";

const initialState = {
    games: [],
    currentPage: 1,
    genres: [],
    genreFilter: "",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GAME:
            return {
                ...state,
                games: [...state.games, action.payload],
            };
        case REMOVE_ITEM:
            return {
                ...state,
                games: state.games.filter((elemt) => elemt.id !== action.payload),
            };
        case CLEAR_DATA:
            return {
                ...state,
                games: []
            };
        case STORE_DATA:
            return {
                ...state,
                games: action.payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case STORE_GENRES:
            return {
                ...state,
                genres: action.payload,
            };
        case SET_GENRE_FILTER:
            return {
                ...state,
                genreFilter: action.payload,
            };
        case SET_SORT_FILTER:
            return {
                ...state,
                sortFilter: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;