import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Ledgerly home experience', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /ledger\s*ly/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /calmer way to manage your money/i })).toBeInTheDocument();
});
