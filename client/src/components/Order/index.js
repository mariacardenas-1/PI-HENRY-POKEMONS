import styles from './order.module.css';
import { useDispatch } from 'react-redux';
import { 
    orderByAz,
    orderByZa,
    orderByMinorAttack,
    orderByMajorAttack,
    withoutOrder   
 } from '../../redux/actions';

const Order = () => {
    
    const dispatch = useDispatch()

    const handleSelect = (option)=>{
        if(option === 'Organize') dispatch(withoutOrder())
        if(option === 'A-Z') dispatch(orderByAz())
        if(option === 'Z-A') dispatch(orderByZa())
        if(option === 'mayor') dispatch(orderByMajorAttack())
        if(option === 'menor') dispatch(orderByMinorAttack())
    }

    return (
        <select onChange={(e)=>handleSelect(e.target.value)} className={styles.ordenar} name='Ordenar'>
            <option value='Organize'> Organize </option>
            <option value='A-Z'> A-Z </option>
            <option value='Z-A'> Z-A </option>
            <option value='mayor'> Biggest attack </option>
            <option value='menor'> Minor attack </option>
        </select>
    )
}

export default Order