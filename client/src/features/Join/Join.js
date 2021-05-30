import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../components/TextField/TextField'
import styles from './Join.module.css'

const Join = () => {

    const [ name, setName ] = useState('')
    const [ room, setRoom] = useState('')

    return ( 
        <div className={styles.joinOuterContainer}>
            <div className={styles.joinInnerContainer}>
                <h1 className={styles.heading}>join</h1>
                <form>
                <TextField 
                                            value={name} 
                                            required
                                            name='username'
                                            onChange={(e) => setName(e.target.value)}
                                            // error={errors.name}
                                            placeholder={'please enter a user name'}/>
                <TextField 
                                            value={room} 
                                            required
                                            name='username'
                                            onChange={(e) => setRoom(e.target.value)}
                                            // error={errors.name}
                                            placeholder={'please enter a room name'}/>
                </form>
                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button type="submit" className={styles.submitButton}>Submit</button>
                </Link>
            </div>
        </div>

     );
}
 
export default Join;