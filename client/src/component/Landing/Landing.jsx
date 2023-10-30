import { Link } from "react-router-dom";
import styles from "./Landing.module.css"

export default function Landing() {
    return (
        <div className={styles.conteiner}>
            <div className={styles.logoDiv}>
                <img className={styles.logo} src="https://cdn.discordapp.com/attachments/992516022680686593/1167701187949232178/banner-1.png?ex=654f157a&is=653ca07a&hm=ef0b674560b5b596dc14a3229eb3b2f8dc32953873e7f79aa0ccec1ae475f34a&" alt="Not found" />
            </div>
            <div className={styles.image}>
                <img className={styles.img} src="https://cdn.discordapp.com/attachments/992516022680686593/1167695890660741150/klipartz.com.png?ex=654f108b&is=653c9b8b&hm=074ec9040daea30ccfb9362f34aeeb7dd344b46c013156d5bbe3130a3d83919f&" alt="Not found"></img>
            </div>
            <div className={styles.h1Div}>
                <h1 className={styles.h1}>Bienvenidos!</h1>
            </div>
            <div className={styles.boton}>
                <Link to="/home">
                    <button className={styles.buttonLanding}>INGRESAR</button>
                </Link>
            </div>



        </div>
    )
}