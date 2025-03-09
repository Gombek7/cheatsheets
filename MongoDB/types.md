# Przydatne typy pomocnicze przy korzystaniu z MongoDB

## ReplaceObjectId
```ts
import { ObjectId } from 'mongodb';

/**
 * Replaces `ObjectId` with string. Useful for serialisation.
 */
export type ReplaceObjectId<T> = {
  [K in keyof T]: T[K] extends ObjectId
    ? string
    : T[K] extends ObjectId[]
      ? string[]
      : T[K] extends object
        ? ReplaceObjectId<T[K]>
        : T[K];
};
```

## ReplaceDate
```ts
/**
 * Replaces `Date` with string. Useful for serialisation.
 */
export type ReplaceDate<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Date[]
      ? string[]
      : T[K] extends object
        ? ReplaceDate<T[K]>
        : T[K];
};
```