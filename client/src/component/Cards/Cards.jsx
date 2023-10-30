
import styles from './Cards.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Cards({ currentPage, gamesPerPage, onPageChange }) {
    const games = useSelector((state) => state.games);
    const genreFilter = useSelector((state) => state.genreFilter);
    const sortFilter = useSelector((state) => state.sortFilter);

    const filteredGames = genreFilter
        ? games.filter((game) =>
            game.genres.some((genre) => genre.name === genreFilter)
        )
        : games;

    if (filteredGames.length === 0) {
        return (
            <div className={styles.tortita}>
                <img src="https://cdn.discordapp.com/attachments/992516022680686593/1166598008197107752/loading.gif" alt='Not found'/>
            </div>
        );
    }

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;

    const orderGames = (games, sortType) => {
        if (sortType === 'asc') {
            return games.slice().sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === 'desc') {
            return games.slice().sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortType === 'ratingAsc') {
            return games.slice().sort((a, b) => a.rating - b.rating);
        } else if (sortType === 'ratingDesc') {
            return games.slice().sort((a, b) => b.rating - a.rating);
        } else {
            return games;
        }
    };

    const sortedGames = orderGames(filteredGames, sortFilter);

    const gamesToDisplay = sortedGames.slice(startIndex, endIndex);


    return (
        <div>
            <div className={styles.cardsContainer}>
                {gamesToDisplay.map((game) => {
                    const genres = game.genres.map((genre) => genre.name);

                    return (
                        <Link className={styles.link} to={`/detailgame/${game.id}`} key={game.id}>
                            <div className={styles.card}>
                                <img
                                    className={styles.image}
                                    src={game.image}
                                    alt={game.name}
                                />
                                <h1 className={styles.title}>{game.name}</h1>
                                <p className={styles.genres}>{genres.join(' ')}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="pagination">

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Página Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={sortedGames.length <= endIndex}
                >
                    Página Siguiente
                </button>
            </div>
        </div>
    );
}