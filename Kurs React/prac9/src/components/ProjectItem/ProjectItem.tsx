import React from 'react';

interface TechnologyIcon {
  src: string;
  alt: string;
}

interface ProjectItemProps {
  projectName: string;
  description: string;
  technologyIcons: TechnologyIcon[];
  previewImage: string;
  backgroundColor: string; 
}

const ProjectItem: React.FC<ProjectItemProps> = ({ projectName, description, technologyIcons, previewImage, backgroundColor }) => {
  return (
    <section className={`font-outfit mx-8 my-8 min-h-64 rounded-2xl ${backgroundColor} w-3/4`}>
      <div className='flex justify-between w-full px-8 py-8'>
        <div>
          <h4 className='text-5xl font-bold'>{projectName}</h4>
          <p className='mt-8 text-xl'>{description}</p>
          <p className='mt-8'>Technologies</p>
          <section className='flex gap-5'>
            {technologyIcons.map((icon, index) => (
              <img key={index} className="mt-2" src={icon.src} alt={icon.alt} width="100px"/>
            ))}
          </section>
        </div>
        <img src={previewImage} alt={`${projectName} preview`} width="500px" />
      </div>
    </section>
  );
};

export default ProjectItem;
