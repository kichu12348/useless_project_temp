import { useState, useEffect } from 'react'
import styles from './FortuneTellerPotato.module.css'
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";


const fortuneMessages = [
  "The answer lies in the mashed feelings",
  "Potato sees a new dawn in your mashed future",
  "Your future is crispy and golden brown",
  "When life gives you potatoes, make french fries",
  "Eyes of potato see great opportunity ahead",
  "The starch is strong with this one",
  "Trust in the root vegetables",
  "Your future will be loaded... like a baked potato",
  "Keep your eyes peeled for new opportunities"
];

const FortuneTellerPotato = () => {
  const [fortune, setFortune] = useState('');
  const [isShaking, setIsShaking] = useState(false);




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


  async function generateFortune(){
    try{
    const prompt = `you are a potato telling peoples future keep it under 120 characters and  responds with something random and cryptic, like “The answer lies in the mashed feelings,” or “Potato sees a new dawn in your mashed future.”`;
    const {response} = await model.generateContent(prompt);
    const text = await response.text().trim();
    setFortune(text);
    }
    catch(e){
      console.log(e.message);
      setFortune("The potato is out of order. Try again later.");
    }
  }

  const tellFortune = () => {
    setIsShaking(true);
    setTimeout(async () => {
      await generateFortune();
      setIsShaking(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The Fortune Teller Potato</h1>
      <div 
        className={`${styles.potato} ${isShaking ? styles.shake : ''}`}
        onClick={tellFortune}
        role="button"
        tabIndex={0}
      >
        🥔
      </div>
      {fortune && (
        <div className={styles.fortune}>
          <p>{fortune}</p>
        </div>
      )}
      <p className={styles.instruction}>
        Click the potato to receive mystic wisdom!
      </p>
    </div>
  );
};

export default FortuneTellerPotato;