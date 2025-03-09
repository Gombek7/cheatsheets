# Przydatne typy pomocnicze do React'a

## PropsWithStyle
```ts
import { CSSProperties, PropsWithChildren } from 'react';

/**
 * Utility type similiar to {@link PropsWithChildren}. Can be used to extend component props or directly as props.
 */
export type PropsWithStyle<P = unknown> = P & {
  style?: CSSProperties;
  className?: string;
};
```