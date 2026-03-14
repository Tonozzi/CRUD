import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation tabs', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /sobre/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /cadastro/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /lista de filmes/i })
  ).toBeInTheDocument();
});
