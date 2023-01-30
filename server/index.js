import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import { Configuration ,OpenAIApi } from 'openai';

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());


//configure openai api key
const config = new Configuration({
    organization :"org-hyk4YHAxfJdcgRDNk0ID82dI",
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(config);

//listening to port 3000
app.listen("3000" , ()=>console.log("Server is running on port 3000"));

//dummy route to test 
app.get('/', (req, res) => {
    res.send("Hello World");
})


// const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "what is react",
//     max_tokens: 700,
//     temperature: 0,
//   });

// console.log(response.data.choices[0].text);

//route to make request to openai api
app.post('/', async (req, res) => {

    const {message} = req.body;
    console.log(message);

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 2000,
            temperature: 0.5,
        })
        res.json({message: response.data.choices[0].text})
        
    }catch(e){
        console.log(e);
        res.send(e).status(400)
    }
});