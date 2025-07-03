import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import JournalLayout from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startLoadingNotes, startNewNote } from "../../store/journal/thunks";
import { journalSlice, savingNewNote } from "../../store/journal/journalSlice";

const JournalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(startLoadingNotes());
  }, [])
  
  const onClickNewNote = () => {
    dispatch(savingNewNote());
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}
      {
        active 
        ?
        <NoteView />
        :
        <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
          ":disabled": {
            backgroundColor: "grey.400",
            color: "white",
            opacity: 0.7,
            cursor: "not-allowed",
          },
        }}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
