import { Tooltip, Typography, TypographyVariant } from "@mui/material";
import formatTimestamp from "../../utilities/formatTimestamp";
import formatToolTipTimestamp from "../../utilities/formatToolTipTimestamp";

type toolTipTimestampProps = {
  timestamp: string;
  variant?: TypographyVariant;
};

const styles = {
  toolTipText: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
};

const TooltipTimestamp = ({
  timestamp,
  variant = "subtitle2",
}: toolTipTimestampProps) => {
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
      title={formatToolTipTimestamp(timestamp)}
    >
      <Typography variant={variant} sx={styles.toolTipText}>
        {formatTimestamp(timestamp)}
      </Typography>
    </Tooltip>
  );
};

export default TooltipTimestamp;
