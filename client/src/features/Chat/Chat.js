import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import TextField from '../../components/TextField/TextField'

let socket

const Chat = ({location}) => {

    const [ name, setName ] = useState('')
    const [ room, setRoom] = useState('')
    const [ message, setMessage ] = useState('')
    const [ messages, updateMessages ] = useState([])


    const ENDPOINT = 'localhost:5000'

    useEffect(() => {

        const { name, room } = queryString.parse(location.search)
        
        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error, user ) => {
            if(error){
                alert(error)
            }
            
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search] )

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
            updateMessages([...messages, message])

        })
    }, [ messages ])

    const sendMessage = (e) => {
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return ( 
        <div className="outerContainer">
            <div className="container">
                {name + ' : ' + room}
                <TextField 
                    value={message}
                    onChange={ (e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                />
            </div>
            <div className="messagesContainer">
                { messages.map(msg => <p>{msg.text}</p>)}
            </div>
        </div>
     );
}
 
export default Chat;