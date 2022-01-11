import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoCard from 'components/PhotoCard';
import localization from 'util/strings';

const examples = {
  copyright: 'NASA JWST',
  date: '2021-12-26',
  explanation: "There's a big new telescope in space.",
  hdurl:
    'https://apod.nasa.gov/apod/image/2112/JwstLaunch_Arianespace_1920.jpg',
  mediaTypeImage: 'image',
  mediaTypeVideo: 'video',
  title: 'James Webb Space Telescope over Earth',
  url: 'https://apod.nasa.gov/apod/image/2112/JwstLaunch_Arianespace_1080.jpg',
  vidurl: 'https://www.youtube.com/embed/v6ihVeEoUdo',
};

it('renders photo card with image', () => {
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={examples.explanation}
      url={examples.url}
      hdurl={examples.hdurl}
      mediaType={examples.mediaTypeImage}
    />
  );
  const photo = screen.getByRole('img');
  expect(photo).toHaveAttribute('src', examples.url);
  expect(photo).toHaveAttribute(
    'alt',
    `${localization.imgAltTemplate} Dec 26, 2021`
  );
  expect(screen.getByText('Dec 26, 2021')).toBeVisible();
  expect(screen.getByRole('heading')).toHaveTextContent(examples.title);
  expect(screen.queryByText(examples.copyright)).not.toBeInTheDocument();
  const likeButton = screen.getByRole('button', {
    name: localization.ariaLabels.likePhoto,
  });
  expect(likeButton).toBeVisible();
  expect(likeButton).toBeEnabled();
  const openButton = screen.getByRole('button', {
    name: localization.ariaLabels.openInHD,
  });
  expect(openButton).toBeVisible();
  expect(openButton).toBeEnabled();
});

it('renders photo card with copyright tag', () => {
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={examples.explanation}
      url={examples.url}
      hdurl={examples.hdurl}
      mediaType={examples.mediaTypeImage}
      copyright={examples.copyright}
    />
  );
  expect(screen.getByText(examples.copyright)).toBeVisible();
});

it('renders photo card with video', () => {
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={examples.explanation}
      url={examples.vidurl}
      mediaType={examples.mediaTypeVideo}
    />
  );
  const video = screen.getByRole('application');
  expect(video).toHaveAttribute('src', examples.vidurl);
  expect(video).toHaveAttribute(
    'title',
    `${localization.imgAltTemplate} Dec 26, 2021`
  );
  expect(screen.getByText('Dec 26, 2021')).toBeVisible();
  expect(screen.getByRole('heading')).toHaveTextContent(examples.title);
  expect(screen.queryByText(examples.copyright)).not.toBeInTheDocument();
  const likeButton = screen.getByRole('button', {
    name: localization.ariaLabels.likePhoto,
  });
  expect(likeButton).toBeVisible();
  expect(likeButton).toBeEnabled();
  const openButton = screen.getByRole('button', {
    name: localization.ariaLabels.openInHD,
  });
  expect(openButton).toBeVisible();
  expect(openButton).toBeDisabled();
});

it('renders photo card with collapsible explanation text', () => {
  const longText = 'hello world '.repeat(20);
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={longText}
      url={examples.url}
      hdurl={examples.hdurl}
      mediaType={examples.mediaTypeImage}
    />
  );
  const expandText = screen.getByRole('button', {
    name: localization.readMore,
  });
  expect(expandText).toBeVisible();
  expect(expandText).toBeEnabled();
  fireEvent.click(expandText);
  expect(
    screen.queryByRole('button', {
      name: localization.readMore,
    })
  ).not.toBeInTheDocument();

  const collapseText = screen.getByRole('button', {
    name: localization.readLess,
  });
  expect(collapseText).toBeVisible();
  expect(collapseText).toBeEnabled();
  fireEvent.click(collapseText);
  expect(
    screen.queryByRole('button', {
      name: localization.readLess,
    })
  ).not.toBeInTheDocument();
});

it('can be liked and unliked', () => {
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={examples.explanation}
      url={examples.url}
      hdurl={examples.hdurl}
      mediaType={examples.mediaTypeImage}
    />
  );
  const likeButton = screen.getByRole('button', {
    name: localization.ariaLabels.likePhoto,
  });
  fireEvent.click(likeButton);
  expect(
    screen.queryByRole('button', {
      name: localization.ariaLabels.likePhoto,
    })
  ).not.toBeInTheDocument();

  const unlikeButton = screen.getByRole('button', {
    name: localization.ariaLabels.unlikePhoto,
  });
  fireEvent.click(unlikeButton);
  expect(
    screen.queryByRole('button', {
      name: localization.ariaLabels.unlikePhoto,
    })
  ).not.toBeInTheDocument();
});

it('opens full resolution images', () => {
  global.open = jest.fn();
  render(
    <PhotoCard
      date={examples.date}
      title={examples.title}
      explanation={examples.explanation}
      url={examples.url}
      hdurl={examples.hdurl}
      mediaType={examples.mediaTypeImage}
    />
  );
  const openButton = screen.getByRole('button', {
    name: localization.ariaLabels.openInHD,
  });
  fireEvent.click(openButton);
  expect(global.open).toHaveBeenCalled();
  expect(global.open).toHaveBeenCalledWith(examples.hdurl, '_blank');
});
