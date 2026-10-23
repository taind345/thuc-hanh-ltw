import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TopBar with author name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Nguyễn Đức Tài/i);
  expect(nameElement).toBeInTheDocument();
});
