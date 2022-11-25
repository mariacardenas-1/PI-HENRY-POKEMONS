import styles from './typesButton.module.css';
import { useState } from 'react';

const TypesButton = ({id, name, handleButton}) => {

    const [active, setActive]=useState(false);

    const changeStatus = () =>{
        setActive(!active)
    }

    return (
        <button className={active ? styles.active : styles.inactive} type='button' 
        onClick={(e)=> {
            handleButton(id, name) 
            changeStatus()}}>
        {name}
        </button>
    )
}

export default TypesButton;