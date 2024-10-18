const formatTimestamp = (entry: string, isEdited?: boolean) => {
  if (!entry) return "N/A";

  const date = new Date(entry);
  const currentDate = new Date();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const timeDifference = currentDate.getTime() - date.getTime();
  const prefix = "Edited";
  let suffix = "";
  let response = "";
  if (timeDifference < millisecondsInADay) {
    const hourDiff = timeDifference / (60 * 60 * 1000);
    if (hourDiff < 1) {
      const temp = Math.floor(timeDifference / (60 * 1000));
      if (temp === 0) {
        response = "Just Now";
      } else {
        response = `${Math.floor(timeDifference / (60 * 1000))}m`;
        suffix = "ago";
      }
    } else {
      response = `${Math.floor(hourDiff)}h`;
      suffix = "ago";
    }
  } else {
    response = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (isEdited) {
    return prefix + " " + response + " " + suffix;
  }

  return response;
};

export default formatTimestamp;
