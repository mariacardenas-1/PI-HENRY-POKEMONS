import styles from './landing.module.css';
import { Link } from 'react-router-dom';


const Landing = () =>{
    return (
        <div className={styles.landing}>
            <div className={styles.div1}>
            <Link className={styles.link} to="/pokemonadventure/home">
                <div className={styles.name}>Pokemon Adventure</div>
            </Link> 
            </div>
            <div className={styles.text}>
                <div className={styles.title}>Pokemon Adventure</div>
                <div className={styles.description}>Create your own Pokemon, analyze their abilities and win!</div>
                <Link to="/pokemonadventure/home">
                    <button className={styles.button}>Ready?</button>
                </Link>
            </div>
        </div>
    )
};

export default Landing;