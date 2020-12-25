import dayjs from "dayjs";
import getRandomInteger from "./getRandomInteger";

const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_DAY = 1;

const getRandomDate = (minYear) => {
  const randomYear = getRandomInteger(minYear, dayjs().year());
  const randomMonth = getRandomInteger(MIN_MONTH, MAX_MONTH);
  const randomDay = getRandomInteger(MIN_DAY, dayjs(randomMonth).daysInMonth());

  return dayjs(new Date(randomYear, randomMonth, randomDay));
};

export default getRandomDate;
