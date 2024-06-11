import React, { useEffect, useState } from 'react';

const InteractiveIaCMArchitecture = () => {
  const [description, setDescription] = useState('Click on a section to see its description.');
  const [activeElement, setActiveElement] = useState(null); // Track the active (clicked) element

  // Define the grouping of elements
  const groupDescriptions = {
    owner_iacm: ['owner_iacm', 'iacm_server', 'iacm_ui', 'postgres', 'mongo', 'monitoring', 'iacm_manager'],
    owner_other_harness: ['owner_other_harness', 'ci_shared_code', 'platform_services', 'platform_gitx', 'platform_pipelines', 'platform_logging', 'policy_as_code', 'delegate_manager'],
    owner_setup_dependent: ['owner_setup_dependent', 'delegate_dlite', 'runner', 'lite_engine', 'infra_cost'],
    owner_customer: ['owner_customer', 'git', 'customer_cloud_infra'],
  };

  const descriptions = {
    "iacm_server": `<strong>IaCM Server:</strong><br />The core server component responsible for orchestrating and managing the overall infrastructure as code operations. It centralizes the configuration management tasks and ensures consistent application of policies across the environment.`,
    "iacm_ui": `<strong>UI:</strong><br />The User Interface of IaCM provides a graphical view and management capabilities for your infrastructure. It allows users to visualize, configure, and monitor their IaCM components efficiently.`,
    "platform_services": `<strong>Platform Services:</strong><br />Essential services including Role-Based Access Control (RBAC), audit trails, and authentication mechanisms that support secure and compliant operation of the IaCM platform.`,
    "monitoring": `<strong>Monitoring:</strong><br />A suite of tools and dashboards that provide visibility into system performance, health metrics, and alerts to ensure the infrastructure operates smoothly and issues are promptly addressed.`,
    "git": `<strong>Git:</strong><br />Integration with version control systems like Git to manage code repositories. It enables versioning, collaboration, and tracking of infrastructure as code changes.`,
    "policy_as_code": `<strong>Policy as Code:</strong><br />A framework for defining and enforcing policies across your infrastructure in a codified manner, ensuring compliance and governance are maintained automatically.`,
    "lite_engine": `<strong>Lite Engine:</strong><br />A lightweight, efficient execution engine that runs tasks within the IaCM environment using the Drone plugin architecture. It is optimized for handling continuous integration and deployment workflows.`,
    "postgres": `<strong>Postgres:</strong><br />A relational database used to store structured data related to configurations, tasks, and metadata in the IaCM platform, ensuring robust and reliable data management.`,
    "mongo": `<strong>Mongo:</strong><br />A NoSQL database for handling unstructured data and providing flexible, scalable storage options for IaCM configurations and runtime data.`,
    "iacm_manager": `<strong>IaCM Manager:</strong><br />The component responsible for orchestrating configuration management activities and executing tasks across the infrastructure, ensuring consistency and compliance.`,
    "delegate_manager": `<strong>Delegate Manager:</strong><br />Handles the configuration and lifecycle management of delegates, which are lightweight agents that perform tasks on behalf of the IaCM platform across various environments.`,
    "step_logs": `<strong>Step Logs:</strong><br />Detailed records of each step executed during a task or workflow in IaCM. These logs are crucial for troubleshooting, auditing, and ensuring transparency in task execution.`,
    "delegate_dlite": `<strong>Delegate/DLite:</strong><br />Executes tasks on delegate servers, which are lightweight instances that handle specific operational tasks, ensuring distributed execution and scalability.`,
    "runner": `<strong>Runner:</strong><br />A component that executes tasks on delegate servers, facilitating distributed processing and efficient task execution across different environments.`,
    "init_logs": `<strong>Init Logs:</strong><br />Logs that capture the initialization processes and steps within the IaCM platform, providing insights into the startup and setup phases of tasks and infrastructure components.`,
    "ci_shared_code": `<strong>CI Shared Code:</strong><br />Common code and libraries used across Continuous Integration and Continuous Deployment (CI/CD) pipelines, promoting reuse and consistency in pipeline execution.`,
    "customer_cloud_infra": `<strong>Customer Cloud Infra:</strong><br />Refers to the cloud infrastructure owned and managed by the customer, which IaCM interacts with for deploying and managing applications and services.`,
    "owner_iacm": `<strong>Owned By IaCM:</strong><br />Infrastructure components that are directly managed and maintained by the IaCM platform, providing centralized control and oversight.`,
    "owner_customer": `<strong>Owned By Customer:</strong><br />Infrastructure elements that are managed by the customer themselves, with IaCM providing tools and integrations to facilitate management and automation.`,
    "owner_setup_dependent": `<strong>Owner Setup Dependent:</strong><br />Infrastructure setup that relies on specific configurations and dependencies, which may involve both IaCM and customer-managed components.`,
    "owner_other_harness": `<strong>Owner Other Harness:</strong><br />Infrastructure managed by other teams within Harness, such as CI, CD, or STO, which may integrate with IaCM for comprehensive management and operational efficiency.`,
    "infra_cost": `<strong>Infrastructure Cost / Cloud Cost Management:</strong><br />Tools and features that provide visibility into the cost of infrastructure resources, helping to optimize spending and manage budgets effectively.`,
    "platform_gitx": `<strong>Platform (Git Experience):</strong><br />Refers to the integration and utilization of Git repositories for storing and managing configurations, enabling version control and collaborative development within the IaCM platform.`,
    "platform_pipelines": `<strong>Platform (Pipelines):</strong><br />Continuous Integration and Continuous Deployment (CI/CD) pipelines that automate the building, testing, and deployment of infrastructure and applications, ensuring consistent and efficient delivery processes.`,
    "platform_logging": `<strong>Platform (Logging Services):</strong><br />Centralized logging services that capture and store log data from various IaCM components and tasks, facilitating monitoring, troubleshooting, and auditing.`,
    "platform_services": `<strong>Platform Services:</strong><br />A collection of core services like RBAC, audit trails, and authentication that support the secure and compliant operation of the IaCM platform, ensuring all activities are controlled and traceable.`
  };

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
          }

          el.style.cursor = 'pointer'; // Set cursor to pointer for both shape and text
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
  }, [activeElement]); // Dependency array includes activeElement to reset properly

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      {/* SVG Object */}
      <object
        id="architecture-svg"
        type="image/svg+xml"
        data="/IaCM_Arch.svg" // Ensure this path is correct
        aria-label="Interactive IaCM Architecture Diagram"
        style={{
          width: '80%',
          height: '750px',
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

export default InteractiveIaCMArchitecture;