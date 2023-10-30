import styles from './Card.module.css'

export default function Card({ name, image, genres }) {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.cardImage} />
            <div className={styles.overlay}>
                <h1 className={styles.cardTitle}>{name}</h1>
                <p className={styles.cardGenres}>{genres.join(', ')}</p>
            </div>
        </div>
    )
}   