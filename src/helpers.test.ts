import {
  EnumLikeType,
  getEnumLikeTypeGuard,
  getIterable,
  getKeyIdentityEnumLike,
  getKeys,
  getReversedEnumLike,
  getValues
} from './helpers.js';
import { expectType } from 'tsd';

describe('helper functions', () => {
  const TEST_ENUMLIKE = {
    a: 'first',
    b: 'second'
  } as const;

  type TEST_ENUMLIKE = EnumLikeType<typeof TEST_ENUMLIKE>;

  it('getIterableObject should return array with objects containing keys and values', () => {
    const iterable = getIterable(TEST_ENUMLIKE);
    const expectedIterable = [
      { key: 'a', value: 'first' },
      { key: 'b', value: 'second' }
    ];

    expect(iterable.length).toBe(2);
    expect(iterable).toStrictEqual(expectedIterable);
  });

  it('getValues should return array with values', () => {
    const values = getValues(TEST_ENUMLIKE);
    expect(values).toStrictEqual(['first', 'second']);
  });

  it('getKeys should return array with keys', () => {
    const values = getKeys(TEST_ENUMLIKE);
    expect(values).toStrictEqual(['a', 'b']);
  });

  describe('getEnumTypeGuard function', () => {
    const testEnumGuard = getEnumLikeTypeGuard(TEST_ENUMLIKE);

    it('should return true when the string is enum member', () => {
      expect(testEnumGuard(TEST_ENUMLIKE.a)).toBe(true);
      expect(testEnumGuard('first')).toBe(true);
    });

    it('should return false when the string is not enum member', () => {
      expect(testEnumGuard('randomString')).toBe(false);
    });

    it('should change string type if guard is used and it is enum member', () => {
      const enumValue = TEST_ENUMLIKE.a.toString();

      if (!testEnumGuard(enumValue)) {
        throw Error(
          'Guard returned false- it is probably an error with guard logic, not a typecheck'
        );
      }

      expectType<TEST_ENUMLIKE>(enumValue);
    });
  });

  describe('getReversedEnumlike', () => {
    it('should correctly reverse enum with no duplicate keys', () => {
      const reversedTestEnum = getReversedEnumLike(TEST_ENUMLIKE);

      expect(reversedTestEnum.first).toBe('a');
      expectType<'a'>(reversedTestEnum.first);

      expect(reversedTestEnum.second).toBe('b');
      expectType<'b'>(reversedTestEnum.second);

      const expectedReversedEnum = {
        first: 'a',
        second: 'b'
      };

      expect(reversedTestEnum).toStrictEqual(expectedReversedEnum);
    });
  });

  describe('getKeyIdentityEnumLike', () => {
    it('should correctly remap enum to key identity enum', () => {
      const keyIdentityEnum = getKeyIdentityEnumLike(TEST_ENUMLIKE);

      expect(keyIdentityEnum.a).toBe('a');
      expectType<'a'>(keyIdentityEnum.a);

      expect(keyIdentityEnum.b).toBe('b');
      expectType<'b'>(keyIdentityEnum.b);

      const expectedKeyIdentityEnum = {
        a: 'a',
        b: 'b'
      };

      expect(keyIdentityEnum).toStrictEqual(expectedKeyIdentityEnum);
    });
  });
});
