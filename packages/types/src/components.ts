import type { ComponentType, SVGProps } from 'react';

import type { EmptyObject } from './domain';

/**
 * An SVG icon component.
 *
 * This type is meant to be used to describe
 * the props of an SVG icon component.
 *
 * The props are the same as the props of an
 * `SVGSVGElement` with the addition of a
 * `className` prop.
 */
export type IconProps = SVGProps<SVGSVGElement>;

/**
 * An Icon component type.
 *
 * This type represents a React component that renders
 * an SVG icon using the specified IconProps.
 */
export type Icon = ComponentType<IconProps>;

/**
 * A type representing component props.
 *
 * This type is a record where the keys are strings
 * and the values can be of any type. It is used
 * when the shape of the props is not known in advance.
 */
// biome-ignore lint/suspicious/noExplicitAny: this is okay, there are no other types that better describe this
export type Props = Record<string, any>;

/**
 * A type that extends component props with an optional className.
 *
 * This utility type is used to add a `className` property to existing component props.
 * It is helpful when you want to provide additional styling capabilities to components.
 *
 * @template T - The type of the component props to extend. Defaults to `EmptyObject`.
 */
export type PropsWithClassName<T extends Props = EmptyObject> = T & {
  className?: string;
};
