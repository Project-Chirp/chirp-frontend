import { Tooltip, Typography } from "@mui/material";
import formatTimestamp from "./formatTimestamp";
import formatToolTipTimestamp from "./formatToolTipTimestamp";

type ToolTipTimestampProps = {
  ToolTipTimestamp: string;
};

const styles = {
  toolTipText: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
const ToolTipTimestamp = ({ ToolTipTimestamp }: ToolTipTimestampProps) => {
  return (
    <Tooltip
      title={formatToolTipTimestamp(ToolTipTimestamp)}
      placement="bottom"
      slotProps={{
        popper: {
          modifiers: [{ name: "offset", options: { offset: [5, -15] } }],
        },
      }}
    >
      <Typography variant="subtitle2" sx={styles.toolTipText}>
        {formatTimestamp(ToolTipTimestamp)}
      </Typography>
    </Tooltip>
  );
};

export default ToolTipTimestamp;
