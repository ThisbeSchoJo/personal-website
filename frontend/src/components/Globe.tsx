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
  const [theme, setTheme] = useState<string>('light');
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Set dimensions based on size prop
  useEffect(() => {
    const updateDimensions = () => {
      if (size === 'small') {
        setDimensions({ width: 100, height: 100 });
      } else {
        const isMobile = window.innerWidth < 768;
        setDimensions({ 
          width: isMobile ? 400 : 600, 
          height: isMobile ? 400 : 600 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [size]);

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };

    updateTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Get theme-aware color
  const pinColor = theme === 'dark' ? '#c98787' : '#f5c2c2';

  // Locations where the user has lived
  const locations: Location[] = useMemo(() => [
    { lat: 36.9553, lng: -94.7875, label: 'Quapaw, OK', size: 0.12, color: pinColor }, // Quapaw, Oklahoma
    { lat: 40.7128, lng: -74.0060, label: 'New York City, NY', size: 0.15, color: pinColor }, // New York City
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, CA', size: 0.12, color: pinColor }, // Los Angeles
    { lat: 32.7157, lng: -117.1611, label: 'San Diego, CA', size: 0.12, color: pinColor }, // San Diego
    { lat: 38.9072, lng: -77.0369, label: 'Washington, DC', size: 0.12, color: pinColor }, // Washington, DC
  ], [pinColor]);

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
        pointResolution={8}
        pointAltitude={0.01}
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

