import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { languages } from '../../translations';
import ModernSelect from './ModernSelect';

const NavbarContainer = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-items: stretch;
  padding: 0 3rem;
  gap: 3rem;
  min-height: 70px;
  
  /* Modern Glass Morphism Background */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 50%, 
    rgba(241, 245, 249, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Enhanced Border and Shadow */
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 61, 130, 0.08),
    0 4px 16px rgba(0, 61, 130, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 70px;
  
  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Subtle animation on scroll */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.02) 0%, 
      rgba(0, 119, 182, 0.01) 100%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg || '992px'}) {
    padding: 1rem 2rem;
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    height: 70px;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem 1rem;
    height: 60px;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  z-index: 2;
  justify-self: start;
  padding: 1rem 0;
  
  /* Modern gradient text */
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 50%,
    #0077b6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Enhanced typography */
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.02em;
  
  /* Smooth transitions */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Hover effects */
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
    
    img {
      transform: scale(1.05) rotate(2deg);
    }
  }
  
  img {
    height: 42px;
    margin-right: 0.6rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 8px rgba(0, 61, 130, 0.2));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.4rem;
    
    img {
      height: 38px;
      margin-right: 0.5rem;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.3rem;
    
    img {
      height: 34px;
      margin-right: 0.4rem;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl || '1200px'}) {
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || '992px'}) {
    gap: 1.2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  /* Enhanced typography for better readability */
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  
  /* Smooth transitions */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Glass morphism background on hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.1) 0%, 
      rgba(0, 119, 182, 0.08) 100%
    );
    border-radius: 12px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    
    &::before {
      opacity: 1;
      transform: scale(1);
      background: linear-gradient(135deg, 
        rgba(0, 61, 130, 0.15) 0%, 
        rgba(0, 119, 182, 0.12) 100%
      );
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl || '1200px'}) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || '992px'}) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
`;



const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl || '1200px'}) {
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || '992px'}) {
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 2;
`;

const NavbarSelect = styled(ModernSelect)`
  margin-left: 0;
  
  /* Compact design with fixed dimensions and specific styling */
  & select {
    width: 120px !important;
    min-width: 120px !important;
    max-width: 120px !important;
    height: 36px !important;
    padding: 6px 24px 6px 8px !important;
    font-size: 14px !important;
    border-radius: 6px !important;
    background: #ffffff !important;
    border: 1px solid #ddd !important;
    background-size: 12px !important;
    background-position: right 8px center !important;
    font-weight: 500 !important;
    line-height: 1.2 !important;
    display: flex !important;
    align-items: center !important;
    box-sizing: border-box !important;
    
    &:focus {
      border-color: #007BFF !important;
      outline: none !important;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1) !important;
    }
    
    &:hover {
      border-color: #007BFF !important;
    }
  }
  
  /* Option styling for hover effects */
  & select option {
    background: #ffffff !important;
    color: #333333 !important;
    padding: 8px 12px !important;
    
    &:hover {
      background: #f5f5f5 !important;
    }
    
    &:checked,
    &:selected {
      background: #007BFF !important;
      color: #ffffff !important;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl || '1200px'}) {
    margin-left: 0.6rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg || '992px'}) {
    margin-left: 0.5rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: linear-gradient(135deg, #003d82 0%, #002752 100%);
  border: none;
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  min-height: 36px;
  min-width: 36px;
  margin-left: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 2px 8px rgba(0, 61, 130, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #002752 0%, #001a3d 100%);
    transform: scale(1.05);
    box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.4);
  }
  
  &:focus {
    box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.4), 0 0 0 2px rgba(0, 61, 130, 0.3);
    outline: none;
  }
  
  &:active {
    background: linear-gradient(135deg, #001a3d 0%, #000f26 100%);
    transform: scale(1);
    box-shadow: 0px 2px 8px rgba(0, 61, 130, 0.3);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
    padding: 6px 10px;
    min-height: 32px;
    min-width: 32px;
    border-radius: 4px;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 999;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  padding: 1.5rem;
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  
  /* Modern glass morphism background */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 50%, 
    rgba(241, 245, 249, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Enhanced border and shadow */
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 61, 130, 0.12),
    0 4px 16px rgba(0, 61, 130, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  
  /* Enhanced smooth animations */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 70px;
    max-height: calc(100vh - 70px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 60px;
    max-height: calc(100vh - 60px);
    padding: 1rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none !important;
   }
`;

const MobileNavLink = styled(Link)`
  padding: 1.2rem 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  
  /* Enhanced typography */
  letter-spacing: -0.01em;
  
  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Glass morphism background on hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.08) 0%, 
      rgba(0, 119, 182, 0.06) 100%
    );
    border-radius: 12px;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(8px);
    
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &:active {
    transform: translateX(4px) scale(0.98);
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as any);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      // If not on landing page, navigate to landing page first
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToContact();
      }, 100);
    } else {
      // If already on landing page, just scroll
      scrollToContact();
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <NavbarContainer>
        <Logo to="/">
          <img src="/logo.svg" alt="SkadiX - Cold-Chain Logistics Infrastructure" />
          <span>SkadiX</span>
        </Logo>
        
        <RightContainer>
          <NavLinks>
            <NavLink to="/">{t('navbar.home')}</NavLink>
            <NavLink to="/case-studies">{t('navbar.caseStudies')}</NavLink>
            <NavLink to="/reports">{t('navbar.reports')}</NavLink>
            <NavLink to="#" onClick={handleContactClick}>{t('navbar.contact')}</NavLink>
          </NavLinks>
          
          <RightSection>
            <NavbarSelect
              value={language}
              onChange={handleLanguageChange}
              options={languages.map(lang => ({
                value: lang.code,
                label: lang.name
              }))}
              size="small"
            />
            <MobileMenuButton onClick={toggleMenu}>
              {isMenuOpen ? '✕' : '☰'}
            </MobileMenuButton>
          </RightSection>
        </RightContainer>
      </NavbarContainer>
      
      <MobileMenu isOpen={isMenuOpen}>
        <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</MobileNavLink>
        <MobileNavLink to="/case-studies" onClick={() => setIsMenuOpen(false)}>{t('navbar.caseStudies')}</MobileNavLink>
        <MobileNavLink to="/reports" onClick={() => setIsMenuOpen(false)}>{t('navbar.reports')}</MobileNavLink>
        <MobileNavLink to="#" onClick={handleContactClick}>{t('navbar.contact')}</MobileNavLink>
        
        <ModernSelect
          value={language}
          onChange={handleLanguageChange}
          options={languages.map(lang => ({
            value: lang.code,
            label: lang.name
          }))}
          size="medium"
          style={{ marginTop: '1rem' }}
        />
      </MobileMenu>
    </>
  );
};

export default Navbar;