import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: ${({ theme }) => theme.colors.white};
`;





const FooterContainer = styled.div`
  background-color: #023e8a;
  padding: 3rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  const { t } = useAppContext();
  
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>{t('footer.company')}</FooterTitle>
            <FooterLink to="/">{t('footer.aboutUs')}</FooterLink>
            <FooterLink to="/">{t('footer.careers')}</FooterLink>
            <FooterLink to="/">{t('footer.news')}</FooterLink>
            <FooterLink to="/">{t('footer.investors')}</FooterLink>
            <FooterLink to="/">{t('footer.contactUs')}</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>{t('footer.quickLinks')}</FooterTitle>
            <FooterLink to="/">{t('footer.home')}</FooterLink>
            <FooterLink to="/dashboard">{t('footer.dashboard')}</FooterLink>
            <FooterLink to="/case-studies">{t('footer.caseStudies')}</FooterLink>
            <FooterLink to="/">{t('footer.contactUs')}</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>{t('footer.resources')}</FooterTitle>
            <FooterLink to="/">{t('footer.documentation')}</FooterLink>
            <FooterLink to="/">{t('footer.api')}</FooterLink>
            <FooterLink to="/">{t('footer.faq')}</FooterLink>
            <FooterLink to="/">{t('footer.blog')}</FooterLink>
          </FooterSection>
          
          <FooterSection id="contact">
            <FooterTitle>{t('footer.contactUs')}</FooterTitle>
            <FooterText>{t('footer.email')}: info@searise.org</FooterText>
            <FooterText>{t('footer.phone')}: +62 822-703-3754</FooterText>
            <FooterText>{t('footer.address')}: 123 Ocean Avenue, Coastal City, 12345</FooterText>
          </FooterSection>
        </FooterContent>
        
        <Copyright>
          &copy; {new Date().getFullYear()} SkadiX. {t('footer.copyright')}
        </Copyright>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;