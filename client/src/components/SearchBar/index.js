import styles from './searchBar.module.css';
import Filters from '../Filters'
import Order from '../Order'
import { useState, useEffect } from 'react';
import {searchPokemon} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = ({setCurrentPage}) => {
    const dispatch= useDispatch()

    const [search, setSearch] = useState('')
    const [currentParam, setCurrentParam] = useState('')

    useEffect(() => {
        const timeOutId = setTimeout(() =>
        setCurrentParam(search), 500);
        return () => {
            clearTimeout(timeOutId)
        };
    }, [search]);

const getSearch = (e) => {
    const param = e.target.value
    setSearch(param)
}

function handleEnter(e){
    console.log({e})
    if(e.charCode === 13){
        console.log('handleEnter')
		dispatch(searchPokemon(search))
        setCurrentPage(1)
     }
	return false;
}

    return (    
        <div className={styles.header}>
            <input className={styles.searchBar} onChange={getSearch} type='text' placeholder='Search...'  onKeyPress={(e)=>handleEnter(e)}></input>
            <div className={styles.background} onClick={handleEnter}>
                <div className={styles.img} />
            </div>
            <Filters />
            <Order />
            <Link to='/pokemonadventure/create' className={styles.tooltip}>
                <div className={styles.create}></div>
                <span className={styles.tooltiptext}>Create your own pokemon</span>
            </Link>
        </div>
    )
}

export default SearchBar;