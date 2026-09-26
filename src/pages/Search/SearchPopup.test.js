import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import SearchPopup from './SearchPopup';
import { DemoAuthProvider } from '../../context/DemoAuthContext';
const render = (ui) => rtlRender(<DemoAuthProvider>{ui}</DemoAuthProvider>);

jest.mock('../../components/Navbar/Navbar', () => () => null);
jest.mock('../../components/Footer/Footer', () => () => null);
let mockQuery = '';
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useSearchParams: () => [new URLSearchParams(mockQuery)],
}));
beforeEach(() => { mockQuery = ''; });

function chooseFilter(label, value) {
  fireEvent.keyDown(screen.getByLabelText(label), { key: 'ArrowDown', code: 'ArrowDown' });
  fireEvent.click(screen.getByRole('option', { name: value === 'Any' ? 'No preference' : value }));
}
function search() { fireEvent.click(screen.getByRole('button', { name: /View \d+ Match/ })); }

test('previews preferences and applies results only on Search without an applied-filter row', () => {
  render(<SearchPopup />);
  fireEvent.click(screen.getByRole('button', { name: 'Bride' }));
  expect(screen.getByRole('button', { name: 'Bride' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /View 3 Matches/ })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(6);
  expect(screen.queryByLabelText('Active filters')).not.toBeInTheDocument();
  search();
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByRole('status')).toHaveTextContent('3 Profiles Found');
  expect(screen.queryByLabelText('Active filters')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Bride' }));
  search();
  expect(screen.getAllByRole('article')).toHaveLength(6);
  expect(screen.getByRole('button', { name: 'Bride' })).toHaveAttribute('aria-pressed', 'false');
});

test('applies inclusive age bounds and resets the range through the fields', () => {
  render(<SearchPopup />);
  chooseFilter('Age From', '25');
  chooseFilter('Age To', '30');
  expect(screen.getAllByRole('article')).toHaveLength(6);
  search();
  expect(screen.getAllByRole('article')).toHaveLength(4);
  chooseFilter('Age From', 'Any');
  chooseFilter('Age To', 'Any');
  search();
  expect(screen.getAllByRole('article')).toHaveLength(6);
  chooseFilter('Age To', '25');
  chooseFilter('Age From', '30');
  search();
  expect(screen.getAllByRole('article')).toHaveLength(1);
});

test('requires parent locations and clears dependent selections when parents change', () => {
  render(<SearchPopup />);
  expect(screen.getByLabelText('State')).toBeDisabled();
  expect(screen.getByLabelText('City')).toBeDisabled();
  chooseFilter('Country', 'India');
  expect(screen.getByLabelText('State')).toBeEnabled();
  expect(screen.getByLabelText('City')).toBeDisabled();
  chooseFilter('State', 'Tamil Nadu');
  expect(screen.getByLabelText('City')).toBeEnabled();
  expect(screen.getByText('Select city')).toBeInTheDocument();
  expect(screen.queryByText('Choose state first')).not.toBeInTheDocument();
  chooseFilter('City', 'Chennai');
  search();
  expect(screen.getAllByRole('article')).toHaveLength(1);
  chooseFilter('Country', 'Malaysia');
  expect(screen.getByLabelText('City')).toBeDisabled();
  expect(screen.getAllByRole('article')).toHaveLength(1);
  search();
  expect(screen.getByText('No matching profiles')).toBeInTheDocument();
  chooseFilter('Country', 'Any');
  search();
  expect(screen.getAllByRole('article')).toHaveLength(6);
  expect(screen.getByLabelText('State')).toBeDisabled();
});

test('all additional filters are visible and apply only on Search', () => {
  render(<SearchPopup />);
  expect(screen.getByRole('combobox', { name: 'Education' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /More Filters/ })).not.toBeInTheDocument();
  chooseFilter('Education', 'BE');
  chooseFilter('Occupation', 'Engineer');
  expect(screen.getAllByRole('article')).toHaveLength(6);
  search();
  expect(screen.getAllByRole('article')).toHaveLength(2);
  chooseFilter('Education', 'Any');
  chooseFilter('Occupation', 'Any');
  search();
  expect(screen.getAllByRole('article')).toHaveLength(6);
});

test('restores parent locations for a city from the landing page', () => {
  mockQuery = 'lookingFor=Bride&city=Chennai';
  render(<SearchPopup />);
  expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(screen.getByLabelText('City')).toBeEnabled();
  chooseFilter('Country', 'Any');
  search();
  expect(screen.getByLabelText('State')).toBeDisabled();
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
