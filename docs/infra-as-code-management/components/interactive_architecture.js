// infra-as-code-management/components/InteractiveSVG.js

import React, { useEffect, useState } from 'react';

const InteractiveSVG = () => {
  const [description, setDescription] = useState('Click on a section to see its description.');

  useEffect(() => {
    const updateDescription = (nodeId) => {
      const descriptions = {
        "IaCM_Server": "IaCM Server: Central component managing configurations.",
        "UI": "UI: User Interface for managing infrastructure.",
        "Platform_Services": "Platform Services: Services such as RBAC and audit trail.",
        "Monitoring": "Monitoring: Tools for observing system performance.",
        "Git": "Git: Version control system integration.",
        "Policy_as_Code": "Policy as Code: Policies for managing infrastructure as code.",
        "Lite_Engine": "Lite Engine: Executes tasks using Drone plugin.",
        "Postgres": "Postgres: Database for storing configurations.",
        "IaCM_Manager": "IaCM Manager: Manages configurations and executes tasks.",
        // Add more mappings as needed
      };
      setDescription(descriptions[nodeId] || 'Click on a section to see its description.');
    };

    const darkenColor = (color) => {
      let r, g, b;

      if (color.startsWith('rgb')) {
        [r, g, b] = color.match(/\d+/g).map(Number);
      } else if (color.startsWith('#')) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
      }

      r = Math.max(0, Math.floor(r * 0.8));
      g = Math.max(0, Math.floor(g * 0.8));
      b = Math.max(0, Math.floor(b * 0.8));

      return `rgb(${r}, ${g}, ${b})`;
    };

    const svgObject = document.getElementById('architecture-svg');
    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;

      // Select all elements with the class "interactive"
      const interactiveElements = svgDoc.querySelectorAll('.interactive');

      interactiveElements.forEach((elem) => {
        const elemId = elem.id;

        // For shapes and text within the same `g`, assume they share the same id for coordination
        const relatedElements = svgDoc.querySelectorAll(`.interactive[id="${elemId}"]`);

        // Determine the original colors and calculate hover colors for each element
        const originalColors = Array.from(relatedElements).map((el) => {
          const shape = el.querySelector('rect, circle, path, ellipse');
          return shape ? shape.getAttribute('fill') : null;
        });

        const hoverColors = originalColors.map(color => (color ? darkenColor(color) : null));

        const handleMouseEnter = () => {
          relatedElements.forEach((relatedElem, index) => {
            const shape = relatedElem.querySelector('rect, circle, path, ellipse');
            const text = relatedElem.querySelector('text');

            if (shape && hoverColors[index]) {
              shape.style.fill = hoverColors[index]; // Apply hover color to shapes
            }
            if (text && hoverColors[index]) {
              text.style.fill = hoverColors[index]; // Apply hover color to text
            }

            // Set cursor to pointer for both shape and text
            relatedElem.style.cursor = 'pointer';
          });
        };

        const handleMouseLeave = () => {
          relatedElements.forEach((relatedElem, index) => {
            const shape = relatedElem.querySelector('rect, circle, path, ellipse');
            const text = relatedElem.querySelector('text');

            if (shape && originalColors[index]) {
              shape.style.fill = originalColors[index]; // Reset to original color for shapes
            }
            if (text) {
              text.style.fill = ''; // Reset text color
            }

            // Reset cursor style to default
            relatedElem.style.cursor = '';
          });
        };

        // Apply event listeners to the element
        elem.addEventListener('mouseenter', handleMouseEnter);
        elem.addEventListener('mouseleave', handleMouseLeave);
        elem.addEventListener('click', () => updateDescription(elemId));

        // Also apply to parent of text elements to ensure their hover state is covered
        if (elem.tagName === 'text') {
          elem.parentElement.addEventListener('mouseenter', handleMouseEnter);
          elem.parentElement.addEventListener('mouseleave', handleMouseLeave);
          elem.parentElement.addEventListener('click', () => updateDescription(elemId));
        }
      });
    });
  }, []);

  return (
    <div>
      <object
        id="architecture-svg"
        type="image/svg+xml"
        data="/IaCM_Arch.svg" // Ensure this path is correct
        aria-label="Interactive IaCM Architecture Diagram"
        style={{ width: '100%', height: '550px' }}
      ></object>
      <div
        id="description"
        style={{
          marginTop: '20px',
          fontSize: '16px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {description}
      </div>
    </div>
  );
};

export default InteractiveSVG;