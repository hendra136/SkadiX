import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import { useAppContext } from "../../context/AppContext";

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: url("/images/port-bg.jpg");
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.colors.white};
  padding-top: 120px; /* Space for navbar */
`;

const HeroContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  padding: 3rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 800px;
    padding: 2.5rem;
    margin: 0 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 700px;
    padding: 2rem;
    margin: 0 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: none;
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

const HeroActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Hero: React.FC = () => {
  const { t } = useAppContext();

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>{t("hero.title")}</HeroTitle>
        <HeroSubtitle>{t("hero.subtitle")}</HeroSubtitle>
        <HeroActions>
          <Button as={Link} to="/dashboard" variant="generateReport" size="large">
            {t("hero.tryTool")}
          </Button>
          <Button as={Link} to="/case-studies" variant="transparentOutline" size="large">
            {t("hero.viewCaseStudies")}
          </Button>
        </HeroActions>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
