import './App.css'
import { useState } from 'react'
import ChatBody from './components/ChatBody'
import ChatInput from './components/ChatInput'
import {useMutation} from 'react-query'
import { fetchResponse } from './api'

function App() {

  const [chat , setChat] = useState([])

  const mutation = useMutation({
      mutationFn: () =>{
        return fetchResponse(chat);
      },
      onSuccess: (data) => {
        setChat([...chat , {message:data.message.replace(/^\n\n/, "") , sender:'ai'}])
      }
  })
  const sendMessage = async (message) => {
    await Promise.resolve(setChat([...chat , message]))
    mutation.mutate();
  }
  return (
    <div className='bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle '>

    {/*  gradience */}
    <div className='gradient-01 z-0 absolute '></div>
    <div className='gradient-02 z-0 absolute '></div>
      {/* header */}
      <div className='uppercase font-bold text-center mb-3 '>
        CHATGPT2.0
      </div>

      {/* body */}
      <div className='h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md'>
        <ChatBody chat={chat}/>
      </div>

      {/* input */}
      <div className='w-full max-w-4xl min-w-[20rem] self-center'>
        <ChatInput  sendMessage = {sendMessage} loading ={mutation.isLoading}/>
      </div>
    </div>
  )
}

export default App
