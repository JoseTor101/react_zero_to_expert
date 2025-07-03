import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Grid,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = (note) => {

  const dispatch = useDispatch();

  const {id, title, body} = note;
  
  const newTitle = useMemo(() => {
    return title.length> 17
    ? title.substring(0,17) + '...'
    : title;
  }, [title]);


  const onSetActiveNote = () =>{
    dispatch(setActiveNote({...note}));
  }
  return (
    <ListItem disablePadding onClick={onSetActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <br />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
 