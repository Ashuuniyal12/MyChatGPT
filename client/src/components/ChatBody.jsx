import React, { useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useEffect } from 'react';

const ChatBody = ({ chat }) => {
    const aiStyle = 'bg-white  bg-opacity-40 backdrop-blur-lg drp-shadow-md mr-auto'

    const parent = useRef(null);
    const bottomref = useRef(null);

    //for scrolling
    useEffect(() =>{
        bottomref.current?.scrollIntoView({behavior: 'smooth'})
    },[chat])

    //for auto animation 
    useEffect(() => {
        parent.current && autoAnimate(parent.current, { duration: 500, easing: 'ease-in-out' })
    }, [parent])


    return (
        <div className='flex flex-col gap-4' ref = {parent}>
            {
                chat.map((message, index) => {
                    return <div key={index} className={`border-[#999999] break-words border-2 rounded-xl self-end px-3  py-3 max-w-[80%] ${message.sender === 'ai' && aiStyle } `}>
                        <pre className='whitespace-pre-wrap'>
                            <span>{message.message}</span>
                        </pre>
                    </div>
                })
            }

        <div ref = {bottomref} className= 'h-3'></div>
        </div>
    )
}

export default ChatBody
