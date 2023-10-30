
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import { addGame, clearData, setCurrentPage, storeGenres } from "../../redux/actions";

export default function Home() {
    const dispatch = useDispatch();
    const [currentPages, setCurrentPages] = useState(1);
    const gamesPerPage = 15;


    const fetchGames = async () => {
        dispatch(clearData());
        try {
            const { data } = await axios.get('http://localhost:3001/videogames');
            data.forEach(element => {
                dispatch(addGame(element));
            });
        } catch (error) {
            console.error("Error al obtener juegos", error);
        }
    };
    const fetchGenres = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/genres');
            dispatch(storeGenres(data));
        } catch (error) {
            console.error('Error al obtener géneros', error);
        }
    };

    useEffect(() => {
        fetchGames();
        fetchGenres();
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPages(newPage);
        dispatch(setCurrentPage(newPage));
    };

    return (
        <div>
            <SearchBar getGame={fetchGames} setCurrentPages={setCurrentPages} />
            <Cards currentPage={currentPages} gamesPerPage={gamesPerPage} onPageChange={handlePageChange} />
        </div>
    );
}