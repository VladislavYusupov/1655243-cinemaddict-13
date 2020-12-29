import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import getRandomInteger from "./getRandomInteger";

dayjs.extend(objectSupport);

const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_DAY = 1;

const getRandomDate = (minYear) => {
  const randomYear = getRandomInteger(minYear, dayjs().year());
  const randomMonth = getRandomInteger(MIN_MONTH, MAX_MONTH);
  const randomDay = getRandomInteger(MIN_DAY, dayjs({year: randomYear, month: randomMonth, MIN_DAY}).daysInMonth());

  return dayjs({year: randomYear, month: randomMonth, day: randomDay});
};

export default getRandomDate;
