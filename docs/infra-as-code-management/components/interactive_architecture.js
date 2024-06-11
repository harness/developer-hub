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

    const applyDarkenEffect = (svgDoc, elemId) => {
      const relatedElements = groupDescriptions[elemId] || [elemId];
      relatedElements.forEach(id => {
        const elementsToDarken = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
        elementsToDarken.forEach((el) => {
          const shape = el.querySelector('rect, circle, path, ellipse');
          const text = el.querySelector('text');

          if (shape) {
            shape.dataset.originalColor = shape.getAttribute('fill');
            shape.style.fill = darkenColor(shape.dataset.originalColor); // Darken color for shapes
          }
          if (text) {
            text.dataset.originalColor = text.getAttribute('fill') || '#000';
            text.style.fill = darkenColor(text.dataset.originalColor); // Darken color for text

            el.style.cursor = 'pointer'; // Set cursor to pointer for both shape and text
          }
        });
      });
    };

    const resetColorEffect = (svgDoc, elemId) => {
      const relatedElements = groupDescriptions[elemId] || [elemId];
      relatedElements.forEach(id => {
        const elementsToReset = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
        elementsToReset.forEach((el) => {
          const shape = el.querySelector('rect, circle, path, ellipse');
          const text = el.querySelector('text');

          if (shape) {
            shape.style.fill = shape.dataset.originalColor || ''; // Reset color for shapes
          }
          if (text) {
            text.style.fill = text.dataset.originalColor || ''; // Reset color for text
          }

          el.style.cursor = ''; // Reset cursor style to default
        });
      });
    };

    const handleClick = (svgDoc, elemId) => {
      // Reset the previous active element if any
      if (activeElement) {
        resetColorEffect(svgDoc, activeElement);
        svgDoc.querySelectorAll(`.interactive[id="${activeElement}"]`).forEach(el => {
          el.classList.remove('active'); // Remove active class from previous element
        });
      }

      // Set the new active element
      setActiveElement(elemId);
      applyDarkenEffect(svgDoc, elemId);
      svgDoc.querySelectorAll(`.interactive[id="${elemId}"]`).forEach(el => {
        el.classList.add('active'); // Add active class to the new element
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

    const svgObject = document.getElementById('architecture-svg');
    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;

      // Select all elements with the class "interactive"
      const interactiveElements = svgDoc.querySelectorAll('.interactive');

      interactiveElements.forEach((elem) => {
        const elemId = elem.id;

        // Handle hover and click events for elements and groups
        elem.addEventListener('mouseenter', () => applyDarkenEffect(svgDoc, elemId));
        elem.addEventListener('mouseleave', () => {
          if (elemId !== activeElement) resetColorEffect(svgDoc, elemId); // Only reset if not active
        });
        elem.addEventListener('click', () => handleClick(svgDoc, elemId));

        // Also apply to parent of text elements to ensure their hover state is covered
        if (elem.tagName === 'text') {
          elem.parentElement.addEventListener('mouseenter', () => applyDarkenEffect(svgDoc, elemId));
          elem.parentElement.addEventListener('mouseleave', () => {
            if (elemId !== activeElement) resetColorEffect(svgDoc, elemId);
          });
          elem.parentElement.addEventListener('click', () => handleClick(svgDoc, elemId));
        }
      });
    });
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
