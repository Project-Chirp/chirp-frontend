import { Tooltip, Typography } from "@mui/material";
import formatTimestamp from "./formatTimestamp";
import formatToolTipTimestamp from "./formatToolTipTimestamp";

type ToolTipTimestampProps = {
  ToolTipTimestamp: string;
};

const styles = {
  toolTipText: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
};

const ToolTipTimestamp = ({ ToolTipTimestamp }: ToolTipTimestampProps) => {
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
      title={formatToolTipTimestamp(ToolTipTimestamp)}
    >
      <Typography variant="subtitle2" sx={styles.toolTipText}>
        {formatTimestamp(ToolTipTimestamp)}
      </Typography>
    </Tooltip>
  );
};

export default ToolTipTimestamp;
