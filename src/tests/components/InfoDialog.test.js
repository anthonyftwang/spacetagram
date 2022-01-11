import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoDialog from 'components/InfoDialog';
import localization from 'util/strings';

it('renders info dialog', () => {
  const hideInfoDialog = jest.fn();
  render(
    <InfoDialog
      title="A dialog title"
      text="Some dialog text"
      open
      onClose={hideInfoDialog}
    />
  );
  expect(screen.getByRole('heading')).toHaveTextContent('A dialog title');
  expect(screen.getByText('Some dialog text')).toBeVisible();
  expect(
    screen.getByRole('button', { name: localization.dialogClose })
  ).toBeEnabled();
});

it('calls function to close dialog when button pressed', () => {
  const onCloseHandler = jest.fn();
  render(
    <InfoDialog
      title="A dialog title"
      text="Some dialog text"
      open
      onClose={onCloseHandler}
    />
  );
  fireEvent.click(
    screen.getByRole('button', { name: localization.dialogClose })
  );
  expect(onCloseHandler).toHaveBeenCalled();
});
