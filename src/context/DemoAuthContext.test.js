import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DemoAuthProvider, REQUESTS_KEY, SESSION_KEY, requestAccess, respondToRequest, hasProfileAccess } from './DemoAuthContext';
import ProfileDetails from '../pages/ProfileDetails/ProfileDetails';
import { LanguageProvider } from './LanguageContext';

jest.mock('../components/Footer/Footer', () => () => null);
jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ to, children, end, ...props }) => <a href={to} {...props}>{children}</a>,
  useParams: () => ({ profileId: 'priya' }),
  useLocation: () => ({ pathname: '/profile/priya' }),
  useNavigate: () => jest.fn(),
}));

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });

function loginAs(id) {
  const switcher = screen.queryByRole('button', { name: /^Demo:/ });
  fireEvent.click(switcher || screen.getAllByRole('button', { name: 'Login' })[0]);
  fireEvent.change(screen.getByLabelText('Demo account'), { target: { value: id } });
  fireEvent.click(screen.getByRole('button', { name: 'Continue with demo account' }));
}
const page = () => <LanguageProvider><DemoAuthProvider><ProfileDetails /></DemoAuthProvider></LanguageProvider>;

test('requests are unique, only the recipient may decide, and access is directional', () => {
  const pending = requestAccess([], 'arun', 'priya');
  expect(requestAccess(pending, 'arun', 'priya')).toHaveLength(1);
  expect(() => requestAccess([], 'arun', 'arun')).toThrow();
  expect(() => respondToRequest(pending, 'karthik', pending[0].id, 'approved')).toThrow();
  expect(() => respondToRequest(pending, 'arun', pending[0].id, 'approved')).toThrow();
  expect(hasProfileAccess(pending, 'arun', 'priya')).toBe(false);
  const approved = respondToRequest(pending, 'priya', pending[0].id, 'approved');
  expect(hasProfileAccess(approved, 'arun', 'priya')).toBe(true);
  expect(hasProfileAccess(approved, 'priya', 'arun')).toBe(false);
  expect(hasProfileAccess(approved, 'karthik', 'priya')).toBe(false);
  expect(hasProfileAccess(approved, undefined, 'priya')).toBe(false);
  expect(() => respondToRequest(approved, 'priya', approved[0].id, 'rejected')).toThrow();
});

test('login, favourite, recipient approval and logout control full profile visibility', async () => {
  render(page());
  expect(screen.queryByRole('button', { name: /^Notifications/ })).not.toBeInTheDocument();
  expect(screen.queryByText('Family Details')).not.toBeInTheDocument();
  loginAs('arun');
  expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Favourite Priya and request full profile' }));
  expect(screen.getByRole('button', { name: 'Awaiting approval' })).toBeDisabled();
  expect(screen.queryByText('Family Details')).not.toBeInTheDocument();
  loginAs('priya');
  fireEvent.click(screen.getByRole('button', { name: 'Notifications, 1 pending requests' }));
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Accept' })).not.toBeInTheDocument());
  loginAs('arun');
  expect(screen.getByText('Family Details')).toBeInTheDocument();
  expect(screen.getByText('Contact Details')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /^Notifications/ }));
  expect(screen.getByRole('link', { name: 'View full profile' })).toHaveAttribute('href', '/profile/priya');
  fireEvent.click(screen.getAllByRole('button', { name: 'Log out' })[0]);
  expect(screen.queryByText('Family Details')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /^Notifications/ })).not.toBeInTheDocument();
  loginAs('karthik');
  expect(screen.queryByText('Family Details')).not.toBeInTheDocument();
});

test('rejection keeps details private and persists after reload', async () => {
  const view = render(page());
  loginAs('arun');
  fireEvent.click(screen.getByRole('button', { name: 'Favourite Priya and request full profile' }));
  loginAs('priya');
  fireEvent.click(screen.getByRole('button', { name: /^Notifications/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument());
  loginAs('arun');
  expect(screen.getByRole('button', { name: 'Request declined' })).toBeDisabled();
  view.unmount();
  render(page());
  expect(screen.getByRole('button', { name: 'Request declined' })).toBeDisabled();
  expect(screen.queryByText('Contact Details')).not.toBeInTheDocument();
});

test('approval updates from another tab and restored sessions unlock only that requester', () => {
  sessionStorage.setItem(SESSION_KEY, 'arun');
  const pending = requestAccess([], 'arun', 'priya');
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(pending));
  const view = render(page());
  expect(screen.queryByText('Contact Details')).not.toBeInTheDocument();
  const approved = respondToRequest(pending, 'priya', pending[0].id, 'approved');
  act(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(approved));
    window.dispatchEvent(new StorageEvent('storage', { key: REQUESTS_KEY }));
  });
  expect(screen.getByText('Contact Details')).toBeInTheDocument();
  view.unmount();
  render(page());
  expect(screen.getByText('Contact Details')).toBeInTheDocument();
});
