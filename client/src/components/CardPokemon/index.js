import styles from './cardPokemon.module.css';
import { Link } from 'react-router-dom';


const cardPokemon = ({image, name, types, id}) => {
    return (
        <Link to={`/pokemonadventure/detail/${id}`} className={styles.cardPokemon} >
            <div className={`${styles.textPokemon} ${styles.child}`}>
                <span className={styles.name}>{name}</span>
                <div className={styles.types}>
                    {types && types.map(el=>(
                        <span key={el.name} className={styles.type}>{`${el.name}, `}</span>
                    ))}
                </div>
                
            </div>
            <img className={`${styles.imgPokemon} ${styles.child}`} src={image} alt='hola'/>
        </Link>
    )
}

export default cardPokemon