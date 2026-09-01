export const loadStudioPage = (sectionId) => {
  switch (sectionId) {
    case 'code-drops':
      return import('./CodeDropsPage');
    case 'drop-and-elevate':
      return import('./DropAndElevatePage');
    case 'get-professional':
      return import('./GetProfessionalPage');
    case 'skilled-by-design':
      return import('./SkilledByDesignPage');
    default:
      return Promise.resolve(null);
  }
};