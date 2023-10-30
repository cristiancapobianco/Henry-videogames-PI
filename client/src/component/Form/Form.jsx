
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';

export default function Form() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: '',
        description: '',
        plataforms: '',
        date_release: '',
        rating: 0,
        genres: [],
    });

    const [genre, setGenre] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rating' ? parseFloat(value) : value,
        });
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const addGenre = () => {
        if (genre.trim() !== '') {
            setFormData({
                ...formData,
                genres: [...formData.genres, genre],
            });
            setGenre('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/newvideogame', formData);

            setFormData({
                id: '',
                name: '',
                image: '',
                description: '',
                plataforms: '',
                date_release: '',
                rating: 0,
                genres: [],
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div>
                <div>
                    <Link to='/home '>
                        <button>inicio</button>
                    </Link>
                </div>

                <label>ID:</label>
                <input
                    placeholder='Id'
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    placeholder='Name'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    placeholder='Image'
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description (paragraph):</label>
                <textarea
                    placeholder='Description'
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>plataforms:</label>
                <input
                    placeholder='Plataforms'
                    type="text"
                    name="plataforms"
                    value={formData.plataforms}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Release Date:</label>
                <input
                    placeholder='Date release'
                    type="date"
                    name="date_release"
                    value={formData.date_release}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Rating:</label>
                <input
                    placeholder='Rating'
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Genres:</label>
                <input
                    placeholder='Genre'
                    type="text"
                    value={genre}
                    onChange={handleGenreChange}
                />
                <ul>
                    {formData.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
                <button type='button' onClick={addGenre}>Agregar Género</button>
            </div>
            <div>
                <button type="submit">Crear Juego</button>
            </div>
        </form>
    );
}