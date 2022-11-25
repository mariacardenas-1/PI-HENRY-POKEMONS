import styles from './filters.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { filterByType, filterCreatedBy } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Filters = () => {

        const dispatch = useDispatch()
    const [types, setTypes] = useState()

    useEffect(() => {
        const getTypes = async() =>{
            const dbTypes = await (await axios.get('http://localhost:3001/dbtypes')).data
            const nameTypes = dbTypes.map(el => {
                return el.name
            })
            const orderedTypes = nameTypes.sort()
            setTypes(orderedTypes)
        }
        getTypes()
    }, []);

    const handleSelect = (e) =>{
        if(e.target.value === 'CreatedByMe' || e.target.value === 'Existing'){
            dispatch(filterCreatedBy(e.target.value))
        }else{
            dispatch(filterByType(e.target.value))
        }
        
    }


    return (
        <select onChange={(e)=> handleSelect(e)}  className={styles.filtros} name='Filtrar'>
            <option value='Filter'>Filter</option>
            <option value='CreatedByMe'>Created By Me</option>
            <option value='Existing'>Existing</option>
                    { types && types.map(el => (
                        <option value={el} key={el} >{el}</option>
                        )
                    )}
        </select>
    )
}

export default Filters;