import { useState } from 'react';
import './App.css';
import QuizUI from './components/QuizUI/QuizUI';
import { DataProvider } from './Providers/DataProvider/DataProvider.tsx';
import { GameProvider } from './Providers/GameProvider/GameProvider.tsx';
function App() {

  const [topic, setTopic] = useState("");


  return (
    <>
      {(topic == "") ? 
      <div className='flex flex-col justify-center items-center'>
        <p className='text-white text-2xl font-bold my-10 '>Wybierz tematykę</p>
        <button className='p-5 bg-indigo-800 text-white rounded-xl w-32 hover:bg-indigo-600'
        onClick={ () => {
          setTopic("potions")
        }

        }
        >Potions</button>
        <button className='p-5 bg-indigo-800 text-white rounded-xl my-5 w-32 hover:bg-indigo-600' 
        onClick={() => {
          setTopic("spells")
        }}>Spells</button>
      </div>

      :

      <DataProvider dataKind={`${topic}`}>
        <GameProvider>
          <QuizUI />
        </GameProvider>
      </DataProvider >



    }
  </>
  );
}

export default App;
