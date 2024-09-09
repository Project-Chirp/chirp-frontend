import { Tooltip, Typography } from "@mui/material";
import formatTimestamp from "./formatTimestamp";
import formatToolTipTimestamp from "./formatToolTipTimestamp";

type TooltipTimestampProps = {
  TooltipTimestamp: string;
};

const styles = {
  toolTipText: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
};

const TooltipTimestamp = ({ TooltipTimestamp }: TooltipTimestampProps) => {
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
      title={formatToolTipTimestamp(TooltipTimestamp)}
    >
      <Typography variant="subtitle2" sx={styles.toolTipText}>
        {formatTimestamp(TooltipTimestamp)}
      </Typography>
    </Tooltip>
  );
};

export default TooltipTimestamp;
