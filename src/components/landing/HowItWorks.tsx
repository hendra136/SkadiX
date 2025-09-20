import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";

const HowItWorksContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23003d8220" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.2;
    pointer-events: none;
  }
`;

const HowItWorksTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
  }
`;

const StepsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 3rem;
  position: relative;

  /* Frosted Glass Effect */
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Border and Shadow */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 61, 130, 0.1), 0 4px 16px rgba(0, 61, 130, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4);

  /* Transitions */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Gradient overlay for depth */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 61, 130, 0.02) 100%);
    pointer-events: none;
    z-index: 1;
    border-radius: 20px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  /* Connection line between steps */
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 2rem;
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, rgba(0, 61, 130, 0.3) 100%);
    border-radius: 2px;
    z-index: 3;
  }

  /* Hover Effects */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 20px 40px rgba(0, 61, 130, 0.15), 0 8px 24px rgba(0, 61, 130, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);

    &::before {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(0, 61, 130, 0.03) 100%);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;

    &:not(:last-child)::after {
      left: 50%;
      top: calc(100% + 0.5rem);
      height: 1.5rem;
    }
  }

  /* Content positioning */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 2rem;
  flex-shrink: 0;
  z-index: 2;
  position: relative;

  /* Glass effect overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    backdrop-filter: blur(5px);
  }

  /* Enhanced shadow */
  box-shadow: 0 8px 24px rgba(0, 61, 130, 0.3), 0 4px 12px rgba(0, 61, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);

  transition: all 0.3s ease;

  ${Step}:hover & {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(0, 61, 130, 0.4), 0 6px 16px rgba(0, 61, 130, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const StepContent = styled.div`
  flex: 1;

  /* Enhanced glass background for content */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.heading};

  /* Text shadow for better readability on glass */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 0;
  font-size: 1rem;

  /* Enhanced readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  font-weight: 400;

  /* Better contrast background */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const HowItWorks: React.FC = () => {
  const { t } = useAppContext();

  const steps = [
    {
      number: 1,
      title: t("landing.howItWorks.steps.selectPort.title"),
      description: t("landing.howItWorks.steps.selectPort.description"),
    },
    {
      number: 2,
      title: t("landing.howItWorks.steps.chooseScenario.title"),
      description: t("landing.howItWorks.steps.chooseScenario.description"),
    },
    {
      number: 3,
      title: t("landing.howItWorks.steps.adjustParameters.title"),
      description: t("landing.howItWorks.steps.adjustParameters.description"),
    },
    {
      number: 4,
      title: t("landing.howItWorks.steps.visualizeResults.title"),
      description: t("landing.howItWorks.steps.visualizeResults.description"),
    },
  ];

  return (
    <HowItWorksContainer id="how-it-works">
      <HowItWorksTitle>{t("landing.howItWorks.title")}</HowItWorksTitle>
      <StepsContainer>
        {steps.map((step) => (
          <Step key={step.number}>
            <StepNumber>{step.number}</StepNumber>
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </Step>
        ))}
      </StepsContainer>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
