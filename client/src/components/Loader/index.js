import styles from './loader.module.css'

const Loader = () =>{
    return(
        <div className={styles.loaderWrapper}>
            <div className={styles.pokeball}></div>
        </div>
    )
}

export default Loader