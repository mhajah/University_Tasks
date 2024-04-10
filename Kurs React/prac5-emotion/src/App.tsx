import React, { useState } from "react";

import styled from '@emotion/styled';
import { ThemeProvider, withTheme } from "@emotion/react";

//tylko dla body
import "./styles.css";

import TeamCard from "./components/cards/TeamCard/TeamCard";
import ContactCard from "./components/cards/ContactCard/ContactCard";
import BlogCard from "./components/cards/BlogCard/BlogCard";
import ServicesCard from "./components/cards/ServicesCard/ServicesCard";
import AboutCard from "./components/cards/AboutCard/AboutCard";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

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

const lightTheme = {
  text: '#333',
  textToggleButton: '#fff',
  background: '#f0f0f0',
  backgroundSection: '#fff',
  backgroundEven: '#f5f5f5',
  backgroundCards: '#fff',
  themeToggleBg: '#333',
  themeToggleHoverBg: '#555',
  contactForm: '#f9f9f9',
  borderColor: '#ddd',
  inputColor: '#fff',
  buttonColor: '#45a049',
  buttonText: '#fff',
  backgroundTeam: '#fff',
}

const darkTheme = {
  text: '#fff',
  textToggleButton: '#333',
  background: '#222',
  backgroundSection: '#111',
  backgroundEven: '#333',
  backgroundCards: '#444',
  themeToggleBg: '#ddd',
  themeToggleHoverBg: '#ccc',
  contactForm: '#333',
  borderColor: '#555',
  inputColor: '#666',
  buttonColor: '#45a049',
  buttonText: '#fff',
  backgroundTeam: '#444',
}

const Portfolio = styled.div`
  margin: 0 auto;
  background-color: ${(props) => props.theme.backgroundSection};
  color: ${(props) => props.theme.text};
`;

const ContentCard = styled.div`
  border-radius: 10px;
  margin: 20px 0;
  background-color: ${(props) => props.theme.backgroundCards};

  section:nth-child(odd) {
    background-color: ${(props) => props.theme.backgroundEven};
  }
`;

const App = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Portfolio>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

        <Header name={companyData.name} slogan={companyData.slogan} />

        <ContentCard>

          <AboutCard about={companyData.about} />

          <ServicesCard services={companyData.services} />

          <TeamCard teamMembers={companyData.teamMembers} theme={darkMode} />

          <BlogCard blogPosts={companyData.blogPosts} />

          <ContactCard handleSubmit={handleSubmit} />
          
        </ContentCard>

        <Footer name={companyData.name} />
      </Portfolio>
    </ThemeProvider>
  );
};

export default App;
