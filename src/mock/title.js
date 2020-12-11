import getArrayRandomElement from "../helpers/getArrayRandomElement";

const TITLES = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`,
];

const generateTitle = () => getArrayRandomElement(TITLES);

export default generateTitle;
