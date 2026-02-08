import { formatCurrency, formatPhone, capitalizeWords } from '../formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format number as currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
    });

    it('should handle null values', () => {
      expect(formatCurrency(null)).toBe('N/A');
    });

    it('should handle decimal values', () => {
      expect(formatCurrency(99.99)).toBe('$99.99');
    });
  });

  describe('formatPhone', () => {
    it('should format 10-digit phone number', () => {
      expect(formatPhone('1234567890')).toBe('(123) 456-7890');
    });

    it('should handle null values', () => {
      expect(formatPhone(null)).toBe('N/A');
    });

    it('should return original for invalid format', () => {
      expect(formatPhone('123')).toBe('123');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('should handle single word', () => {
      expect(capitalizeWords('test')).toBe('Test');
    });
  });
});
