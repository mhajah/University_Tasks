import React from 'react'
import MyPhoto from '../../photo.svg'

export default function About() {

  return (
    <div>
      <section className='flex flex-col justify-center items-center m'>
        <img src={MyPhoto} alt="My Photo" width="200px" height="200px" />
        <p className='font-outfit py-8 text-2xl max-w-2xl flex'>I am a third-year computer science student at the University of Wrocław, primarily focusing on front-end technologies. I have a special affinity for React.</p>
        <p className='font-outfit text-2xl max-w-2xl flex'>Exploring the intricacies of user interfaces and crafting engaging web experiences is both my passion and my professional aspiration. I enjoy the challenge of staying updated with the latest trends and techniques in front-end development, constantly seeking to enhance my skills and broaden my knowledge.</p>
        <p className='font-outfit py-8 text-2xl max-w-2xl flex'>Outside of academics, I actively contribute to open-source projects related to React, participate in coding competitions, and attend tech meetups to network with like-minded individuals and learn from industry experts.</p>
      </section>

      <section className='font-outfit'>
        <h3 className='px-20 text-4xl font-bold mb-8'>Education</h3>
        <ul className='px-4'>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-yellow-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-yellow-500'>1. </span>Szkoła Podstawowa i Gimnazjum w Piszu</h4>
            <p className='text-xl'>2007-2016</p>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-red-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-red-500'>2. </span>Technikum (technik informatyk) w Olsztynie</h4>
            <p className='text-xl'>2017-2021</p>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-green-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-green-500'>3. </span>Uniwersytet Wrocławski (informatyka) we Wrocławiu</h4>
            <p className='text-xl'>2021-2025</p>
          </li>
        </ul>
      </section>

      <section className='font-outfit'>
        <h3 className='px-20 mt-24 text-4xl font-bold mb-8'>Experience</h3>
        <ul className='px-4'>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-blue-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-blue-500'>1. </span>Freelancer</h4>
            <p className='text-xl'>2017 - now</p>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-purple-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-purple-500'>2. </span>EZN Wrocław (algorithm teacher)</h4>
            <p className='text-xl'>2023 - now</p>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-pink-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-pink-500'>3. </span>Ten Square Games (frontend developer)</h4>
            <p className='text-xl'>2024 - now</p>
          </li>
        </ul>
      </section>

      <section className='font-outfit'>
        <h3 className='px-20 mt-24 text-4xl font-bold mb-8'>Skills</h3>
        <ul className='px-4'>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-teal-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-teal-500'>1. </span>HTML & CSS</h4>
            <div className='flex'>
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp" alt="html5 logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256" alt="css logo" width="100px" />
            </div>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-rose-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-rose-500'>2. </span>JavaScript</h4>
            <div className='flex'>
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256" alt="js logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-react-1543566-1306069.png?f=webp&w=256" alt="react logo" width="100px" />
            </div>
          </li>
          <li className='w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-orange-100 rounded-2xl flex justify-between'>
            <h4 className='text-3xl font-bold flex items-center gap-4'><span className='text-6xl text-orange-500'>3. </span>Backend</h4>
            <div className='flex'>
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-net-51-190792.png?f=webp&w=256" alt="js logo" width="100px" />
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}