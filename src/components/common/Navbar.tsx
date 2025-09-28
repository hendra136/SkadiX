import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";
import { languages } from "../../translations";
import ModernSelect from "./ModernSelect";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 3rem;
  min-height: 70px;

  /* Modern Glass Morphism Background */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 50%, rgba(241, 245, 249, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Enhanced Border and Shadow */
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 61, 130, 0.08), 0 4px 16px rgba(0, 61, 130, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6);

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
    background: linear-gradient(135deg, rgba(0, 61, 130, 0.02) 0%, rgba(0, 119, 182, 0.01) 100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    padding: 0.75rem 1.5rem;
    min-height: 65px;
    height: 65px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.75rem 1rem;
    height: 65px;
    min-height: 65px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.75rem 0.75rem;
    height: 65px;
    min-height: 65px;
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
  padding: 1rem 0;
  margin-right: auto; /* <-- TAMBAHKAN BARIS INI */

  /* Modern gradient text */
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 50%, #0077b6 100%);
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
    font-size: 1.2rem;
    padding: 0.5rem 0;

    img {
      height: 32px;
      margin-right: 0.4rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
    padding: 0.375rem 0;

    img {
      height: 28px;
      margin-right: 0.3rem;
    }
  }
`;

const CenterContainer = styled.div`
  /* Push navigation links to the right */
  display: flex;
  align-items: center;
  z-index: 2;
  margin-left: auto;

  /* Hide on mobile breakpoint */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl || "1200px"}) {
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    gap: 1.2rem;
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
    background: linear-gradient(135deg, rgba(0, 61, 130, 0.1) 0%, rgba(0, 119, 182, 0.08) 100%);
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
      background: linear-gradient(135deg, rgba(0, 61, 130, 0.15) 0%, rgba(0, 119, 182, 0.12) 100%);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl || "1200px"}) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  padding: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl || "1200px"}) {
    gap: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    gap: 0.375rem;
    padding: 0.75rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.75rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.75rem 0;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    gap: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.375rem;
  }
`;

const NavbarSelect = styled(ModernSelect)`
  margin: 0.5rem 0.75rem 0.5rem 0.25rem;

  /* Compact design with fixed dimensions and specific styling */
  & select {
    width: 120px !important;
    min-width: 120px !important;
    max-width: 120px !important;
    height: 40px !important;
    padding: 8px 24px 8px 8px !important;
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
      border-color: #007bff !important;
      outline: none !important;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1) !important;
    }

    &:hover {
      border-color: #007bff !important;
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
      background: #007bff !important;
      color: #ffffff !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg || "992px"}) {
    margin: 0.375rem 0.5rem 0.375rem 0.375rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0.375rem 0.5rem 0.375rem 0.375rem;
    
    & select {
      width: 100px !important;
      min-width: 100px !important;
      max-width: 100px !important;
      height: 36px !important;
      font-size: 12px !important;
      padding: 6px 20px 6px 6px !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0.25rem 0.375rem 0.25rem 0.25rem;
    
    & select {
      width: 90px !important;
      min-width: 90px !important;
      max-width: 90px !important;
      height: 36px !important;
      font-size: 11px !important;
      padding: 6px 18px 6px 5px !important;
    }
  }
`;

const MobileMenuButton = styled.button`
  /* Hide by default on desktop */
  display: none;
  background: linear-gradient(135deg, #003d82 0%, #002752 100%);
  border: none;
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  font-weight: 600;
  min-height: 36px;
  min-width: 36px;
  width: 36px;
  height: 36px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 2px 8px rgba(0, 61, 130, 0.3);
  
  /* Perfect centering for the icon */
  align-items: center;
  justify-content: center;
  line-height: 1;

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

  /* Show only on mobile breakpoint */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
    padding: 0;
    min-height: 32px;
    min-width: 32px;
    width: 32px;
    height: 32px;
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
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  /* Modern glass morphism background */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 50%, rgba(241, 245, 249, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Enhanced border and shadow */
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 61, 130, 0.12), 0 4px 16px rgba(0, 61, 130, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);

  /* Enhanced smooth animations */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 65px;
    max-height: calc(100vh - 65px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 65px;
    max-height: calc(100vh - 65px);
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
    background: linear-gradient(135deg, rgba(0, 61, 130, 0.08) 0%, rgba(0, 119, 182, 0.06) 100%);
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

    if (location.pathname !== "/") {
      // If not on landing page, navigate to landing page first
      navigate("/");
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
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
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

        <CenterContainer>
          <NavLinks>
            <NavLink to="/">{t("navbar.home")}</NavLink>
            <NavLink to="/case-studies">{t("navbar.caseStudies")}</NavLink>
            <NavLink to="#" onClick={handleContactClick}>
              {t("navbar.contact")}
            </NavLink>
          </NavLinks>
        </CenterContainer>

        <RightContainer>
          <RightSection>
            <NavbarSelect
              value={language}
              onChange={handleLanguageChange}
              options={languages.map((lang) => ({
                value: lang.code,
                label: lang.name,
              }))}
              size="small"
            />
            <MobileMenuButton onClick={toggleMenu}>{isMenuOpen ? "✕" : "☰"}</MobileMenuButton>
          </RightSection>
        </RightContainer>
      </NavbarContainer>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
          {t("navbar.home")}
        </MobileNavLink>
        <MobileNavLink to="/case-studies" onClick={() => setIsMenuOpen(false)}>
          {t("navbar.caseStudies")}
        </MobileNavLink>
        <MobileNavLink to="#" onClick={handleContactClick}>
          {t("navbar.contact")}
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar;
