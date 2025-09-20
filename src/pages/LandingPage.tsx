import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import CaseStudies from '../components/landing/CaseStudies';
import CallToAction from '../components/landing/CallToAction';

const LandingPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const LandingPage: React.FC = () => {
  return (
    <LandingPageContainer>
      <Navbar />
      <MainContent>
        <Hero />
        <Features />
        <HowItWorks />
        <CaseStudies />
        <CallToAction />
      </MainContent>
      <Footer />
    </LandingPageContainer>
  );
};

export default LandingPage;