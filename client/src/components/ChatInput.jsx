import React, { useState } from 'react'
import send from '../images/send.png'
import load from '../images/loader.gif'

const ChatInput = ({ sendMessage, loading }) => {

    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (value === '') return
        sendMessage({ sender: 'user', message: value })
        setValue('')
    }
    return (
        <div className='w-full bg-white bg-opacity-10 max-h-40 rounded-lg py-4 overflow-auto relative'>
            {loading ? <img src={load} alt ='loading animation' className='w-8 m-auto' />
                :
                <>
                    <textarea rows={1}
                        onKeyDown={(e) => { e.keyCode === 13 && e.shiftKey === false && handleSubmit() }}
                        className='border-0 bg-transparent outline-none w-11/12 '
                        value={value}
                        tupe='text'
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <img
                        onClick={handleSubmit}
                        src={send} width={20} alt="send button" className='absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125' />

                </>
            }
        </div>

    )
}

export default ChatInput