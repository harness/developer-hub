import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const InteractiveIaCMDiagram = ({
  svgPath,
  descriptions,
  groupDescriptions = {},
  initialDescription = 'Click on a node to see its description.',
  startingPoint = null,
  groupOnly = false,  // Add groupOnly prop
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [activeElement, setActiveElement] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [borderColor, setBorderColor] = useState('#ccc'); // Default border color
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); // Visibility of the description box
  const [shouldScroll, setShouldScroll] = useState(false); // Trigger for scrolling into view
  const descriptionRef = useRef(null); // Reference for scrolling into view

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
          if (shapeOrText) {
            shapeOrText.dataset.originalColor = shapeOrText.getAttribute('fill') || '#000';
            shapeOrText.style.fill = darkenColor(shapeOrText.dataset.originalColor);
          }
        });
        el.style.cursor = 'pointer';
      });
    };

    const resetColorEffect = (elements) => {
      elements.forEach((el) => {
        const shapesAndText = el.querySelectorAll('rect, circle, path, ellipse, text');
        shapesAndText.forEach((shapeOrText) => {
          if (shapeOrText) {
            shapeOrText.style.fill = shapeOrText.dataset.originalColor || '';
          }
        });
        el.style.cursor = '';
      });
    };

    const applyFadingEffect = (element) => {
      const shapes = element.querySelectorAll('rect, circle, path, ellipse');
      
      shapes.forEach((shape) => {
        shape.dataset.originalStroke = shape.getAttribute('stroke') || '';
        shape.style.stroke = '#00aae4'; // Apply stroke color for border
        shape.style.strokeWidth = '4px';
      });
    
      let fadeStep = 0;
      const fadeIntervals = [0.5, 0.6, 0.8, 1.0, 0.8, 0.7]; // Define opacity steps for fading
      const intervalTime = 250; // Duration for each fade step in milliseconds
      
      const fadeInOut = () => {
        shapes.forEach((shape) => {
          shape.style.filter = `drop-shadow(0 0 ${10 + fadeStep * 15}px #00aae4)`; // Adjust drop-shadow intensity
        });
        fadeStep = (fadeStep + 1) % fadeIntervals.length; // Cycle through the fade steps
      };
    
      fadeInOut(); // Apply the first step immediately
    
      element.fadingInterval = setInterval(fadeInOut, intervalTime);
    };
    
    const removeFadingEffect = (element) => {
      clearInterval(element.fadingInterval); // Clear the interval to stop the fading
    
      const shapes = element.querySelectorAll('rect, circle, path, ellipse');
      shapes.forEach((shape) => {
        shape.style.stroke = ''; // Remove border
        shape.style.strokeWidth = '';
        shape.style.filter = ''; // Remove drop-shadow
      });
    };

    const handleClick = (svgDoc, elemId) => {
      // Early return if groupOnly is true and the element is not part of a group
      if (groupOnly && !groupDescriptions[elemId]) {
        return;
      }
      if (elemId === startingPoint && !isStarted) {
        setIsStarted(true);
        setIsDescriptionVisible(true); // Show the description box
        
        const allElements = svgDoc.querySelectorAll('.interactive');
        allElements.forEach((el) => {
          el.classList.remove('faded');
          el.style.opacity = '';
        });
        const startingElement = svgDoc.querySelector(`.interactive[id="${startingPoint}"]`);
        if (startingElement) {
          removeFadingEffect(startingElement);
          startingElement.classList.remove('glowing-border');
        }

        // Trigger scrolling to the description box
        setShouldScroll(true);
      }

      if (activeElement) {
        const activeElements = groupDescriptions[activeElement] || [activeElement];
        activeElements.forEach(id => {
          const elementsToStopFading = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
          elementsToStopFading.forEach((el) => {
            removeFadingEffect(el);
          });
        });
      }

      if (activeElement && activeElement !== elemId) {
        const previousElements = groupDescriptions[activeElement] || [activeElement];
        previousElements.forEach(id => {
          const elementsToReset = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
          resetColorEffect(Array.from(elementsToReset));
          elementsToReset.forEach((el) => el.classList.remove('active'));
        });
      }
    
      setActiveElement(elemId);
    
      const newActiveElements = groupDescriptions[elemId] || [elemId];
      newActiveElements.forEach(id => {
        const elementsToDarken = svgDoc.querySelectorAll(`.interactive[id="${id}"]`);
        applyDarkenEffect(Array.from(elementsToDarken));
        elementsToDarken.forEach((el) => el.classList.add('active'));
      });

      // Only set description for the first item in the group if groupOnly is true
      if (groupDescriptions[elemId]) {
        const firstElementId = groupDescriptions[elemId][0];
        const desc = descriptions[firstElementId];
        setDescription(`**${desc.title}**:\n\n${desc.body}`); // Set description for the first element
      } else {
        const desc = descriptions[elemId];
        setDescription(`**${desc.title}**:\n\n${desc.body}` || 'Click on a section to see its description.');
      }

      const newActiveElement = svgDoc.querySelector(`.interactive[id="${elemId}"]`);
      if (newActiveElement) {
        const color = newActiveElement.querySelector('rect, circle, path, ellipse, text')?.getAttribute('fill') || '#ccc';
        setBorderColor(color); // Update border color state
        removeFadingEffect(newActiveElement);
      }
    };

    const handleHover = (svgDoc, elemId, isEntering) => {
      // Similar condition as handleClick to check groupOnly status
      if (groupOnly && !groupDescriptions[elemId]) {
        return; // Early return if the element should not trigger any effect
      }
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

        if (!isStarted) {
          const allElements = svgDoc.querySelectorAll('.interactive');
          allElements.forEach((el) => {
            if (el.id !== startingPoint) {
              el.classList.add('faded');
              el.style.opacity = '0.2';
            }
          });

          const startingElement = svgDoc.querySelector(`.interactive[id="${startingPoint}"]`);
          if (startingElement) {
            console.log("Applying fading effect to starting point:", startingElement);
            applyFadingEffect(startingElement);
            startingElement.classList.add('glowing-border');
          } else {
            console.warn(`Starting point element with id "${startingPoint}" not found.`);
          }
        }

        const interactiveElements = svgDoc.querySelectorAll('.interactive');

        interactiveElements.forEach((elem) => {
          const elemId = elem.id;

          elem.addEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
          elem.addEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
          elem.addEventListener('click', () => handleClick(svgDoc, elemId));

          if (elem.tagName === 'text') {
            elem.parentElement.addEventListener('mouseenter', () => handleHover(svgDoc, elemId, true));
            elem.parentElement.addEventListener('mouseleave', () => handleHover(svgDoc, elemId, false));
            elem.parentElement.addEventListener('click', () => handleClick(svgDoc, elemId));
          }
        });
      });
    }

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
  }, [activeElement, groupDescriptions, descriptions, isStarted, startingPoint, groupOnly]);

  useEffect(() => {
    if (shouldScroll && descriptionRef.current) {
      // Calculate the correct scroll position to bring the description box into view
      const rect = descriptionRef.current.getBoundingClientRect();
      const offset = rect.top + window.pageYOffset - window.innerHeight + rect.height + 20; // Adjusted for the right amount of scroll

      // Perform the scroll
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });

      setShouldScroll(false); // Reset the scroll trigger
    }
  }, [shouldScroll]); // Run this effect when shouldScroll changes

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <object
        id="architecture-svg"
        type="image/svg+xml"
        data={svgPath}
        aria-label="Interactive Diagram"
        style={{ width: '100%', height: '700px', margin: 'auto' }}
      ></object>
      {isDescriptionVisible && (
        <div
          id="description"
          ref={descriptionRef}
          style={{
            marginTop: '20px',
            fontSize: '16px',
            padding: '20px',
            border: `2px solid ${borderColor}`,
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            transition: 'opacity 0.5s',
            opacity: isDescriptionVisible ? 1 : 0,
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}

      <style>
        {`
          .faded {
            opacity: 0.2;
            transition: opacity 0.5s !important;
          }

          /* Styling for the glowing border */
          .glowing-border rect,
          .glowing-border circle,
          .glowing-border path,
          .glowing-border ellipse {
            stroke: #00aae4 !important; /* Harness primary color */
            stroke-width: 5px !important;
            filter: drop-shadow(0 0 10px #00aae4) !important;
          }

          .interactive-hover rect,
          .interactive-hover circle,
          .interactive-hover path,
          .interactive-hover ellipse,
          .interactive-hover text {
            fill: darkgray !important;
          }

          .interactive.active rect,
          .interactive.active circle,
          .interactive.active path,
          .interactive.active ellipse,
          .interactive.active text {
            fill: darkgray !important;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

InteractiveIaCMDiagram.propTypes = {
  svgPath: PropTypes.string.isRequired,
  descriptions: PropTypes.object.isRequired,
  groupDescriptions: PropTypes.object,
  initialDescription: PropTypes.string,
  startingPoint: PropTypes.string,
  groupOnly: PropTypes.bool, 
};

export default InteractiveIaCMDiagram;