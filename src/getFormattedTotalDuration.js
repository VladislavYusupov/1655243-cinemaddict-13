const getFormattedTotalDuration = (totalDuration) => {
  const minutesPerHour = 60;
  const totalHours = Math.floor(totalDuration / minutesPerHour);
  const totalMinutes = totalDuration - totalHours * minutesPerHour;

  return {
    totalHours,
    totalMinutes
  };
};

export default getFormattedTotalDuration;
