import { useState, useEffect } from 'react'
import styles from './createPokemon.module.css';
import axios from 'axios'
import TypesButton from '../TypesButton';
import Range from '../Range';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const CreatePokemon = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [buttonTypes, setButtonTypes] = useState([])
    const [life, setLife] = useState(0);
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [types, setTypes] = useState([])
    const [serverError, setServerError] = useState('')
    const [loader, setLoader] = useState(false)
    const [success, setSucces] = useState(false)
    const initalErrorState = {
         name: '',
         image: '',
         types: '',
         skills: ''
    }
    const [error, setError] = useState(initalErrorState)

   
    useEffect(() => {
        validateSkills()
    },[life, attack, defense, speed, height, weight ])


    useEffect(() => {
        const getTypes = async() =>{
            const dbTypes = await (await axios.get('http://localhost:3001/dbtypes')).data
            setTypes(dbTypes)
        }
        getTypes()
    }, []);

    const sendPokemonData = async (e) => {
        e.preventDefault()

        

        validateSkills()
        if(!isError()){
            setLoader(true)
            try{
                const pokemon = {
                    name: name,
                    image: image,
                    types: buttonTypes,
                    life: life,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    height: height,
                    weight: weight,
                }
        
                await axios.post('http://localhost:3001/pokemons', pokemon)
                await setLoader(false)
                await setSucces(true)
            }catch(error){
                 setLoader(false)
                setServerError(error.message)
            }
        }
    }
   

    const handleButton = (id, name)=>{
        const isType = buttonTypes.find((type) => type.id === id)
        const currentTypes = buttonTypes.filter((type) => type.id !== id )
        if(isType){
            setButtonTypes(currentTypes)

        }else{
            setButtonTypes([...buttonTypes, {id, name}])

        }
    }


    const handleSkills = (skill, value) => {
        if(skill === 'life') setLife(value)
        if(skill === 'attack') setAttack(value)
        if(skill === 'defense') setDefense(value)
        if(skill === 'speed') setSpeed(value)
        if(skill === 'height') setHeight(value)
        if(skill === 'weight') setWeight(value)
    }

const validateName = () =>{
    if(name.length < 4){
        setError({
            ...error, 
            name: 'Name is required and must have at least 4 letters'
        })
    }else setError({...error, name: ''})
}

const validateImage = (image) =>{
    try{
        new URL(image)
        setError({...error, image: ''})
    } catch {
        setError({
            ...error, 
            image: 'Image url is required'
        })
    }
}

const validateTypes = () => {
    if(buttonTypes.length === 0 ){
        setError({
            ...error,
            types: 'Must have at least one type'
        })
    }else setError({...error, types:''})
}

const validateSkills = () => {
    if (life && attack && defense  && speed  && height  && weight  ) {
            setError({...error, skills: ''})
    }else {
        setError({
            ...error,
            skills: 'The characteristics should not have value of 0'
        })
    }
}

const isError = () => {
    for (const prop in error){
        if(error[prop] !== ''){
            return true
        }
    }
    return false
}

const reload = () =>{
    window.location.reload()
}

    const skills = ['life', 'defense', 'attack', 'speed', 'height', 'weight']
   
    return (
        <div className={styles.create}>
        {loader && <Loader />}
            <div className={styles.formWrapper}>
            <span className={styles.title}>Create Your Own Pokemon</span>
                <form name='CreatePokemon' className={styles.form} onSubmit={sendPokemonData}>
                    <div className={styles.campos}>
                        <label className={styles.label}>Name</label>
                        <input 
                            value={name} 
                            onChange={(e)=>{setName(e.target.value)}} 
                            className={styles.inputText} 
                            type='text' 
                            required
                            onBlur={() => validateName()}
                            placeholder='Name' 
                        />
                    </div>
                    <p className={styles.error}>
                        { error?.name && error.name }
                    </p>
                
                
                    <div className={styles.campos}>
                        <label className={styles.label}>Image</label>
                        <input 
                            value={image} 
                            onChange={(e)=>{setImage(e.target.value)}} 
                            className={styles.inputText} 
                            type='url' 
                            required
                            onBlur={() => validateImage(image)}
                            placeholder='Img URL'
                        />
                    </div>
                    <p className={styles.error}>
                        { error?.image && error.image }
                    </p>
                    <label className={`${styles.label} ${styles.types}`}>What is your pokemon type?</label>
                    <p className={styles.specification}>Pick at least one</p>
                    <div name='Types' className={styles.typeContainer}  onBlur={() => validateTypes()}> 
                        { types && types.map(el => (
                            <TypesButton  id={el.id} name={el.name} key={el.id}  handleButton={handleButton}  />
                            )
                        )}
                        
                    </div> 
                    <p className={styles.error}>
                        { error?.types && error.types }
                    </p>
                    <label className={`${styles.label} ${styles.types}`}>What are the characteristics of your pokemon?</label>

                    <div  className={styles.skills}>
                            {skills.map(skill => (
                            <Range key={skill} skill={skill} handleSkills={handleSkills} value={defense}/>
                            ))}
                    </div>
                    <p className={styles.error}>
                        { error?.skills && error.skills }
                    </p>
                    <p className={styles.error} >{serverError && serverError}</p>
                    {success && <p className={`${styles.label} ${styles.confirmation}`} >Felicidades, tu pokemon <strong> {name}</strong> fue creado correctamente!</p> }
                    {success && 
                        <div className={styles.buttons}>
                            <Link to='/pokemonadventure/home' className={styles.link}>Back To Home</Link>
                            <button className={styles.link} onClick={reload}>Create New Pokemon</button>
                        </div>
                    }
                    {!success && 
                        <button className={styles.buttonSend} type='submit' >Create Pokemon</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreatePokemon;