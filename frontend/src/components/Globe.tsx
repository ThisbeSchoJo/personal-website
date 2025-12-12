import React, { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import './Globe.css';

interface Location {
  lat: number;
  lng: number;
  label: string;
  size: number;
  color: string;
}

interface GlobeComponentProps {
  size?: 'small' | 'large';
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ size = 'large' }) => {
  const globeEl = useRef<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Set dimensions based on size prop
  useEffect(() => {
    const updateDimensions = () => {
      if (size === 'small') {
        setDimensions({ width: 100, height: 100 });
      } else {
        // Full viewport dimensions minus header (no hero-section on globe page)
        const isMobile = window.innerWidth < 768;
        const headerHeight = isMobile ? 50 : 60;
        const width = window.innerWidth;
        const height = window.innerHeight - headerHeight;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);


  // Bright red color for pins (places lived)
  const pinColor = '#ff0000';
  // Cyan blue color for visited places
  const visitedColor = '#00CED1';

  // Locations where the user has lived - bigger red pins
  const livedLocations: Location[] = useMemo(() => [
    { lat: 36.9553, lng: -94.7875, label: 'Quapaw, OK', size: 0.3, color: pinColor }, // Quapaw, Oklahoma
    { lat: 40.7128, lng: -74.0060, label: 'New York City, NY', size: 0.35, color: pinColor }, // New York City
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, CA', size: 0.3, color: pinColor }, // Los Angeles
    { lat: 32.7157, lng: -117.1611, label: 'San Diego, CA', size: 0.3, color: pinColor }, // San Diego
    { lat: 38.9072, lng: -77.0369, label: 'Washington, DC', size: 0.3, color: pinColor }, // Washington, DC
    { lat: 39.7392, lng: -104.9903, label: 'Denver, CO', size: 0.3, color: pinColor }, // Denver, Colorado
    { lat: 51.5074, lng: -0.1278, label: 'London, England', size: 0.3, color: pinColor }, // London, England
    { lat: 36.3729, lng: -94.2088, label: 'Bentonville, AR', size: 0.3, color: pinColor }, // Bentonville, Arkansas
    { lat: 32.7767, lng: -96.7970, label: 'Dallas, TX', size: 0.3, color: pinColor }, // Dallas, Texas
    { lat: 38.9517, lng: -92.3341, label: 'Columbia, MO', size: 0.3, color: pinColor }, // Columbia, Missouri
    { lat: 36.0999, lng: -80.2442, label: 'Winston-Salem, NC', size: 0.3, color: pinColor }, // Winston-Salem, North Carolina
  ], [pinColor]);

  // Locations visited - cyan dots (same size as red dots)
  const visitedLocations: Location[] = useMemo(() => [
    { lat: 52.5200, lng: 13.4050, label: 'Berlin, Germany', size: 0.3, color: visitedColor },
    { lat: 31.6295, lng: -7.9811, label: 'Marrakesh, Morocco', size: 0.3, color: visitedColor },
    { lat: 52.3676, lng: 4.9041, label: 'Amsterdam, Netherlands', size: 0.3, color: visitedColor },
    { lat: 52.0907, lng: 5.1214, label: 'Utrecht, Netherlands', size: 0.3, color: visitedColor },
    { lat: 54.5973, lng: -5.9301, label: 'Northern Ireland', size: 0.3, color: visitedColor }, // Belfast
    { lat: 56.4907, lng: -4.2026, label: 'Scotland', size: 0.3, color: visitedColor }, // Central Scotland
    { lat: 50.5039, lng: 4.4699, label: 'Belgium', size: 0.3, color: visitedColor }, // Brussels
    { lat: 41.9028, lng: 12.4964, label: 'Italy', size: 0.3, color: visitedColor }, // Rome
    { lat: 40.4168, lng: -3.7038, label: 'Spain', size: 0.3, color: visitedColor }, // Madrid
    { lat: 38.7223, lng: -9.1393, label: 'Portugal', size: 0.3, color: visitedColor }, // Lisbon
    { lat: 48.2082, lng: 16.3738, label: 'Austria', size: 0.3, color: visitedColor }, // Vienna
    { lat: 18.1096, lng: -77.2975, label: 'Jamaica', size: 0.3, color: visitedColor }, // Kingston
    { lat: 27.8406, lng: -114.1314, label: 'Baja California, Mexico', size: 0.3, color: visitedColor }, // Central Baja
    { lat: 22.8905, lng: -109.9167, label: 'Cabo, Mexico', size: 0.3, color: visitedColor }, // Cabo San Lucas
    { lat: 18.4861, lng: -69.9312, label: 'Dominican Republic', size: 0.3, color: visitedColor }, // Santo Domingo
    { lat: 9.7489, lng: -83.7534, label: 'Costa Rica', size: 0.3, color: visitedColor }, // San Jose
    { lat: 14.5586, lng: -90.7333, label: 'Antigua, Guatemala', size: 0.3, color: visitedColor },
    { lat: 12.1364, lng: -86.2514, label: 'Nicaragua', size: 0.3, color: visitedColor }, // Managua
    { lat: 62.3239, lng: -150.1097, label: 'Talkeetna, Alaska', size: 0.3, color: visitedColor },
  ], [visitedColor]);

  // Combine all locations
  const locations = useMemo(() => [...livedLocations, ...visitedLocations], [livedLocations, visitedLocations]);

  useEffect(() => {
    if (!globeEl.current) return;

    const globe = globeEl.current;
    const controls = globe.controls();
    
    if (controls) {
      controls.autoRotate = !isHovered;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={`globe-container ${size === 'small' ? 'globe-small' : 'globe-large'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointLabel="label"
        pointRadius="size"
        pointColor="color"
        pointResolution={12}
        pointAltitude={0.02}
        enablePointerInteraction={true}
        onPointHover={(point: any) => {
          if (point) {
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'default';
          }
        }}
        onPointClick={(point: any) => {
          if (point && globeEl.current) {
            // Focus on the clicked point
            globeEl.current.pointOfView(
              { lat: point.lat, lng: point.lng, altitude: 2 },
              1000
            );
          }
        }}
        showAtmosphere={true}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.15}
        width={dimensions.width}
        height={dimensions.height}
        onGlobeReady={() => {
          // Initialize auto-rotation when globe is ready
          if (globeEl.current) {
            const controls = globeEl.current.controls();
            if (controls) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.5;
              controls.enableZoom = false;
              controls.enablePan = false;
              controls.enableDamping = true;
              controls.dampingFactor = 0.1;
            }
          }
        }}
      />
    </div>
  );
};

export default GlobeComponent;

