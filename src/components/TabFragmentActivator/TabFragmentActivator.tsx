import { useEffect } from 'react';

/**
 * TabFragmentActivator
 * 
 * This component enables direct linking to specific tabs using URL fragments (hashes).
 * 
 * Usage:
 * 1. Import this component in your MDX/Markdown file:
 *    import TabFragmentActivator from '@site/src/components/TabFragmentActivator/TabFragmentActivator';
 * 
 * 2. Add the component to the page you want to enable tab activation:
 *    <TabFragmentActivator />
 * 
 * 3. Ensure your tab elements have unique IDs by adding the attributes prop:
 *    <TabItem value="myTab" label="My Tab" attributes={{id: "myTab"}}>
 * 
 * 4. Link to the tab from another page using the ID as a hash:
 *    [Link to My Tab](/path/to/page#{idProp}).
 */
export default function TabFragmentActivator() {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash);
    
    if (hash) {
      // Remove the leading '#' character
      const tabValue = hash.substring(1);

      // Look for any tab with the matching ID
      const tabTrigger = document.getElementById(tabValue) as HTMLElement;

      if (tabTrigger) {
        // Activate the tab
        tabTrigger.click();
      }
    }
  }, []);

  return null;
}