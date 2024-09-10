// const CanonocalLoopup = new Map<string, string>([
//   [
//     "/docs/category/get-started-with-code",
//     "https://docusaurus.io/docs/markdown-features/react",
//   ],
// ]);

const CanonocalLookup: { [key: string]: string } = {
  '/docs/category/get-started-with-code':
    'https://docusaurus.io/docs/markdown-features/react',
  '/docs/category/get-started-with-code/':
    'https://docusaurus.io/docs/markdown-features/react',
  '/docs/category/browser-testing/':
    'https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild',
  '/docs/category/browser-testing':
    'https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild',
};

export default CanonocalLookup;
