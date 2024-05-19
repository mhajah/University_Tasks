import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePotions } from '../DataProvider/DataProvider';
import getRandomInt from './utils/getRandomInt';
import shuffleArray from './utils/shuffleArray';

interface GameContextType {
  question: string;
  otherAnswers: string[];
  correctCounter: number;
  wrongAnswer: boolean;
  rollQuestion: (x: any) => void;
  handleCheckAnswer: (ans: string) => void;
  loading: boolean;
  usedAnswers: string[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { potions, getPotions, loading } = usePotions();
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [otherAnswers, setOtherAnswers] = useState<string[]>([]);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [usedAnswers, setUsedAnswers] = useState<string[]>([]);



  useEffect(() => {
    getPotions();
  }, [getPotions]);

  function rollQuestion() {
    const questions: any = potions["data"];
    let quest = null;
    let randomNum = 0;

    while (quest == null) {
      randomNum = getRandomInt(100);
      quest = questions[randomNum]["attributes"]["effect"];
    }

    const answer = questions[randomNum]["attributes"]["name"];

    setQuestion(quest);
    setCorrectAnswer(answer);

    let otherAns: string[] = [answer];
    for (let i = 0; i < 3; i++) {
      randomNum = getRandomInt(100);
      otherAns.push(questions[randomNum]["attributes"]["name"]);
    }

    otherAns = shuffleArray(otherAns);
    setOtherAnswers(otherAns);
  }

  function handleCheckAnswer(ans: string) {
    if (ans === correctAnswer) {
      setWrongAnswer(false);
      setUsedAnswers([]);
      setCorrectCounter(correctCounter + 1);
      rollQuestion();
    }
    else {
      setCorrectCounter(0);
      setUsedAnswers(usedAnswers.concat(ans));
      setWrongAnswer(true);
    }
  }

  return (
    <GameContext.Provider value={{ question, otherAnswers, correctCounter, wrongAnswer, rollQuestion, handleCheckAnswer, loading, usedAnswers }}>
      {children}
    </GameContext.Provider>
  );
}
