const getDay = (date: Date | number, dateOffset: number = 0) => {
  let clonedDate = new Date(date);

  clonedDate.setDate(clonedDate.getDate() + dateOffset);
  return clonedDate;
};

export const getWeek = (date: number, dateOffset: number = 0) => {
  const newDate = getDay(date, dateOffset);

  const day = newDate.getDay();

  return {
    date,
    start: getDay(newDate, -day).getTime(),
    end: getDay(newDate, 6 - day).getTime(),
  };
};
