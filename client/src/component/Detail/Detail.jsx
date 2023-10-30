import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import style from "./Detail.module.css"

export default function Detail() {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const id = gameId;
                const { data } = await axios.get(`http://localhost:3001/idVideogames/${id}`);
                setGameData(data);
                debugger
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGameData();
    }, [gameId]);

    if (!gameData) {
        return <img src="https://cdn.discordapp.com/attachments/992516022680686593/1166598008197107752/loading.gif" alt='Not found'/>
    }

    const genres = gameData.genres.map((genre) => genre.name);
    return (
        <div>
            {/* <div>
                <SearchBar />
            </div> */}
            <div className={style.container}>
                <div>
                    <Link to="/home">
                        <button className={style.button}>Volver al inicio</button>
                    </Link>
                </div>
            </div>
            <div>
                <h1 className={style.tittle}>{gameData.name}</h1>
                <img className={style.image} src={gameData.image} alt={gameData.name} />
                <p className={style.genres}>Genres: {genres.join(', ')}</p>
                <h1 className={style.rating}>{gameData.rating}</h1>
                <h1 className={style.released}>{gameData.released}</h1>
            </div>
        </div>
    );
}