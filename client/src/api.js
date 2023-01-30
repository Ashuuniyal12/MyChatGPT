export const fetchResponse = async (chat) => {
    try{
        const response = await fetch('https://chatgpt-aw17.onrender.com/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({message: chat.map((message) => message.message).join('\n')})
        })
        const data = await response.json()
        // console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}