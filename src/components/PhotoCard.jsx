import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import moment from 'moment';
import {
  IconButton,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Typography,
} from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandTextButton from 'components/ExpandTextButton';
import useStateWithLocalStorage from 'hooks/useStateWithLocalStorage';
import localization from 'util/strings';

/**
 * Card that displays all info related to a photo.
 */

function PhotoCard({
  date,
  title,
  explanation,
  copyright,
  url,
  hdurl,
  mediaType,
}) {
  const [showAll, setShowAll] = useState(false);
  const [liked, setLiked] = useStateWithLocalStorage(date);

  const truncate = (text, fuzzyCharLength) => {
    if (text.length <= fuzzyCharLength) {
      return text;
    }
    const strict = text.substr(0, fuzzyCharLength - 1);
    return (
      <>
        {strict.substr(0, strict.lastIndexOf(' '))}
        &hellip;
      </>
    );
  };

  const openInHD = () => {
    window.open(hdurl, '_blank');
  };

  return (
    <Card sx={{ minWidth: 275, mb: 'var(--spacetagram-main-padding)' }}>
      {mediaType === 'image' ? (
        <CardMedia
          component="img"
          image={url}
          alt={`${localization.imgAltTemplate} ${moment(date).format(
            'MMM D, YYYY'
          )}`}
        />
      ) : (
        <CardMedia
          component="iframe"
          src={url}
          role="application"
          title={`${localization.imgAltTemplate} ${moment(date).format(
            'MMM D, YYYY'
          )}`}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          color="text.secondary"
          component="div"
        >
          {` ${moment(date).format('MMM D, YYYY')}`}
        </Typography>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {showAll ? (
            <>
              {explanation}
              <ExpandTextButton readMore={false} onClickHandler={setShowAll} />
            </>
          ) : (
            <>
              {truncate(explanation, 150)}
              <ExpandTextButton readMore onClickHandler={setShowAll} />
            </>
          )}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 'var(--spacetagram-main-padding)' }}
        >
          {copyright && (
            <Chip
              icon={<CopyrightIcon />}
              label={copyright}
              variant="outlined"
            />
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => setLiked(!liked)}
            size="large"
            aria-label={
              liked
                ? localization.ariaLabels.unlikePhoto
                : localization.ariaLabels.likePhoto
            }
          >
            {liked ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            onClick={openInHD}
            size="large"
            disabled={!hdurl}
            aria-label={localization.ariaLabels.openInHD}
          >
            <OpenInNewIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

PhotoCard.propTypes = {
  /** The unique date corresponding to the photo. */
  date: PropTypes.string.isRequired,
  /** The title of the photo. */
  title: PropTypes.string.isRequired,
  /** The written explanation accompanying the photo. */
  explanation: PropTypes.string.isRequired,
  /** The owner(s) of the copyrights to the media. */
  copyright: PropTypes.string,
  /** The url of the photo or video source. */
  url: PropTypes.string.isRequired,
  /** The location of the full-resolution source media. */
  hdurl: requiredIf(PropTypes.string, (props) => props.mediaType === 'image'),
  /** The type of media to be displayed. */
  mediaType: PropTypes.oneOf(['image', 'video']).isRequired,
};

PhotoCard.defaultProps = {
  copyright: '',
  hdurl: '',
};

export default PhotoCard;
