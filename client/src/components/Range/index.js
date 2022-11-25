import styles from './range.module.css';
import { useState, useEffect } from 'react';

const Range = ({skill, handleSkills}) => {

    const [rangeValue, setRangeValue] =useState(0)

    useEffect(() => {

        const timeOutId = setTimeout(() =>
        handleSkills(skill, rangeValue), 500);
       
        return () => {
            clearTimeout(timeOutId)
        };
    }, [rangeValue, skill]);

    const getValue = (e) =>{
        const range =Number(e.target.value)
        setRangeValue(range)
    }


    return (
        <div className={styles.rangeWrapper}>
            <label onChange={(e) => getValue(e, skill)} 
                className={styles.range} htmlFor={skill}>     
                {skill}:
                <input className={`${styles.range} ${styles.input}`} id={skill} type='range' ></input>
                <output className={styles.bubble} htmlFor={skill}>{rangeValue}</output>
            </label>
        </div>
    )
}

export default Range