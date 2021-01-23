const getFormattedTotalDuration = (totalDuration) => {
  const MINUTES_PER_HOUR = 60;
  const totalHours = Math.floor(totalDuration / MINUTES_PER_HOUR);
  const totalMinutes = totalDuration - totalHours * MINUTES_PER_HOUR;

  return {
    totalHours,
    totalMinutes
  };
};

export default getFormattedTotalDuration;
