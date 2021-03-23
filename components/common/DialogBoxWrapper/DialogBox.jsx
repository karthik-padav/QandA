import Head from "next/head";
import React from "react";
import _get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Zoom from "@material-ui/core/Zoom";
import Divider from "components/common/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function DialogBox(props) {
  const { isModalOpen = false, onClose = () => {} } = props;
  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {_get(props, "headerTitle") && (
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h1" align="center">
            {props.headerTitle}
          </Typography>
          <Divider mt={1} mb={1.5} />
        </DialogTitle>
      )}
      {_get(props, "body") && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {_get(props, "footer") && <>{props.footer}</>}
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
