import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import CallToAction from "../components/landing/CallToAction";
import { useAppContext } from "../context/AppContext";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
}

const CaseStudiesPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
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
    opacity: 0.2;
    pointer-events: none;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1rem;
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
    transform: translateY(-8px) scale(1.02);
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
  height: 180px;
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
  padding: 1.5rem 1.25rem;

  /* Enhanced glass background for content */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const CaseStudyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.heading};

  /* Text shadow for better readability on glass */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const CaseStudyDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* Enhanced readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  font-weight: 400;

  /* Better contrast background */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const CaseStudyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.75rem;
  margin-bottom: 1rem;

  /* Glass background for meta */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* Text shadow for readability */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
`;

const CaseStudyActions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
`;

const CaseStudyTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  background: rgba(0, 61, 130, 0.15);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid rgba(0, 61, 130, 0.3);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;



const CaseStudiesPage: React.FC = () => {
  const { t } = useAppContext();

  // Get case studies from translation data with proper type checking
  const caseStudiesData = t("caseStudies.studies");
  const caseStudies: CaseStudy[] = Array.isArray(caseStudiesData) ? caseStudiesData : [];

  // Image mapping for case studies
  const imageMapping = ["/images/case-study-1.svg", "/images/case-study-2.svg", "/images/case-study-3.svg", "/images/case-study-1.svg", "/images/case-study-2.svg", "/images/case-study-3.svg"];

  // Safe image selection function
  const getImageUrl = (index: number): string => {
    if (imageMapping.length === 0) return "/images/case-study-1.svg";
    return imageMapping[index % imageMapping.length];
  };

  return (
    <CaseStudiesPageContainer>
      <Navbar />
      <MainContent>
        <PageTitle>{t("caseStudies.title")}</PageTitle>
        <PageSubtitle>{t("caseStudies.subtitle")}</PageSubtitle>
        <CaseStudiesGrid>
          {caseStudies.length > 0 ? (
            caseStudies.map((study: CaseStudy, index: number) => (
              <CaseStudyCard key={study.id || `case-study-${index}`}>
                <CaseStudyImage imageUrl={getImageUrl(index)} />
                <CaseStudyContent>
                  <CaseStudyTitle>{study.title}</CaseStudyTitle>
                  <CaseStudyTags>{Array.isArray(study.tags) && study.tags.map((tag: string, tagIndex: number) => <Tag key={tagIndex}>{tag}</Tag>)}</CaseStudyTags>
                  <CaseStudyDescription>{study.description || "No description available"}</CaseStudyDescription>
                  <CaseStudyMeta>
                    <span>{study.date || "Date not available"}</span>
                    <span>{study.author || "Author not available"}</span>
                  </CaseStudyMeta>
                  <CaseStudyActions>
                    <Button
                      variant="primaryOutline"
                      size="small"
                      onClick={() => {
                        // Handle read more action
                      }}
                    >
                      Read More
                    </Button>
                  </CaseStudyActions>
                </CaseStudyContent>
              </CaseStudyCard>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "2rem",
                color: "#666",
              }}
            >
              {t("caseStudies.noStudies") || "No case studies available at the moment."}
            </div>
          )}
        </CaseStudiesGrid>
      </MainContent>

      <CallToAction />

      <Footer />
    </CaseStudiesPageContainer>
  );
};

export default CaseStudiesPage;
