import { renderHook, act } from '@testing-library/react-hooks';
import useStateWithLocalStorage from 'hooks/useStateWithLocalStorage';

it('initializes key mapping in localStorage to false', () => {
  renderHook(() => useStateWithLocalStorage('testkey'));
  expect(localStorage.getItem('testkey')).toEqual('false');
});

it('reads existing key value from localStorage', () => {
  localStorage.setItem('testkey', 'true');
  const { result } = renderHook(() => useStateWithLocalStorage('testkey'));
  const [value] = result.current;
  expect(value).toEqual(true);
  expect(localStorage.getItem('testkey')).toEqual('true');
});

it('updates localStorage when state changes', () => {
  const { result } = renderHook(() => useStateWithLocalStorage('testkey'));
  const [, setValue] = result.current;
  act(() => {
    setValue(true);
  });
  expect(localStorage.getItem('testkey')).toEqual('true');
});
