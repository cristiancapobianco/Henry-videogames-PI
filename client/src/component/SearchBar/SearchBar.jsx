import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './SearchBar.module.css';
import { onSearch } from '../../utils/searchService.js';
import { setGenreFilter, setSortFilter } from '../../redux/actions';

export default function SearchBar({ getGame, setCurrentPages }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const genres = useSelector((state) => state.genres);
    const genreFilter = useSelector((state) => state.genreFilter);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            onSearch(dispatch, searchQuery, genreFilter);
        }
        setCurrentPages(1)
    };

    const handleVolverAlHomeClick = () => {
        getGame();
    };
    const handleGenreChange = (event) => {
        dispatch(setGenreFilter(event));
    };
    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        dispatch(setSortFilter(selectedSort)); // Dispatch la acción
    };
    return (
        <div className={style.container}>
            <Link to='/home'>
                <div className={style.container2}>
                    <img onClick={handleVolverAlHomeClick} className={style.image} src='https://cdn.discordapp.com/attachments/992516022680686593/1166596353665798204/banner.png' alt='Volver al inicio'></img>
                </div>
            </Link>

            <Link to="/creategame">
                <button className={style.button}>Crear juego</button>
            </Link>

            <select
                className={style.select}
                value={genreFilter}
                onChange={(e) => handleGenreChange(e.target.value)}
            >
                <option value="">Todos los géneros</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
            <select
                className={style.select}
                onChange={handleSortChange}
            >
                <option value="">Ordenar por...</option>
                <option value="asc">Ordenar alfabéticamente (A-Z)</option>
                <option value="desc">Ordenar alfabéticamente (Z-A)</option>
                <option value="ratingAsc">Ordenar por rating (ascendente)</option>
                <option value="ratingDesc">Ordenar por rating (descendente)</option>
            </select>

            <input
                type="text"
                className={style.input}
                placeholder="Buscar juegos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
                className={style.button}
                onClick={handleSearch}
            >
                Buscar
            </button>
        </div>
    );
}