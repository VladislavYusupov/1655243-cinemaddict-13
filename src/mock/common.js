import { getRandomInteger } from "../helpers/mockGenerateHelper";

export const generateTitle = () => {
  const titles = [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};
