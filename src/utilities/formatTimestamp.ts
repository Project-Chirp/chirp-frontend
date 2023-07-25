const formatTimestamp = (entry: string) => {
  const date = new Date(entry);
  const currentDate = new Date();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const timeDifference = currentDate.getTime() - date.getTime();
  if (timeDifference < millisecondsInADay) {
    const hourDiff = timeDifference / (60 * 60 * 1000);
    if (hourDiff < 1) {
      const temp = Math.floor(timeDifference / (60 * 1000));
      if (temp === 0) {
        return "Just now";
      } else {
        return `${Math.floor(timeDifference / (60 * 1000))}m`;
      }
    } else {
      return `${Math.floor(hourDiff)}h`;
    }
  } else {
    const modifiedDateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return modifiedDateString;
  }
};

export default formatTimestamp;
