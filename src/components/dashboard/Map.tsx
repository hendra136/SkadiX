import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import Button from "../common/Button";
import ModernZoomControl from "../common/ModernZoomControl";
import { useAppContext } from "../../context/AppContext";
import { basemaps } from "../../data/mockData";
import CoastalSubmergenceIndicator from "./CoastalSubmergenceIndicator";

// Fix for Leaflet marker icons
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons issue
// Using type assertion to fix TypeScript error
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapWrapper = styled.div`
  flex: 1;
  height: 100%;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: calc(100vh - 60px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: calc(100vh - 56px);
  }
`;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 0;

  /* Atur jarak untuk semua kontrol */
  .leaflet-top {
    top: 120px;
  }
  .leaflet-left {
    left: 20px;
  }
  .leaflet-right {
    right: 20px;
  }

  /* Memaksa kontainer kontrol Leaflet untuk berada di lapisan paling atas */
  .leaflet-control-container {
    z-index: 1000 !important;
  }

  /* Zoom control positioning */
  .leaflet-control-zoom {
    margin-left: 0 !important;
    margin-top: 0 !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .leaflet-top {
      top: 110px;
    }
    .leaflet-right {
      right: 10px;
    }
    .leaflet-left {
      left: 10px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .leaflet-top {
      top: 100px;
    }
    .leaflet-right {
      right: 8px;
    }
    .leaflet-left {
      left: 8px;
    }
  }
`;

const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  left: 320px; /* Position after sidebar width (300px) + margin */
  z-index: 450;
  
  /* Modern Glass Morphism Background */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 50%, 
    rgba(241, 245, 249, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Enhanced styling */
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 61, 130, 0.12),
    0 4px 16px rgba(0, 61, 130, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  
  max-width: 220px;
  font-size: 0.85rem;
  font-weight: 500;
  
  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.02) 0%, 
      rgba(0, 119, 182, 0.01) 50%,
      transparent 100%
    );
    border-radius: 12px;
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    left: 310px; /* Adjust for smaller sidebar on lg screens */
    padding: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 20px;
    left: 20px; /* Back to left when sidebar is hidden on mobile */
    max-width: 200px;
    font-size: 0.8rem;
    padding: 0.8rem;
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: 20px;
    left: 15px;
    max-width: 180px;
    font-size: 0.75rem;
    padding: 0.7rem;
    border-radius: 8px;
  }
`;

const LegendTitle = styled.h4`
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 8px;
  position: relative;
  z-index: 2;
  
  /* Gradient text effect */
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
    ${({ theme }) => theme.colors?.secondary || '#005f73'} 50%,
    #003d82 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Enhanced typography */
  font-family: ${({ theme }) => theme.fonts?.heading || 'Arial, sans-serif'};
  letter-spacing: -0.02em;
  
  /* Modern border with gradient */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
      ${({ theme }) => theme.colors?.secondary || '#005f73'} 50%,
      transparent 100%
    );
    border-radius: 1px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: 2px 0;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(2px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  margin-right: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const LegendLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  line-height: 1.3;
`;

const ReportButtonContainer = styled.div<{ isCoastalActive: boolean }>`
  position: absolute;
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Dynamic positioning based on Coastal Submergence Analysis state */
  ${({ isCoastalActive }) => isCoastalActive ? `
    /* When Coastal Analysis is active - center bottom position */
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
  ` : `
    /* Default position - bottom right */
    bottom: 20px;
    right: 20px;
    transform: none;
    margin-left: 0;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ isCoastalActive }) => !isCoastalActive && `
      right: 15px;
    `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ isCoastalActive }) => isCoastalActive ? `
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    ` : `
      bottom: 20px;
      right: 10px;
      transform: none;
    `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* Always center on mobile for better accessibility */
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
  }
