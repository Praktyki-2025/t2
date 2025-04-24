import { Transaction } from './transaction';

describe('Transaction', () => {
  it('should create an instance', () => {
    expect(new Transaction("0", "YYYY-MM-DD HH:MM:SS.mmmmmm", 0)).toBeTruthy();
  });
});
