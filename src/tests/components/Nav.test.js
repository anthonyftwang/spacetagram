import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from 'components/Nav';
import localization from 'util/strings';

it('renders toolbar with app title', () => {
  const setLightThemeActive = jest.fn();
  render(<Nav usingLightTheme toggleLightTheme={setLightThemeActive} />);
  expect(screen.getByRole('banner')).toBeVisible();
  expect(screen.getByRole('banner')).toHaveTextContent(localization.appName);
});

it('renders light theme button when in dark mode', () => {
  const setLightThemeActive = jest.fn();
  render(
    <Nav usingLightTheme={false} toggleLightTheme={setLightThemeActive} />
  );
  const toggle = screen.getByRole('button', {
    name: localization.ariaLabels.lightThemeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(toggle);
  expect(toggle).toBeEnabled();
  fireEvent.click(toggle);
  expect(setLightThemeActive).toHaveBeenCalled();
  expect(setLightThemeActive).toHaveBeenCalledWith(true);
});

it('renders dark theme button when in light mode', () => {
  const setLightThemeActive = jest.fn();
  render(<Nav usingLightTheme toggleLightTheme={setLightThemeActive} />);
  const toggle = screen.getByRole('button', {
    name: localization.ariaLabels.darkThemeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(toggle);
  expect(toggle).toBeEnabled();
  fireEvent.click(toggle);
  expect(setLightThemeActive).toHaveBeenCalled();
  expect(setLightThemeActive).toHaveBeenCalledWith(false);
});

it('renders link to github repo in app bar', () => {
  const setLightThemeActive = jest.fn();
  const hrefChange = jest.fn();
  delete window.location;
  window.location = {};
  Object.defineProperty(window.location, 'href', {
    set: hrefChange,
  });
  render(<Nav usingLightTheme toggleLightTheme={setLightThemeActive} />);
  const github = screen.getByRole('button', {
    name: localization.ariaLabels.sourceCodeButton,
  });
  expect(screen.getByRole('banner')).toContainElement(github);
  expect(github).toBeEnabled();
  fireEvent.click(github);
  expect(hrefChange).toHaveBeenCalled();
});
