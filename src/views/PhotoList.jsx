import React, { useState, useEffect } from 'react';
import {
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Stack,
  Pagination,
} from '@mui/material';
import InfoIconOutlined from '@mui/icons-material/InfoOutlined';
import getPhotosService from 'services/getPhotos.service';
import PhotoCard from 'components/PhotoCard';
import InfoDialog from 'components/InfoDialog';
import Loading from 'components/Loading';
import localization from 'util/strings';

/**
 * Composite component that houses scrolling photo view.
 */

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [pageParams, setPageParams] = useState({ page: 1, pageLength: 5 });
  const [aboutDialogVisible, setAboutDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const showAboutDialog = () => {
    setAboutDialogVisible(true);
  };

  const hideAboutDialog = () => {
    setAboutDialogVisible(false);
  };

  const showErrorDialog = () => {
    setErrorDialogVisible(true);
  };

  const hideErrorDialog = () => {
    setErrorDialogVisible(false);
  };

  const fetchPhotos = async () => {
    try {
      const resp = await getPhotosService(
        pageParams.page,
        pageParams.pageLength
      );
      setPhotos(resp.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (error) {
      showErrorDialog();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    fetchPhotos();
  }, [pageParams]);

  const handlePageChange = async (event, value) => {
    if (pageParams.page === value) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    setPhotos([]);
    setPageParams((prevState) => ({
      ...prevState,
      page: value,
    }));
  };

  const handlePageLengthChange = (event) => {
    setPageParams({ page: 1, pageLength: event.target.value });
  };

  return (
    <div className="pageContents">
      <div className="listHeader">
        <Typography variant="h6" flexGrow={1}>
          {localization.heading}
          <IconButton
            onClick={showAboutDialog}
            aria-label={localization.ariaLabels.aboutButton}
          >
            <InfoIconOutlined />
          </IconButton>
        </Typography>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
          }}
        >
          <Select
            value={pageParams.pageLength}
            onChange={handlePageLengthChange}
            inputProps={{ 'aria-label': 'photos per page' }}
            variant="standard"
          >
            <MenuItem value={1}>{`1 ${localization.itemsPerPage}`}</MenuItem>
            <MenuItem value={5}>{`5 ${localization.itemsPerPage}`}</MenuItem>
            <MenuItem value={10}>{`10 ${localization.itemsPerPage}`}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="photoList">
        {photos.length ? (
          photos.map((photo) => (
            <PhotoCard
              key={photo.date}
              date={photo.date}
              title={photo.title}
              explanation={photo.explanation}
              copyright={photo.copyright}
              url={photo.url}
              hdurl={photo.hdurl}
              mediaType={photo.media_type}
            />
          ))
        ) : (
          <Loading numPerPage={pageParams.pageLength} />
        )}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={99}
          color="primary"
          page={pageParams.page}
          onChange={handlePageChange}
          sx={{ alignSelf: 'center' }}
        />
      </Stack>
      <InfoDialog
        title={localization.aboutDialogTitle}
        text={localization.aboutDialogText}
        open={aboutDialogVisible}
        onClose={hideAboutDialog}
      />
      <InfoDialog
        title={localization.errorDialogTitle}
        text={localization.errorDialogText}
        open={errorDialogVisible}
        onClose={hideErrorDialog}
      />
    </div>
  );
}

export default PhotoList;
