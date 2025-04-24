import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('test@example.com', '123', 'exampleToken')).toBeTruthy();
  });
});
