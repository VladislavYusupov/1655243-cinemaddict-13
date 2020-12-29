import objectSupport from "dayjs/plugin/objectSupport";
import dayjs from "dayjs";
import {FILM_RUNTIME_FORMAT} from "./const";

dayjs.extend(objectSupport);

const getFormattedFilmRuntime = (runtime) => {
  return dayjs({minute: runtime}).format(FILM_RUNTIME_FORMAT);
};

export default getFormattedFilmRuntime;
