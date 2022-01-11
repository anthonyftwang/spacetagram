import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from 'components/Nav';
import localization from 'util/strings';

it('renders toolbar with app title', () => {
  const setDarkThemeActive = jest.fn();
  render(<Nav usingDarkTheme toggleDarkTheme={setDarkThemeActive} />);
  expect(screen.getByRole('banner')).toBeVisible();
  expect(screen.getByRole('banner')).toHaveTextContent(localization.appName);
});

it('renders light theme button when in using dark mode', () => {
  const setDarkThemeActive = jest.fn();
  render(<Nav usingDarkTheme toggleDarkTheme={setDarkThemeActive} />);
  const toggle = screen.getByRole('button', {
    name: localization.ariaLabels.lightThemeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(toggle);
  expect(toggle).toBeEnabled();
  fireEvent.click(toggle);
  expect(setDarkThemeActive).toHaveBeenCalled();
  expect(setDarkThemeActive).toHaveBeenCalledWith(false);
});

it('renders dark theme button when in using light mode', () => {
  const setDarkThemeActive = jest.fn();
  render(<Nav usingDarkTheme={false} toggleDarkTheme={setDarkThemeActive} />);
  const toggle = screen.getByRole('button', {
    name: localization.ariaLabels.darkThemeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(toggle);
  expect(toggle).toBeEnabled();
  fireEvent.click(toggle);
  expect(setDarkThemeActive).toHaveBeenCalled();
  expect(setDarkThemeActive).toHaveBeenCalledWith(true);
});

it('renders link to github repo in app bar', () => {
  const setDarkThemeActive = jest.fn();
  const hrefChange = jest.fn();
  delete window.location;
  window.location = {};
  Object.defineProperty(window.location, 'href', {
    set: hrefChange,
  });
  render(<Nav usingDarkTheme toggleDarkTheme={setDarkThemeActive} />);
  const github = screen.getByRole('button', {
    name: localization.ariaLabels.sourceCodeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(github);
  expect(github).toBeEnabled();
  fireEvent.click(github);
  expect(hrefChange).toHaveBeenCalled();
});
