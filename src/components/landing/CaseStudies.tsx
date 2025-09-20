import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import { useAppContext } from "../../context/AppContext";

const CaseStudiesContainer = styled.section`
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

const CaseStudiesTitle = styled.h2`
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

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CaseStudyCard = styled.div`
  /* Frosted Glass Effect */
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Border and Shadow */
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 61, 130, 0.1), 0 4px 16px rgba(0, 61, 130, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5);

  /* Transitions */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

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
    transform: translateY(-12px) scale(1.02);
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 20px 40px rgba(0, 61, 130, 0.15), 0 8px 24px rgba(0, 61, 130, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);

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

const CaseStudyImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${({ imageUrl }) => process.env.PUBLIC_URL + imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;

  /* Light overlay on image for better text readability */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0%, rgba(0, 61, 130, 0.05) 100%);
  }
`;

const CaseStudyContent = styled.div`
  padding: 2rem 1.5rem;

  /* Enhanced glass background for content */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const CaseStudyTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.heading};

  /* Text shadow for better readability on glass */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const CaseStudyDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;

  /* Enhanced readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  font-weight: 400;

  /* Better contrast background */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const CaseStudyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;

  /* Glass background for meta */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* Text shadow for readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
`;

const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  position: relative;
  z-index: 2;
`;

const CaseStudies: React.FC = () => {
  const { t } = useAppContext();

  const caseStudies = [
    {
      id: 1,
      title: t("landing.caseStudies.studies.rotterdam.title"),
      description: t("landing.caseStudies.studies.rotterdam.description"),
      imageUrl: "/images/case-study-1.svg",
      date: "January 15, 2023",
      author: "Dr. Emma Johnson",
    },
    {
      id: 2,
      title: t("landing.caseStudies.studies.shanghai.title"),
      description: t("landing.caseStudies.studies.shanghai.description"),
      imageUrl: "/images/case-study-2.svg",
      date: "March 22, 2023",
      author: "Prof. Liu Wei",
    },
    {
      id: 3,
      title: t("landing.caseStudies.studies.singapore.title"),
      description: t("landing.caseStudies.studies.singapore.description"),
      imageUrl: "/images/case-study-3.svg",
      date: "May 10, 2023",
      author: "Dr. Tan Mei Ling",
    },
  ];

  return (
    <CaseStudiesContainer id="case-studies">
      <CaseStudiesTitle>{t("landing.caseStudies.title")}</CaseStudiesTitle>
      <CaseStudiesGrid>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id}>
            <CaseStudyImage imageUrl={study.imageUrl} />
            <CaseStudyContent>
              <CaseStudyTitle>{study.title}</CaseStudyTitle>
              <CaseStudyDescription>{study.description}</CaseStudyDescription>
              <CaseStudyMeta>
                <span>{study.date}</span>
                <span>{study.author}</span>
              </CaseStudyMeta>
            </CaseStudyContent>
          </CaseStudyCard>
        ))}
      </CaseStudiesGrid>
      <ViewAllContainer>
        <Button as={Link} to="/case-studies" variant="generateReport">
          {t("landing.caseStudies.viewAll")}
        </Button>
      </ViewAllContainer>
    </CaseStudiesContainer>
  );
};

export default CaseStudies;
