import styles from './detailCard.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backIcon from './backIcon.PNG';

const DetailCard = () => {
     const idpk = useParams().id

     const [pokemon, setPokemon] = useState({});
    

    useEffect(() => {

        const detailPokemon = async() => {
            const pokemonInfo = await (await axios.get(`http://localhost:3001/pokemons/${idpk}`)).data
            setPokemon(pokemonInfo)

        }
        detailPokemon()

    }, []);

    const {image, name, type, defense, life, attack, height, speed, id, weight } = pokemon

    return (
        <div className={styles.detalle}>
            <div className={styles.detailCard}>
            <Link to="/pokemonadventure/home" className={styles.back} >
                    <img className={styles.backIcon} src={backIcon} alt='hola'/> 
            </Link>
            
            <div>
                <img className={styles.image} src={image} alt='hola'/>

            </div>
                <div className={styles.cardinfo}>
                    <div className={styles.infoCard}>
                        <span className={styles.name}>{name}</span>
                        <div className={styles.info}>
                            <span className={styles.label}>Types:</span>
                            {type && type.map(el=>(
                            <span key={el.name}>&nbsp;{el.name}</span>
                            ))}
                            <br/>
                            <span className={styles.label}>Defense: </span>
                            <span className={styles.content}>{defense} &nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Life: </span> 
                            <span className={styles.content}>{life}&nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Attack: </span> 
                            <span className={styles.content}>{attack}&nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Height: </span> 
                            <span className={styles.content}>{height}&nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Speed: </span> 
                            <span className={styles.content}>{speed}&nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Id: </span> 
                            <span className={styles.content}>{id}&nbsp;</span> 
                            <br/>
                            <span className={styles.label}>Weight: </span> 
                            <span className={styles.content}>{weight}&nbsp;</span> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard;
