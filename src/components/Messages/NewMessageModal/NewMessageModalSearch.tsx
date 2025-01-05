import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import SearchBarDropDown from "../../Common/SearchBarDropdown";

const styles = {
  autocomplete: { "&.MuiAutocomplete-input": { paddingLeft: 0 } },
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
  searchIcon: { paddingRight: 0 },
  listBox: {
    maxHeight: "450px",
  },
};

type NewMessageModalSearchProps = {
  onBlur?: () => void;
  onFocus?: () => void;
  onSelect?: () => void;
};

const NewMessageModalSearch = ({
  onBlur,
  onFocus,
  onSelect,
}: NewMessageModalSearchProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();

  return (
    <Box sx={styles.box}>
      <SearchBarDropDown
        listBoxStyle={styles.listBox}
        onBlur={onBlur}
        onFocus={onFocus}
        onSelect={(o) => {
          onSelect?.();
          const path = `/messages/${userId}/${o.userId}`;
          navigate(path);
        }}
      />
    </Box>
  );
};

export default NewMessageModalSearch;
