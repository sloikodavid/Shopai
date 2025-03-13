import type { SvgProps } from 'react-native-svg';
import { cssInterop } from 'nativewind';

export type IconType = React.ComponentType<SvgProps>;

export function iconWithClassName(icon: IconType) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
