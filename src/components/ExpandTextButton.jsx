import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@mui/material';
import localization from 'util/strings';

/**
 * Card that displays all info related to a photo.
 */

function ExpandTextButton({ readMore, onClickHandler }) {
  return (
    // Use of anchor as button is idiomatic for "Read more/less"
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      component="button"
      color="inherit"
      sx={{ display: 'block', mt: 'var(--spacetagram-text-padding)' }}
      onClick={() => onClickHandler(readMore)}
    >
      {readMore ? localization.readMore : localization.readLess}
    </Link>
  );
}

ExpandTextButton.propTypes = {
  /** Whether button expands or collapses text. */
  readMore: PropTypes.bool.isRequired,
  /** Callback when button is clicked. */
  onClickHandler: PropTypes.func.isRequired,
};

export default ExpandTextButton;
