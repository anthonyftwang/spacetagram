import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from 'components/Loading';

it('renders photo list skeleton', () => {
  render(<Loading numPerPage={5} />);
  expect(screen.getByRole('status')).toBeVisible();
});
