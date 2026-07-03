import iconAndroid from '../assets/skilled-by-design/3c5d54bff099896860a55cb890c8635202086ced.svg';
import iconLeetcode from '../assets/skilled-by-design/0aa9e63b097f9b037eb45d783e01ee2b482a3fce.svg';
import iconHackerrank from '../assets/skilled-by-design/2810ac2be86e4d20f03e72196294bead1965ccb9.svg';
import iconSquarespace from '../assets/skilled-by-design/615e4d5b50b2f921bcdc650de44c7e7a8e829ffc.svg';
import iconFigma from '../assets/skilled-by-design/797a0efb75623fda6f6bed4e037fd13a8219ca17.svg';
import iconApple from '../assets/skilled-by-design/d3800b8e6ab701981792cb002d94f5ba02a5d473.svg';
import iconWindows from '../assets/skilled-by-design/e63fa5c78dbf4b86a7fd6fa00f57c7425203ac08.svg';
import iconSquareGit from '../assets/skilled-by-design/36da1c0615bc9ff225b0b27cf7760f636320b640.svg';
import iconGithub from '../assets/skilled-by-design/f974607f747d7a7beef85b0bcf0d23b36168f18b.svg';
import iconGoogle from '../assets/skilled-by-design/8514b71e59f0214443a951c2f56e883a465c7177.svg';
import iconCss from '../assets/skilled-by-design/89b6546ed7aa9837e9fcd028425a6b42e7f9dc61.svg';
import iconSass from '../assets/skilled-by-design/cb660c002a44ac367f1fe200a7e1f6c4bd1c42df.svg';
import iconNpm from '../assets/skilled-by-design/9c9c90ff4005cdbc53ec484cd06c768fd4f4efae.svg';
import iconNode from '../assets/skilled-by-design/d3a8547778d5c8c9596f718ee17418ed72ac1f19.svg';
import iconPython from '../assets/skilled-by-design/b6e6833fa213211f096807f274396dce59f9b6e2.svg';
import iconReact from '../assets/skilled-by-design/e76a895b264429b48428021c888b340bdd541f1f.svg';
import iconJs from '../assets/skilled-by-design/be8661c5e654e9f1d6ffb66ba9319a53733b29be.svg';
import iconFreeCodeCamp from '../assets/skilled-by-design/44a8e6ece1880c42579fd6a0c663d666ec7806ac.svg';
import iconStackOverflow from '../assets/skilled-by-design/f3f7b193810d890d19fa9dab07f3d3342736034a.svg';

export const SKILLED_MANTRA = ['Design', 'Develop', 'Deploy', 'Repeat'];

export const SKILLED_TOOL_GROUPS = [
  {
    id: 'stack',
    label: 'Core stack',
    tools: [
      { id: 'javascript', label: 'JavaScript', icon: iconJs },
      { id: 'react', label: 'React', icon: iconReact },
      { id: 'python', label: 'Python', icon: iconPython },
      { id: 'node', label: 'Node.js', icon: iconNode },
      { id: 'npm', label: 'npm', icon: iconNpm },
    ],
  },
  {
    id: 'interface',
    label: 'Interface craft',
    tools: [
      { id: 'sass', label: 'Sass', icon: iconSass },
      { id: 'css', label: 'CSS', icon: iconCss },
      { id: 'figma', label: 'Figma', icon: iconFigma },
      { id: 'squarespace', label: 'Squarespace', icon: iconSquarespace },
    ],
  },
  {
    id: 'platforms',
    label: 'Platforms',
    tools: [
      { id: 'android', label: 'Android', icon: iconAndroid },
      { id: 'apple', label: 'Apple', icon: iconApple },
      { id: 'windows', label: 'Windows', icon: iconWindows },
      { id: 'google', label: 'Google Cloud', icon: iconGoogle },
      { id: 'github', label: 'GitHub', icon: iconGithub },
      { id: 'git', label: 'Git', icon: iconSquareGit },
    ],
  },
  {
    id: 'growth',
    label: 'Continuous craft',
    tools: [
      { id: 'hackerrank', label: 'HackerRank', icon: iconHackerrank },
      { id: 'leetcode', label: 'LeetCode', icon: iconLeetcode },
      { id: 'stackoverflow', label: 'Stack Overflow', icon: iconStackOverflow },
      { id: 'freecodecamp', label: 'freeCodeCamp', icon: iconFreeCodeCamp },
    ],
  },
];