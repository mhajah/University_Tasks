import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

export default function Home() {

  return (
    <div className='flex flex-col justify-center items-center m '>
      <div>
        <h2 className='text-6xl font-bold max-w-4xl  mt-24'>
          <span>
            Hi, I'm Michał Hajahmadov, <br />
            a </span>
          <span className='text-yellow-500'>
            <Typewriter
              words={['frontend developer', 'student', 'designer']}
              loop={false}
            />
          </span>
        </h2>
        <p className='font-outfit py-8 text-2xl max-w-2xl flex'>I build design systems and code websites for leaders and brands all around the world.</p>
        <p className='font-outfit text-2xl max-w-2xl flex'>Within my 2 years of experience, my professional work and open source contributions have already impacted hundred of people.</p>
      </div>
    </div>
  );
}