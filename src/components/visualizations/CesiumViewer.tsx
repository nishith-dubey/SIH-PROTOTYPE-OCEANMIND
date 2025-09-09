import React, { useEffect, useRef } from 'react';
import { Viewer, Entity, Cartesian3, Color, HeightReference } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface CesiumViewerProps {
  floats: any[];
  selectedFloats: string[];
  onFloatSelect: (floatId: string) => void;
  className?: string;
}

export const CesiumViewer: React.FC<CesiumViewerProps> = ({
  floats,
  selectedFloats,
  onFloatSelect,
  className = ""
}) => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer | null>(null);

  useEffect(() => {
    if (cesiumContainer.current && !viewer.current) {
      viewer.current = new Viewer(cesiumContainer.current, {
        terrainProvider: undefined,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: true,
        selectionIndicator: true
      });

      // Set initial view to show global ocean
      viewer.current.camera.setView({
        destination: Cartesian3.fromDegrees(0, 0, 20000000)
      });
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
        viewer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewer.current && floats) {
      // Clear existing entities
      viewer.current.entities.removeAll();

      floats.forEach(float => {
        if (float.last_location?.latitude && float.last_location?.longitude) {
          const isSelected = selectedFloats.includes(float.wmo_id);
          
          const entity = new Entity({
            id: float.wmo_id,
            position: Cartesian3.fromDegrees(
              parseFloat(float.last_location.longitude),
              parseFloat(float.last_location.latitude),
              0
            ),
            point: {
              pixelSize: isSelected ? 12 : 8,
              color: isSelected ? Color.CYAN : Color.YELLOW,
              outlineColor: Color.WHITE,
              outlineWidth: 2,
              heightReference: HeightReference.CLAMP_TO_GROUND
            },
            label: {
              text: float.wmo_id,
              font: '12pt sans-serif',
              fillColor: Color.WHITE,
              outlineColor: Color.BLACK,
              outlineWidth: 2,
              style: 1, // FILL_AND_OUTLINE
              pixelOffset: new Cartesian3(0, -40, 0),
              show: isSelected
            },
            description: `
              <div style="color: black; font-family: sans-serif;">
                <h3>Float ${float.wmo_id}</h3>
                <p><strong>Institution:</strong> ${float.institution}</p>
                <p><strong>Type:</strong> ${float.profiler_type}</p>
                <p><strong>Profiles:</strong> ${float.profiles?.length || 0}</p>
                <p><strong>Last Update:</strong> ${new Date(float.last_update).toLocaleDateString()}</p>
              </div>
            `
          });

          viewer.current!.entities.add(entity);
        }
      });

      // Add click handler
      viewer.current.selectedEntityChanged.addEventListener(() => {
        const selectedEntity = viewer.current!.selectedEntity;
        if (selectedEntity && selectedEntity.id) {
          onFloatSelect(selectedEntity.id as string);
        }
      });
    }
  }, [floats, selectedFloats, onFloatSelect]);

  return (
    <div 
      ref={cesiumContainer} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};