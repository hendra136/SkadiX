import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import { useAppContext } from "../../context/AppContext";

const CTAContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.white};

  /* Ganti text-align dengan flexbox */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const CallToAction: React.FC = () => {
  const { t } = useAppContext();

  return (
    <CTAContainer>
      <CTATitle>{t("landing.callToAction.title")}</CTATitle>
      <CTADescription>{t("landing.callToAction.description")}</CTADescription>
      <ButtonGroup>
        <Button as={Link} to="/dashboard" size="large" variant="generateReport">
          {t("landing.callToAction.button")}
        </Button>
        <Button as={Link} to="/scenario-studio" size="large" variant="secondary">
          {t("navbar.scenarioStudio")}
        </Button>
      </ButtonGroup>
    </CTAContainer>
  );
};

export default CallToAction;
