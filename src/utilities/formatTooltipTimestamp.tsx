const formatTooltipTimestamp = (entry: string) => {
  const date = new Date(entry);

  // Full timestamp for the tooltip (e.g., "8:59PM, Sep 4, 2024")
  const tooltipTimestamp =
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }) +
    ", " +
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return tooltipTimestamp;
};

export default formatTooltipTimestamp;
