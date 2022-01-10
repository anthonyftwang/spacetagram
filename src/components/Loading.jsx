import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';

/**
 * Helper component to create silhouttes of photo cards.
 */

function CardSkeleton({ height, width, spacing }) {
  return (
    <Skeleton
      variant="rectangle"
      height={height}
      width={width}
      sx={{
        mb: spacing,
        borderRadius: '4px',
        animation: 'animation-c7515d 1s ease-in-out 0.5s infinite',
      }}
    />
  );
}

CardSkeleton.propTypes = {
  /** CSS height of the silhouette. */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** CSS width of the silhouette. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** CSS margin to apply below each silhouette. */
  spacing: PropTypes.string,
};

CardSkeleton.defaultProps = {
  height: '1.2em',
  width: '100%',
  spacing: 'var(--spacetagram-main-padding)',
};

/**
 * Silhouette placeholder UI to display
 * while data is being fetched from the server.
 */

function Loading({ numPerPage }) {
  return (
    <div
      className="loadingPlaceholder"
      role="status"
      aria-label="photo list loading"
    >
      {[...Array(numPerPage).keys()].map(() => (
        <>
          <CardSkeleton
            height={400}
            width="100%"
            spacing="var(--spacetagram-text-padding)"
          />
          <CardSkeleton
            height={15}
            width="15%"
            spacing="var(--spacetagram-text-padding)"
          />
          <CardSkeleton
            height={35}
            width="90%"
            spacing="var(--spacetagram-text-padding)"
          />
          <CardSkeleton
            height={15}
            width="100%"
            spacing="var(--spacetagram-text-padding)"
          />
          <CardSkeleton
            height={15}
            width="95%"
            spacing="var(--spacetagram-text-padding)"
          />
          <CardSkeleton
            height={15}
            width="15%"
            spacing="var(--spacetagram-main-padding)"
          />
          <CardSkeleton
            height={50}
            width="20%"
            spacing="var(--spacetagram-large-padding)"
          />
        </>
      ))}
    </div>
  );
}

Loading.propTypes = {
  /** The number of photos cards displayed per page. */
  numPerPage: PropTypes.number.isRequired,
};

export default Loading;
