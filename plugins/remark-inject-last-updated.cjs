// Injects <LastUpdatedTop /> as the first child in every MDX doc.
module.exports = function remarkInjectLastUpdated() {
    return (tree) => {
      // Avoid double-inject during fast refresh by checking first node.
      const first = tree.children?.[0];
      const alreadyInjected =
        first &&
        (first.type === 'mdxJsxFlowElement' || first.type === 'mdxJsxTextElement') &&
        first.name === 'LastUpdatedTop';
  
      if (!alreadyInjected) {
        tree.children.unshift({
          type: 'mdxJsxFlowElement',
          name: 'LastUpdatedTop',
          attributes: [],
          children: [],
        });
      }
    };
  };