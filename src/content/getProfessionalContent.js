import portraitPhoto from '../assets/selfie.webp';
import iconGithub from '../assets/skilled-by-design/f974607f747d7a7beef85b0bcf0d23b36168f18b.svg';
import iconHackerrank from '../assets/skilled-by-design/2810ac2be86e4d20f03e72196294bead1965ccb9.svg';
import iconInstagram from '../assets/get-professional/instagram.svg';
import iconLinkedin from '../assets/get-professional/linkedin.svg';
import iconX from '../assets/get-professional/x.svg';

export const GET_PROFESSIONAL_EXPERTISE = [
  {
    id: 'web',
    label: 'Custom web applications',
    detail: 'React-based products with thoughtful UX, performance, and maintainable architecture.',
  },
  {
    id: 'mobile',
    label: 'Mobile products',
    detail: 'Cross-platform builds from concept through store-ready deployment.',
  },
  {
    id: 'delivery',
    label: 'End-to-end delivery',
    detail: 'Design, development, and launch — scoped clearly from first conversation through delivery.',
  },
];

export const GET_PROFESSIONAL_WORKING_PRINCIPLES = [
  'Understand the business problem before writing the first line of code.',
  'Ship polished, scalable work — not prototypes that become permanent.',
  'Stay accessible from first conversation through launch and beyond.',
];

export const PROJECT_INQUIRY_TYPES = [
  { value: '', label: 'Select project type' },
  { value: 'web', label: 'Web application' },
  { value: 'mobile', label: 'Mobile application' },
  { value: 'both', label: 'Web and mobile' },
  { value: 'unsure', label: 'Not sure yet' },
];

export const PROJECT_INQUIRY_TIMELINES = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3', label: '1–3 months' },
  { value: '3-6', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible / exploring' },
];

export const PROJECT_INQUIRY_BUDGETS = [
  { value: '', label: 'Budget range (optional)' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5-15k', label: '$5,000 – $15,000' },
  { value: '15-30k', label: '$15,000 – $30,000' },
  { value: '30k-plus', label: '$30,000+' },
  { value: 'discuss', label: 'Prefer to discuss' },
];

export const GET_PROFESSIONAL_PROFILE = {
  name: 'Paul Cloud',
  title: 'Developer',
  experience: '10+ years experience in information technology',
  bio: 'I start by understanding how you want your business to show up — then I design and build web and mobile experiences that reflect your vision, not a generic template. With 10+ years in information technology, I\'ve shipped live portfolio work including VibeNMED and business-facing sites such as Hemet Valley Tools and Sonora Tires Inc, taking ideas from concept to production-ready launch. You work directly with me from first conversation through delivery, and I bring the same standards to every client project.',
  mobileBio:
    'I\'m Paul, the founder and developer at CloudDropDesigns, specializing in custom web and mobile solutions. Delivering scalable web and mobile solutions for businesses.',
  photo: portraitPhoto,
  photoAlt: 'Paul Cloud, founder and developer at CloudDropDesigns',
};

export const GET_PROFESSIONAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'cloudpc7',
    href: 'https://github.com/cloudpc7',
    icon: iconGithub,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Paul Cloud',
    href: 'https://www.linkedin.com/in/paul-cloud-760358338',
    icon: iconLinkedin,
  },
  {
    id: 'hackerrank',
    label: 'HackerRank',
    handle: '@cloud8',
    href: 'https://www.hackerrank.com/profile/cloud8',
    icon: iconHackerrank,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@dropingcode',
    href: 'https://www.instagram.com/dropingcode',
    icon: iconInstagram,
  },
  {
    id: 'x',
    label: 'X',
    handle: '@Paul211391',
    href: 'https://x.com/Paul211391',
    icon: iconX,
  },
];