import React, { useState } from 'react';
import './App.css';
import { GameProvider, useGame } from './Providers/GameProvider/GameProvider';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

function App() {
  const { question, otherAnswers, correctCounter, rollQuestion, handleCheckAnswer, loading, usedAnswers } = useGame();


  return (
    
      <div className='flex flex-col justify-center items-center'>

        <h1 className='text-white text-4xl font-bold my-10'>Harry Potter - Quiz</h1>
        {loading && <LoadingSpinner/>}
        {!loading && <button onClick={rollQuestion} className='py-4 px-8 bg-violet-200 text-slate-900 text-xl rounded-md font-bold hover:text-white hover:bg-violet-600 transition'>
          START
        </button> }

        <div className='mt-16 text-white flex flex-col pt-0 lg:w-1/3 w-2/3 h-128 bg-indigo-900 shadow-lg'>
          <div className='bg-blue-950 p-8'>
            <h6 className='text-xs mb-4 text-blue-200'>Strike: {correctCounter}</h6>
            <h3 className='font-bold text-xl'>{question}</h3>
          </div>

          <div className='py-16 flex flex-col justify-center items-center'>
          { otherAnswers.map((ans: string, index) => (
            <button className={`my-2 p-2 x rounded-md w-3/4 ${(usedAnswers.includes(ans)) ? "bg-red-300 text-red-200 pointer-events-none" : "text-slate-900 bg-white"}  hover:bg-violet-200 transition`}
              key={index}
              onClick={() => handleCheckAnswer(ans)}
            >{ans}</button>
          ))}
          </div>
          
        </div>
      </div>

  );
}

export default App;
