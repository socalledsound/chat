import React from 'react'
import styles from './TextField.module.css';


const TextField = ({onChange, error, ...rest}) => {
    
    return (
        <div className={styles.inputContainer}>
        <input
            className={`${styles.textInput} ${error ? styles.textInputError : ''}`} 
            onChange={(e) => onChange(e)}
            {...rest}
        />
         {error && <p className={styles.errorText}>{error}</p>}
        </div>

    )
}
export default TextField