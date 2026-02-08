import {
  isValidEmail,
  isValidPhone,
  isRequired,
  isPositiveNumber,
} from '../validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
    });

    it('should reject empty email', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone', () => {
      expect(isValidPhone('1234567890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
    });

    it('should reject invalid phone', () => {
      expect(isValidPhone('123')).toBe(false);
    });

    it('should reject empty phone', () => {
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('should validate non-empty string', () => {
      expect(isRequired('test')).toBe(true);
    });

    it('should reject empty string', () => {
      expect(isRequired('')).toBe(false);
    });

    it('should reject whitespace only', () => {
      expect(isRequired('   ')).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should validate positive number', () => {
      expect(isPositiveNumber(10)).toBe(true);
      expect(isPositiveNumber('10')).toBe(true);
    });

    it('should reject negative number', () => {
      expect(isPositiveNumber(-10)).toBe(false);
    });

    it('should reject zero', () => {
      expect(isPositiveNumber(0)).toBe(false);
    });
  });
});
