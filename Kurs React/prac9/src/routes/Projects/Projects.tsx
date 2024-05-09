import React from 'react'
import MyPhoto from '../../photo.svg'
import ProjectItem from '../../components/ProjectItem/ProjectItem';  

const Projects: React.FC = () => {
  const projects = [
    {
      projectName: "GGMC.PL",
      description: "Website for a computer game server (Minecraft).",
      technologyIcons: [
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-bootstrap-226077.png?f=webp&w=256", alt: "Bootstrap logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp", alt: "HTML5 logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256", alt: "CSS3 logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256", alt: "JavaScript logo" }
      ],
      previewImage: "https://i.imgur.com/XSc9zuX.png",
      backgroundColor: "bg-blue-100"
    },
    {
      projectName: "FUNDACJA.II.UNI.WROC.PL",
      description: "Website for Uni Foundation.",
      technologyIcons: [
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-vue-282497.png?f=webp&w=256", alt: "Vue logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp", alt: "HTML5 logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256", alt: "CSS3 logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2038874-1720087.png?f=webp&w=256", alt: "JavaScript logo" }
      ],
      previewImage: "https://i.imgur.com/bevfdIv.png",
      backgroundColor: "bg-yellow-100"
    },
    {
      projectName: "MARIOLAKOBUS.PL",
      description: "Website for local accounter",
      technologyIcons: [
        { src: "https://cdn.iconscout.com/icon/free/png-256/free-html5-41-1175209.png?f=webp", alt: "HTML5 logo" },
        { src: "https://cdn.iconscout.com/icon/free/png-512/free-css-38-226095.png?f=webp&w=256", alt: "CSS3 logo" },
      ],
      previewImage: "https://i.imgur.com/lS6A0fl.png",
      backgroundColor: "bg-red-100"
    }
  ];

  return (
    <div className='flex justify-center flex-col items-center'>
      <section className='flex flex-col justify-center items-center mt-16'>
        <h2 className='text-6xl font-outfit font-bold'>MY PROJECTS</h2>
      </section>

      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          projectName={project.projectName}
          description={project.description}
          technologyIcons={project.technologyIcons}
          previewImage={project.previewImage}
          backgroundColor={project.backgroundColor}
        />
      ))}

    </div>
  );
}

export default Projects;