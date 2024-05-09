import React from 'react'
import MyPhoto from '../../photo.svg'
import SectionAboutMe from '../../components/SectionAboutMe/SectionAboutMe'

const educationItems = [
  { name: 'Szkoła Podstawowa i Gimnazjum w Piszu', dates: '2007-2016' },
  { name: 'Technikum (technik informatyk) w Olsztynie', dates: '2017-2021' },
  { name: 'Uniwersytet Wrocławski (informatyka) we Wrocławiu', dates: '2021-2025' }
];

const experienceItems = [
  { name: 'Freelancer', dates: '2017 - now' },
  { name: 'EZN Wrocław (algorithm teacher)', dates: '2023 - now' },
  { name: 'Ten Square Games (frontend developer)', dates: '2024 - now' }
];

const skillsItems = [
  { name: 'HTML & CSS', icons: [{ src: 'https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp', alt: 'html5 logo' }, { src: 'https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256', alt: 'css logo' }] },
  { name: 'JavaScript', icons: [{ src: 'https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256', alt: 'js logo' }, { src: 'https://cdn.iconscout.com/icon/free/png-512/free-react-1543566-1306069.png?f=webp&w=256', alt: 'react logo' }] },
  { name: 'Backend', icons: [{ src: 'https://cdn.iconscout.com/icon/free/png-512/free-net-51-190792.png?f=webp&w=256', alt: 'js logo' }] }
];

export default function About() {

  return (
    <div>
      <section className='flex flex-col justify-center items-center m'>
        <img src={MyPhoto} alt="My Photo" width="200px" height="200px" />
        <p className='font-outfit py-8 text-2xl max-w-2xl flex'>I am a third-year computer science student at the University of Wrocław, primarily focusing on front-end technologies. I have a special affinity for React.</p>
        <p className='font-outfit text-2xl max-w-2xl flex'>Exploring the intricacies of user interfaces and crafting engaging web experiences is both my passion and my professional aspiration. I enjoy the challenge of staying updated with the latest trends and techniques in front-end development, constantly seeking to enhance my skills and broaden my knowledge.</p>
        <p className='font-outfit py-8 text-2xl max-w-2xl flex'>Outside of academics, I actively contribute to open-source projects related to React, participate in coding competitions, and attend tech meetups to network with like-minded individuals and learn from industry experts.</p>
      </section>

      <SectionAboutMe title="Education" items={educationItems} sectionColor="yellow" />
      <SectionAboutMe title="Experience" items={experienceItems} sectionColor="blue" />
      <SectionAboutMe title="Skills" items={skillsItems} sectionColor="teal" />
    </div>
  );
}