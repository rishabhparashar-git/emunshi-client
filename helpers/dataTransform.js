export const transformDate = (dateString) => {
  const dateObj = new Date(dateString);
  const dd = dateObj.getDate();
  const mm = dateObj.getMonth() + 1;
  const yyyy = dateObj.getFullYear();
  const hrs = dateObj.getHours();
  const mins = dateObj.getMinutes();
  // const displayDate = `${dd}-${mm}-${yyyy} | ${hrs}:${mins}`;
  const displayDate = `${dd}-${mm}-${yyyy}`;
  return displayDate;
};
