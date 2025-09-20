import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";

const FeaturesContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
    opacity: 0.3;
    pointer-events: none;
  }
`;

const FeaturesTitle = styled.h2`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  /* Frosted Glass Effect */
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Border and Shadow */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 61, 130, 0.1), 0 4px 16px rgba(0, 61, 130, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4);

  /* Layout */
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

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

  /* Content positioning */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;

  /* Glass effect for icon background */
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 61, 130, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 61, 130, 0.2);
  border-radius: 20px;

  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    background: rgba(0, 61, 130, 0.15);
    border-color: rgba(0, 61, 130, 0.3);
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.heading};

  /* Text shadow for better readability on glass */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  font-size: 1rem;

  /* Enhanced readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  font-weight: 400;

  /* Better contrast on glass background */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 0.5rem;
`;

const Features: React.FC = () => {
  const { t } = useAppContext();

  const features = [
    {
      icon: "📊",
      title: t("landing.features.dataIntegration.title"),
      description: t("landing.features.dataIntegration.description"),
    },
    {
      icon: "🔍",
      title: t("landing.features.prediction.title"),
      description: t("landing.features.prediction.description"),
    },
    {
      icon: "💡",
      title: t("landing.features.insights.title"),
      description: t("landing.features.insights.description"),
    },
  ];

  return (
    <FeaturesContainer id="features">
      <FeaturesTitle>{t("landing.features.title")}</FeaturesTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesContainer>
  );
};

export default Features;
