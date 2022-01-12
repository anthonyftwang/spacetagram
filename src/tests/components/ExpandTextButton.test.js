import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpandTextButton from 'components/ExpandTextButton';
import localization from 'util/strings';

it('renders read more button', () => {
  const readMoreHandler = jest.fn();
  render(<ExpandTextButton readMore onClickHandler={readMoreHandler} />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(localization.readMore);
  fireEvent.click(button);
  expect(readMoreHandler).toHaveBeenCalled();
});

it('renders read less button', () => {
  const readLessHandler = jest.fn();
  render(
    <ExpandTextButton readMore={false} onClickHandler={readLessHandler} />
  );
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(localization.readLess);
  fireEvent.click(button);
  expect(readLessHandler).toHaveBeenCalled();
});