`;

// Component to change the map's center when the selected port changes
const ChangeMapView: React.FC<{ center: [number, number] | null }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);

  return null;
};

// Component to update the map's view when basemap changes
// This is no longer needed as we're using TileLayer directly
// Keeping the ChangeMapView component for port selection

interface MapProps {
  onIndicatorExpandChange?: (isExpanded: boolean) => void;
}

const Map: React.FC<MapProps> = ({ onIndicatorExpandChange }) => {
  const { selectedPort, basemap, generateReport, showCoastalSubmergence, riskData, t } = useAppContext();
  const [selectedBasemap, setSelectedBasemap] = useState(basemaps.find((b) => b.id === basemap) || basemaps[0]);

  useEffect(() => {
    // Update the basemap when it changes in the context
    const newBasemap = basemaps.find((b) => b.id === basemap) || basemaps[0];
    setSelectedBasemap(newBasemap);
  }, [basemap]);

  const getRiskColor = (riskIndex: number) => {
    if (riskIndex < 30) return "#0077b6";
    if (riskIndex < 45) return "#00b4d8";
    if (riskIndex < 60) return "#90e0ef";
    if (riskIndex < 70) return "#ffd166";
    if (riskIndex < 80) return "#fb8500";
    return "#dc2f02";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Low Risk":
        return "#0077b6";
      case "Medium Risk":
        return "#ffd166";
      case "High Risk":
        return "#dc2f02";
      default:
        return "#666";
    }
  };

  return (
    <MapWrapper>
      <StyledMapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} zoomControl={false}>
        {/* Change the map view when the selected port changes */}
        {selectedPort && <ChangeMapView center={selectedPort.coordinates} />}

        {/* Default TileLayer */}
        <TileLayer 
          attribution={selectedBasemap.attribution} 
          url={selectedBasemap.url}
          maxZoom={18}
          minZoom={1}
        />

        {/* Modern Zoom Control */}
        <ModernZoomControl position="top-left" />

        {/* Port marker */}
        {selectedPort && (
          <Marker position={selectedPort.coordinates}>
            <Popup>
              <div>
                <h3>
                  {selectedPort.name}, {selectedPort.country}
                </h3>
                {riskData && (
                  <div>
                    <p>
                      <strong>Sea Level Rise:</strong> {riskData.seaLevelRise.toFixed(2)} meters
                    </p>
                    <p>
                      <strong>Risk Index:</strong> {riskData.riskIndex}
                    </p>
                    <p>
                      <strong>Status:</strong> <span style={{ color: getStatusColor(riskData.status) }}>{riskData.status}</span>
                    </p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Risk visualization */}
        {selectedPort && riskData && (
          <Circle
            center={selectedPort.coordinates}
            radius={riskData.riskIndex * 100}
            pathOptions={{
              color: getRiskColor(riskData.riskIndex),
              fillColor: getRiskColor(riskData.riskIndex),
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <Popup>
              <div>
                <h4>Risk Zone</h4>
                <p>
                  <strong>Risk Index:</strong> {riskData.riskIndex}
                </p>
                <p>
                  <strong>Status:</strong> {riskData.status}
                </p>
              </div>
            </Popup>
          </Circle>
        )}
      </StyledMapContainer>

      {/* Legend */}
      <Legend>
        <LegendTitle>{t('dashboard.legend.title')}</LegendTitle>
        <LegendItem>
          <LegendColor color="#0077b6" />
          <LegendLabel>{t('dashboard.legend.lowRisk')}</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#00b4d8" />
          <LegendLabel>{t('dashboard.legend.lowMedium')}</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#90e0ef" />
          <LegendLabel>{t('dashboard.legend.medium')}</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#ffd166" />
          <LegendLabel>{t('dashboard.legend.mediumHigh')}</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#fb8500" />
          <LegendLabel>{t('dashboard.legend.high')}</LegendLabel>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#dc2f02" />
          <LegendLabel>{t('dashboard.legend.critical')}</LegendLabel>
        </LegendItem>
        {riskData && (
          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #e5e7eb" }}>
            <LegendLabel style={{ fontWeight: "bold" }}>{t('dashboard.legend.currentRisk')}: {riskData.riskIndex}</LegendLabel>
          </div>
        )}
      </Legend>

      {/* Generate Report Button */}
      <ReportButtonContainer isCoastalActive={showCoastalSubmergence}>
          <Button 
            variant="primary" 
            size="medium" 
            onClick={generateReport}
            onFocus={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.boxShadow = showCoastalSubmergence 
                ? '0px 8px 20px rgba(0, 123, 182, 0.5), 0 0 0 3px rgba(0, 123, 255, 0.3)' 
                : '0px 6px 16px rgba(0, 123, 182, 0.4), 0 0 0 3px rgba(0, 123, 255, 0.3)';
            }}
            onBlur={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.boxShadow = showCoastalSubmergence 
                ? '0px 6px 16px rgba(0, 123, 182, 0.4)' 
                : '0px 4px 12px rgba(0, 123, 182, 0.3)';
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = showCoastalSubmergence ? 'scale(1.08)' : 'scale(1.03)';
              target.style.boxShadow = showCoastalSubmergence 
                ? '0px 8px 20px rgba(0, 123, 182, 0.5)' 
                : '0px 6px 16px rgba(0, 123, 182, 0.4)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = showCoastalSubmergence ? 'scale(1.05)' : 'scale(1)';
              target.style.boxShadow = showCoastalSubmergence 
                ? '0px 6px 16px rgba(0, 123, 182, 0.4)' 
                : '0px 4px 12px rgba(0, 123, 182, 0.3)';
            }}
            style={{
              boxShadow: showCoastalSubmergence 
                ? '0px 6px 16px rgba(0, 123, 182, 0.4)' 
                : '0px 4px 12px rgba(0, 123, 182, 0.3)',
              fontWeight: '600',
              padding: '14px 28px',
              fontSize: '0.95rem',
              borderRadius: '8px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              background: showCoastalSubmergence
                ? 'linear-gradient(135deg, #004085 0%, #002752 100%)'
                : 'linear-gradient(135deg, #0056b3 0%, #003d82 100%)',
              border: 'none',
              transform: showCoastalSubmergence ? 'scale(1.05)' : 'scale(1)',
              color: '#ffffff',
              minHeight: '48px',
              cursor: 'pointer',
              outline: 'none',
              position: 'relative',
            }}
            aria-label={`${t("dashboard.generateReport")} - ${showCoastalSubmergence ? 'Coastal analysis active' : 'Default mode'}`}
            tabIndex={0}
          >
            {t("dashboard.generateReport")}
          </Button>
        </ReportButtonContainer>

      {/* Coastal Submergence Indicator */}
      {showCoastalSubmergence && (
        <CoastalSubmergenceIndicator
          onExpandChange={(isExpanded) => {
            onIndicatorExpandChange?.(isExpanded);
          }}
        />
      )}
    </MapWrapper>
  );
};

export default Map;
