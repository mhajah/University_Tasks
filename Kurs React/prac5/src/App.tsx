import React, { useState } from "react";
import "./styles.css";

import TeamCard from "./components/cards/TeamCard/TeamCard";
import ContactCard from "./components/cards/ContactCard/ContactCard";
import BlogCard from "./components/cards/BlogCard/BlogCard";
import ServicesCard from "./components/cards/ServicesCard/ServicesCard";
import AboutCard from "./components/cards/AboutCard/AboutCard";

const companyData = {
  name: "Acme Corporation",
  slogan: "Innovation at its best",
  about:
    "We are a leading provider of innovative solutions in various industries. Our team is dedicated to delivering high-quality products and services to our clients worldwide.",
  services: [
    {
      id: 1,
      name: "Web Development",
      description: "Creating modern and responsive websites.",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Building mobile applications for iOS and Android.",
    },
    {
      id: 3,
      name: "UI/UX Design",
      description:
        "Designing intuitive user interfaces for optimal user experience.",
    },
    {
      id: 4,
      name: "Digital Marketing",
      description:
        "Promoting products and services through various online channels.",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Alice Young",
      position: "CEO",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et nisi cursus, sit amet laoreet odio rutrum.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      bio: "Duis aliquam purus ac ante volutpat, nec lobortis tortor sagittis. Sed finibus eleifend efficitur.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "Lead Designer",
      bio: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris consectetur, velit et efficitur fringilla, ligula felis dignissim.",
      image: "https://via.placeholder.com/150",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "The Future of Technology",
      date: "March 10, 2024",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et nisi cursus, sit amet laoreet odio rutrum.",
    },
    {
      id: 2,
      title: "Design Trends for 2024",
      date: "February 28, 2024",
      content:
        "Duis aliquam purus ac ante volutpat, nec lobortis tortor sagittis. Sed finibus eleifend efficitur.",
    },
    {
      id: 3,
      title: "The Power of Social Media",
      date: "February 15, 2024",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris consectetur, velit et efficitur fringilla, ligula felis dignissim.",
    },
    {
      id: 4,
      title: "Artificial Intelligence in Business",
      date: "January 30, 2024",
      content:
        "Suspendisse eget sapien vitae eros tincidunt ultrices. Morbi nec sem nisi. Nulla ultrices odio et eros varius, a eleifend velit tristique.",
    },
    {
      id: 5,
      title: "The Impact of Virtual Reality",
      date: "January 15, 2024",
      content:
        "Integer auctor neque mauris, eget sagittis justo tristique sit amet. Nam at nibh et nulla suscipit blandit eu nec mi.",
    },
  ],
};

const App = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`portfolio ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="navbar">
        <a href="#header">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#team">Team</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
        <button onClick={toggleTheme} className="theme-toggle-button">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <header id="header" className="header">
        <div className="header-content">
          <h1>{companyData.name}</h1>
          <p>{companyData.slogan}</p>
        </div>
      </header>

      <div className="content-card">

        <AboutCard about={companyData.about} />

        <ServicesCard services={companyData.services} />

        <TeamCard teamMembers={companyData.teamMembers} />

        <BlogCard blogPosts={companyData.blogPosts} />

        <ContactCard handleSubmit={handleSubmit} />
        
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} {companyData.name}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
