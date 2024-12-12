import { Tooltip, Typography, TypographyVariant } from "@mui/material";
import formatTimestamp from "../../utilities/formatTimestamp";
import formatTooltipTimestamp from "../../utilities/formatTooltipTimestamp";

type TooltipTimestampProps = {
  timestamp: string;
  variant?: TypographyVariant;
  isEdited?: boolean;
};

const styles = {
  tooltipText: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
};

const TooltipTimestamp = ({
  timestamp,
  variant = "subtitle2",
  isEdited,
}: TooltipTimestampProps) => {
  return (
    <Tooltip
      arrow
      disableInteractive
      placement="bottom"
      slotProps={{
        popper: {
          modifiers: [{ name: "offset", options: { offset: [0, -5] } }],
        },
      }}
      title={formatTooltipTimestamp(timestamp)}
    >
      <Typography sx={styles.tooltipText} variant={variant}>
        {formatTimestamp(timestamp, isEdited)}
      </Typography>
    </Tooltip>
  );
};

export default TooltipTimestamp;
