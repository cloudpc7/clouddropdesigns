export const STUDIO_NAV_ITEMS = [
  {
    id: 'code-drops',
    label: 'Code Drops',
    path: '/studio/code-drops',
    title: 'Code Drops',
  },
  {
    id: 'drop-and-elevate',
    label: 'Drop & Elevate',
    path: '/studio/drop-and-elevate',
    title: 'Drop & Elevate',
  },
  {
    id: 'get-professional',
    label: 'Get Professional',
    path: '/studio/get-professional',
    title: 'Get Professional',
  },
  {
    id: 'skilled-by-design',
    label: 'Skilled By Design',
    path: '/studio/skilled-by-design',
    title: 'Skilled By Design',
  },
];

export const getStudioNavItemById = (id) =>
  STUDIO_NAV_ITEMS.find((item) => item.id === id) ?? STUDIO_NAV_ITEMS[0];