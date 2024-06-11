import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const InteractiveIaCMArchitecture = ({ 
  svgPath, 
  descriptions, 
  groupDescriptions, 
  initialDescription 
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [activeElement, setActiveElement] = useState(null); // Track the active (clicked) element

  useEffect(() => {
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

    const applyDarkenEffect = (elements) => {
      elements.forEach((el) => {
        const shapesAndText = el.querySelectorAll('rect, circle, path, ellipse, text');
        shapesAndText.forEach((shapeOrText) => {
          shapeOrText.dataset.originalColor = shapeOrText.getAttribute('fill') || '#000';
          shapeOrText.style.fill = darkenColor(shapeOrText.dataset.originalColor); // Darken color for shapes and text
        });
        el.style.cursor = 'pointer'; // Set cursor to pointer for both shape and text
      });
    };

    const resetColorEffect = (elements) => {
      elements.forEach((el) => {
        const shapesAndText = el.querySelectorAll('rect, circle, path, ellipse, text');
        shapesAndText.forEach((shapeOrText) => {
          shapeOrText.style.fill = shapeOrText.dataset.originalColor || ''; // Reset color for shapes and text
        });
        el.style.cursor = ''; // Reset cursor style to default
      });
    };

    const handleClick = (svgDoc, elemId) => {
      // Reset the previous active element if any
      if (activeElement && activeElement !== elemId) {
        const previousElements = groupDescriptions[activeElement] || [activeElement];
        previousElements.forEach(id => {
          const elementsToReset = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
          resetColorEffect(Array.from(elementsToReset)); // Reset colors
          elementsToReset.forEach((el) => el.classList.remove('active')); // Remove active class from previous element
        });
      }

      // Set the new active element
      setActiveElement(elemId);

      const newActiveElements = groupDescriptions[elemId] || [elemId];
      newActiveElements.forEach(id => {
        const elementsToDarken = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
        applyDarkenEffect(Array.from(elementsToDarken));
        elementsToDarken.forEach((el) => el.classList.add('active')); // Add active class to the new element
      });

      if (groupDescriptions[elemId]) {
        // Combine descriptions for the group
        const combinedDescription = groupDescriptions[elemId].map(id => descriptions[id]).join('<br /><br />');
        setDescription(combinedDescription);
      } else {
        // Show individual element's description
        setDescription(descriptions[elemId] || 'Click on a section to see its description.');
      }
    };

    const handleHover = (svgDoc, elemId, isEntering) => {
      if (groupDescriptions[elemId]) {
        const groupElements = groupDescriptions[elemId].map(id => Array.from(svgDoc.querySelectorAll(`.interactive[id="${id}"]`)));
        groupElements.flat().forEach(el => {
          if (el.id !== activeElement) {
            if (isEntering) {
              applyDarkenEffect([el]);
            } else {
              resetColorEffect([el]);
            }
          }
        });
      } else if (elemId !== activeElement) {
        const elements = svgDoc.querySelectorAll(`.interactive[id="${elemId}"]`);
        if (isEntering) {
          applyDarkenEffect(Array.from(elements));
        } else {
          resetColorEffect(Array.from(elements));
        }
      }
    };

    const svgObject = document.getElementById('architecture-svg');
    if (svgObject) {
      svgObject.addEventListener('load', () => {
        const svgDoc = svgObject.contentDocument;

        // Select all elements with the class "interactive"
        const interactiveElements = svgDoc.querySelectorAll('.interactive');

        interactiveElements.forEach((elem) => {
          const elemId = elem.id;

          elem.addEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
          elem.addEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
          elem.addEventListener('click', () => handleClick(svgDoc, elemId));

          // Ensure text elements also trigger the same events
          if (elem.tagName === 'text') {
            elem.parentElement.addEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
            elem.parentElement.addEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
            elem.parentElement.addEventListener('click', () => handleClick(svgDoc, elemId));
          }
        });
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      if (svgObject) {
        const svgDoc = svgObject.contentDocument;
        if (svgDoc) {
          const interactiveElements = svgDoc.querySelectorAll('.interactive');
          interactiveElements.forEach((elem) => {
            const elemId = elem.id;
            elem.removeEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
            elem.removeEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
            elem.removeEventListener('click', () => handleClick(svgDoc, elemId));
            if (elem.tagName === 'text') {
              elem.parentElement.removeEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
              elem.parentElement.removeEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
              elem.parentElement.removeEventListener('click', () => handleClick(svgDoc, elemId));
            }
          });
        }
      }
    };
  }, [activeElement, groupDescriptions, descriptions]); // Dependency array includes activeElement to reset properly

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      {/* SVG Object */}
      <object
        id="architecture-svg"
        type="image/svg+xml"
        data={svgPath} // Use prop for the SVG path
        aria-label="Interactive IaCM Architecture Diagram"
        style={{
          width: '100%',
          height: '700px',
          margin: 'auto',
        }}
      ></object>

      {/* Description Box */}
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
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Inline styles to be applied dynamically */}
      <style>
        {`
          .interactive-hover rect,
          .interactive-hover circle,
          .interactive-hover path,
          .interactive-hover ellipse,
          .interactive-hover text {
            fill: darkgray !important; /* Example color for the hover state */
          }

          .interactive.active rect,
          .interactive.active circle,
          .interactive.active path,
          .interactive.active ellipse,
          .interactive.active text {
            fill: darkgray !important; /* Example color for the active state */
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

InteractiveIaCMArchitecture.propTypes = {
  svgPath: PropTypes.string.isRequired,
  descriptions: PropTypes.object.isRequired,
  groupDescriptions: PropTypes.object,
  initialDescription: PropTypes.string,
};

InteractiveIaCMArchitecture.defaultProps = {
  groupDescriptions: {},
  initialDescription: 'Click on a node to see its description.',
};

export default InteractiveIaCMArchitecture;
