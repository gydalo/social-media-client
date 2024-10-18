import { logout } from './logout.js';
import { remove } from '../../storage/remove.js';

jest.mock('../../storage/remove.js', () => ({
  remove: jest.fn(),
}));

it('removes profile and token from localstorage when clicked', () => {
  logout();

  expect(remove).toHaveBeenCalledWith('token');

  expect(remove).toHaveBeenCalledWith('profile');
});
