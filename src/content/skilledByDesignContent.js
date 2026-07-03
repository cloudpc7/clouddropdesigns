import iconAndroid from '../assets/skilled-by-design/3c5d54bff099896860a55cb890c8635202086ced.svg';
import iconHackerrank from '../assets/skilled-by-design/2810ac2be86e4d20f03e72196294bead1965ccb9.svg';
import iconFigma from '../assets/skilled-by-design/797a0efb75623fda6f6bed4e037fd13a8219ca17.svg';
import iconApple from '../assets/skilled-by-design/d3800b8e6ab701981792cb002d94f5ba02a5d473.svg';
import iconSquareGit from '../assets/skilled-by-design/36da1c0615bc9ff225b0b27cf7760f636320b640.svg';
import iconGithub from '../assets/skilled-by-design/f974607f747d7a7beef85b0bcf0d23b36168f18b.svg';
import iconGoogle from '../assets/skilled-by-design/8514b71e59f0214443a951c2f56e883a465c7177.svg';
import iconCss from '../assets/skilled-by-design/89b6546ed7aa9837e9fcd028425a6b42e7f9dc61.svg';
import iconSass from '../assets/skilled-by-design/cb660c002a44ac367f1fe200a7e1f6c4bd1c42df.svg';
import iconNode from '../assets/skilled-by-design/d3a8547778d5c8c9596f718ee17418ed72ac1f19.svg';
import iconPython from '../assets/skilled-by-design/b6e6833fa213211f096807f274396dce59f9b6e2.svg';
import iconReact from '../assets/skilled-by-design/e76a895b264429b48428021c888b340bdd541f1f.svg';
import iconJs from '../assets/skilled-by-design/be8661c5e654e9f1d6ffb66ba9319a53733b29be.svg';

export const SKILLED_MANTRA = ['Design', 'Develop', 'Deploy', 'Repeat'];

export const SKILLED_NARRATIVE =
  'This is the stack behind shipped client work — chosen for maintainable interfaces, reliable delivery, and production deployments you can grow with.';

export const SKILLED_PROOF_CTA = {
  label: 'See this stack in production',
  path: '/studio/code-drops',
};

export const SKILLED_TOOL_GROUPS = [
  {
    id: 'stack',
    label: 'Core stack',
    tools: [
      { id: 'javascript', label: 'JavaScript', icon: iconJs },
      { id: 'react', label: 'React', icon: iconReact },
      { id: 'node', label: 'Node.js', icon: iconNode },
      { id: 'python', label: 'Python', icon: iconPython },
    ],
  },
  {
    id: 'interface',
    label: 'Interface craft',
    tools: [
      { id: 'sass', label: 'Sass', icon: iconSass },
      { id: 'css', label: 'CSS', icon: iconCss },
      { id: 'figma', label: 'Figma', icon: iconFigma },
    ],
  },
  {
    id: 'platforms',
    label: 'Ship & deploy',
    tools: [
      { id: 'android', label: 'Android', icon: iconAndroid },
      { id: 'apple', label: 'Apple', icon: iconApple },
      { id: 'firebase', label: 'Firebase', icon: iconGoogle },
      { id: 'git', label: 'Git', icon: iconSquareGit },
      {
        id: 'github',
        label: 'GitHub',
        icon: iconGithub,
        href: 'https://github.com/cloudpc7',
      },
      {
        id: 'hackerrank',
        label: 'HackerRank',
        icon: iconHackerrank,
        href: 'https://www.hackerrank.com/profile/cloud8',
      },
    ],
  },
];