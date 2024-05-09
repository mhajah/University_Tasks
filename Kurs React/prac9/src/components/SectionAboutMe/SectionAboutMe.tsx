import React from 'react';

interface Icon {
  src: string;
  alt: string;
}

interface Item {
  name: string;
  dates?: string;
  icons?: Icon[];
}

interface SectionProps {
  title: string;
  items: Item[];
  sectionColor: string;
}

const SectionAboutMe: React.FC<SectionProps> = ({ title, items, sectionColor }) => {
  return (
    <section className='font-outfit my-8'>
      <h3 className='px-20 text-4xl font-bold mb-8'>{title}</h3>
      <ul className='px-4'>
        {items.map((item, index) => (
          <li key={index} className={`w-full h-32 flex items-center px-8 transition ease-in-out delay-20 hover:bg-${sectionColor}-100 rounded-2xl flex justify-between`}>
            <h4 className='text-3xl font-bold flex items-center gap-4'>
              <span className={`text-6xl text-${sectionColor}-500`}>{index + 1}. </span>{item.name}
            </h4>
            <p className='text-xl'>{item.dates}</p>
            {item.icons && (
              <div className='flex'>
                {item.icons.map((icon, i) => (
                  <img key={i} src={icon.src} alt={icon.alt} width="100px" />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SectionAboutMe;
