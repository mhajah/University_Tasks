import React from 'react'
import MyPhoto from '../../photo.svg'

export default function Projects() {

  return (
    <div className='flex justify-center flex-col items-center'>
      <section className='flex flex-col justify-center items-center mt-16'>
        <h2 className='text-6xl font-outfit font-bold'>MY PROJECTS</h2>
      </section>

      <section className='font-outfit mx-8 my-8 min-h-64 rounded-2xl bg-blue-100 w-3/4'>
        <div className='flex justify-between w-full px-8 py-8'>
          <div>
            <h4 className='text-5xl font-bold'>GGMC.PL</h4>
            <p className='mt-8 text-xl'>Website for a computer game server (Minecraft).</p>
            <p className='mt-8'>Technologies</p>
            <section className='flex gap-5'>
              <img className="mt-2" src="https://cdn.iconscout.com/icon/free/png-512/free-bootstrap-226077.png?f=webp&w=256" alt="" width="100px"/>
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp" alt="html5 logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256" alt="css logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256" alt="js logo" width="100px" />
            </section>
            
          </div>
          
          <img src="https://i.imgur.com/XSc9zuX.png" alt="ggmc preview" width="500px" />

        </div>
      </section>

      <section className='font-outfit mx-8 my-8 min-h-64 rounded-2xl bg-yellow-100 w-3/4'>
        <div className='flex justify-between w-full px-8 py-8'>
          <div>
            <h4 className='text-5xl font-bold'>FUNDACJA.II.UNI.WROC.PL</h4>
            <p className='mt-8 text-xl'>Website for Uni Foundation.</p>
            <p className='mt-8'>Technologies</p>
            <section className='flex gap-5'>
              <img className="mt-2" src="https://cdn.iconscout.com/icon/free/png-512/free-vue-282497.png?f=webp&w=256" alt="" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp" alt="html5 logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256" alt="css logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256" alt="js logo" width="100px" />
            </section>
            
          </div>
          
          <img src="https://i.imgur.com/bevfdIv.png" alt="fundacja preview" width="500px" />

        </div>
      </section>

      <section className='font-outfit mx-8 my-8 min-h-64 rounded-2xl bg-teal-100 w-3/4'>
        <div className='flex justify-between w-full px-8 py-8'>
          <div>
            <h4 className='text-5xl font-bold'>MARIOLAKOBUS.PL</h4>
            <p className='mt-8 text-xl'>Website for local accounter.</p>
            <p className='mt-8'>Technologies</p>
            <section className='flex gap-5'>
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp" alt="html5 logo" width="100px" />
              <img src="https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256" alt="css logo" width="100px" />
            </section>
            
          </div>
          
          <img src="https://i.imgur.com/5k2y6K1.png" alt="fundacja preview" width="500px" />

        </div>
      </section>

    </div>
  );
}