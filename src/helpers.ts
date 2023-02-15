export const getIterable = <T extends AnyRecord<any>>(enumerable: T) => {
  const enumKeys = Object.keys(enumerable) as Array<keyof typeof enumerable>;
  const iterable = enumKeys.map((key) => {
    const value = enumerable[key];
    return { key, value };
  });

  return iterable as Readonly<typeof iterable>;
};

export const getValues = <T extends AnyRecord<any>>(enumerable: T) => {
  const enumValues = Object.values(enumerable) as Array<T[keyof T]>;
  return enumValues as Readonly<typeof enumValues>;
};

export const getKeys = <T>(enumerable: AnyRecord<T>) => {
  const enumKeys = Object.keys(enumerable) as Array<keyof typeof enumerable>;
  return enumKeys as Readonly<typeof enumKeys>;
};

export const getEnumLikeTypeGuard = <T extends AnyRecord<any>>(
  enumerable: T
) => {
  const enumValues = getValues(enumerable);

  return (possibleMember: unknown): possibleMember is T[keyof T] => {
    return enumValues.includes(possibleMember as T[keyof T]);
  };
};

export const getEnumLikeTypeAssertion = <T extends AnyRecord<any>>(
  enumerable: T
) => {
  const enumValues = getValues(enumerable);

  return (possibleMember: unknown): asserts possibleMember is T[keyof T] => {
    if (!enumValues.includes(possibleMember as T[keyof T])) {
      throw new Error(`${possibleMember} is not element of enumerable.`);
    }
  };
};

/** Allows to reverse enumLike object. Should not be used on objects containing duplicates */
export const getReversedEnumLike = <T extends AnyFlatRecord<any>>(
  enumLike: T
) => {
  const reversedEnumLike = Object.fromEntries(
    Object.entries(enumLike).map(([key, val]) => {
      return [val, key];
    })
  );

  return reversedEnumLike as ReverseEnumLike<T>;
};

/** Allows to change any enum to enum like object where values are same as keys */
export const getKeyIdentityEnumLike = <T>(enumLike: AnyRecord<T>) => {
  const keyToKeyEnumLike = Object.fromEntries(
    Object.keys(enumLike).map((key) => {
      return [key, key];
    })
  );
  return keyToKeyEnumLike as Readonly<KeyToKeyEnumLike<typeof enumLike>>;
};

const enumKeyName = '$$key' as const;
type KeyOfEnumValue<T> = keyof T[keyof T];
type KeyOfEnumKey = typeof enumKeyName;
type KeyOf<T> = KeyOfEnumKey | KeyOfEnumValue<T>;

export const remapEnumLike = <
  T extends CompoundRecord<any>,
  IKey extends KeyOf<T>,
  OKey extends KeyOf<T>
>(
  enumerable: T,
  inKey: IKey,
  outKey: OKey
) => {
  const remappedEnum = Object.fromEntries(
    (Object.entries(enumerable) as Array<[keyof T, T[keyof T]]>).map(
      ([key, value]) => {
        return [
          inKey === enumKeyName ? key : value[inKey as KeyOfEnumValue<T>],
          outKey === enumKeyName ? key : value[outKey as KeyOfEnumValue<T>]
        ];
      }
    )
  );

  return remappedEnum as RemappedEnumLike<T, IKey, OKey>;
};

type RemappedEnumLike<
  T extends CompoundRecord<any>,
  IKey extends KeyOf<T>,
  OKey extends KeyOf<T>
> = IKey extends KeyOfEnumKey
  ? OKey extends KeyOfEnumKey
    ? { [K in keyof T]: K }
    : {
        [K in keyof T]: T[K][OKey];
      }
  : OKey extends KeyOfEnumKey
  ? {
      [K in keyof T as T[K][IKey]]: K;
    }
  : {
      [K in keyof T as T[K][IKey]]: T[K][OKey];
    };

export type EnumLikeType<T> = T[keyof T];
export type KeyEnumLikeType<T> = keyof T;

export type ReverseEnumLike<T extends AnyFlatRecord<any>> = {
  [K in keyof T as T[K]]: K;
};

export type KeyToKeyEnumLike<T> = {
  [K in keyof T]: K;
};

type AnyFlatRecord<T> = Record<keyof T, PropertyKey>;
type AnyRecord<T> = Record<keyof T, T[keyof T]>;
type CompoundRecord<T> = Record<
  keyof T,
  Record<keyof T[keyof T], T[keyof T][keyof T[keyof T]]>
>;
