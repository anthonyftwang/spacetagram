import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoList from 'views/PhotoList';
import localization from 'util/strings';

const itemsPerPageOptions = [1, 5, 10];

it('renders header with list actions', () => {
  window.scrollTo = jest.fn();
  render(<PhotoList />);
  expect(
    screen.getByRole('heading', { name: localization.haeding })
  ).toBeVisible();
  const aboutButton = screen.getByRole('button', {
    name: localization.ariaLabels.aboutButton,
  });
  expect(aboutButton).toBeVisible();
  expect(aboutButton).toBeEnabled();
  const pageLengthControl = screen.getByRole('button', {
    name: localization.ariaLabels.pageLengthControl,
  });
  expect(pageLengthControl).toBeVisible();
  expect(pageLengthControl).toBeEnabled();
  expect(pageLengthControl).toHaveTextContent(`5 ${localization.itemsPerPage}`);
  expect(screen.getByRole('navigation')).toBeVisible();
});

it('shows about dialog when info icon pressed', async () => {
  window.scrollTo = jest.fn();
  render(<PhotoList />);
  fireEvent.click(
    screen.getByRole('button', {
      name: localization.ariaLabels.aboutButton,
    })
  );
  expect(screen.getByRole('dialog')).toBeVisible();
  fireEvent.click(
    screen.getByRole('button', { name: localization.dialogClose })
  );
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
});

it('expands page length control', () => {
  window.scrollTo = jest.fn();
  render(<PhotoList />);
  const pageLengthControl = screen.getByRole('button', {
    name: localization.ariaLabels.pageLengthControl,
  });
  fireEvent.mouseDown(pageLengthControl);
  expect(screen.getByRole('listbox')).toBeVisible();
  itemsPerPageOptions.map((option) =>
    expect(
      screen.getByRole('option', {
        name: `${option} ${localization.itemsPerPage}`,
      })
    ).toBeVisible()
  );
  fireEvent.click(
    screen.getByRole('option', {
      name: `10 ${localization.itemsPerPage}`,
    })
  );
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: localization.ariaLabels.pageLengthControl,
    })
  ).toHaveTextContent(`10 ${localization.itemsPerPage}`);
});

it('responds to page change', () => {
  global.scrollTo = jest.fn();
  render(<PhotoList />);
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Go to page 99',
    })
  );
  expect(
    screen.getByRole('button', {
      name: 'page 99',
    })
  ).toBeVisible();
});

it('scrolls to top if current page re-selected', () => {
  global.scrollTo = jest.fn();
  render(<PhotoList />);
  fireEvent.click(
    screen.getByRole('button', {
      name: 'page 1',
    })
  );
  expect(global.scrollTo).toHaveBeenCalled();
});
