import React from 'react'
import styles from './PhiloCat.module.css'
import testCar from './images/testCar.jpeg'
import testCar2 from './images/testCar2.jpeg'
import testCar3 from './images/testCar3.jpeg'
import testCar4 from './images/testCar4.jpeg'
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";

function PhilosophicalCat() {
    const [quote, setQuote] = React.useState();

    const cars=[
        testCar,
        testCar2,
        testCar3,
        testCar4
    ]

    const genAI = new GoogleGenerativeAI("AIzaSyDJejl17d53lZO8Tnl-vv7nwDWG8bQDA9Y");

      // AI model
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
  const generationConfig = {
    temperature: 0.9,
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
    generationConfig,
  });




  async function generateQuote(){
    if(quote) return;
    try{
    const prompt = "you are a goofy silly positive quote generator and you are to respond with a quote at always keep it under 100 characters.example 'A cat who thinks too much'-Philosophical Cat";
    const{response} = await model.generateContent(prompt);
    const text = await response.text().trim();
    setQuote(text);
    }catch(err){
      setQuote("A cat who thinks too much- Philosophical Cat");
      console.log("messed up lol", err.message);
    }
  }

  React.useLayoutEffect(() => { 
    if(!quote){
    generateQuote();
    }
  }, []);


  return (
    <div
        className={styles.container}
    >
        <h1 className={styles.title}>Philosophical Cat</h1>
        <div className={styles.imageContainer}>
        <img src={cars[Math.floor(Math.random()*(cars.length))]} alt="hehehehhehehehehhhee" className={styles.image}/>
        {quote && <div className={styles.text}>
            <p>{quote}</p>
        </div>}
        </div>
    </div>
  )
}

export default PhilosophicalCat