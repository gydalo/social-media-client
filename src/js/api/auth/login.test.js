import { login } from './login.js';
import { save } from '../../storage/save.js';
import { apiPath } from '../constants.js';
import { headers } from '../headers.js';

jest.mock('../../storage/save.js', () => ({
  save: jest.fn(),
}));

jest.mock('../headers.js', () => ({
  headers: jest.fn(),
}));

globalThis.fetch = jest.fn();

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch login API and save both token and profile in localstorage.', async () => {
    const mockProfile = {
      accessToken: 'mockToken',
      name: 'Kari Nordmann',
    };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfile),
    };

    fetch.mockResolvedValueOnce(mockResponse);

    const result = await login('test@example.com', 'Password123');

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Password123',
      }),
      headers: headers('application/json'),
    });
    expect(save).toHaveBeenCalledWith('token', 'mockToken');
    expect(save).toHaveBeenCalledWith('profile', { name: 'Kari Nordmann' });

    expect(result).toEqual({ name: 'Kari Nordmann' });
  });

  it('should throw error when response is not ok', async () => {
    const mockErrorResponse = {
      ok: false,
      statusText: 'Unauthorized',
    };

    fetch.mockResolvedValueOnce(mockErrorResponse);
    await expect(login('test@example.com', 'wrongPassword')).rejects.toThrow(
      'Unauthorized',
    );

    expect(save).not.toHaveBeenCalled();
  });
});
