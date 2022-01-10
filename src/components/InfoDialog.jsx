import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import localization from 'util/strings';

/**
 * Simple dialog that displays modal text and can then be dismissed.
 */

function InfoDialog({ title, text, open, onClose }) {
  const closeDialog = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: 'pre-line' }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={closeDialog}>
          {localization.dialogClose}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  /** The title of the dialog. */
  title: PropTypes.string.isRequired,
  /** Further information that the dialog conveys to the user. */
  text: PropTypes.string.isRequired,
  /** Determines whether dialog is visible. */
  open: PropTypes.bool.isRequired,
  /** Callback when dialog is closed. */
  onClose: PropTypes.func.isRequired,
};

export default InfoDialog;
