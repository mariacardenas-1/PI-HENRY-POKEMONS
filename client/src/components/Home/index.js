import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './home.module.css';
import CardPokemon from '../CardPokemon/index';
import SearchBar from '../SearchBar/index';
import { Link } from 'react-router-dom';
import { loadPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import Loader from '../Loader';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(true)


    const dispatch = useDispatch()
    const pokemons = useSelector(state=> state.filter) 
    const pokemonsPerPage = 12;
    const totalPokemons = pokemons.length;

    const indexOfLastPokemons = currentPage * pokemonsPerPage;
	const indexOfFirstPokemons = indexOfLastPokemons - pokemonsPerPage;
	const filterPokemons = pokemons.slice(indexOfFirstPokemons, indexOfLastPokemons);


    useEffect(() => {
        dispatch(loadPokemons())
    }, [])

    useEffect(() => {
        const getTypes = async() =>{
            const dbTypes = await (await axios.get('http://localhost:3001/types')).data
        }
        getTypes()
    }, []);

    useEffect(() => {
         if(totalPokemons){
            setLoader(false)
     } 
    }, [totalPokemons, loader])

   
    const reload = () =>{
        window.location.reload()
    }
    
   
        // window.location.reload()
  


    return (
        <div className={styles.pokemons}>
            <SearchBar />
            {!loader && (
                <div className={styles.cards}>
                    { filterPokemons && filterPokemons.map(({image, name, types, id}) => (
                        <CardPokemon
                            key ={name}
                            image = {image}
                            name = {name}
                            types = {types} 
                            id = {id}
                            />
                    )
                    )}
                </div> 
            )}
            {loader && (
                <Loader />
            )}
           
           {totalPokemons && (
             <div className={styles.buttonshome}>
                {filterPokemons.length === 1 && 
                <button className={styles.rerender} onClick={reload} >Volver</button> }
                <Link className={styles.createpokehome} to="/pokemonadventure/create">Create</Link>
            </div>
           )}
           
            {totalPokemons > pokemonsPerPage && (
                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPokemons={totalPokemons}
                    pokemonsPerPage={pokemonsPerPage}
                />
            )}
        </div>
    )
}


export default Home;
