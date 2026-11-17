import type {ReactNode} from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type Props = {
  /** Image shown in light mode, e.g. /img/widgets/foo_light.png */
  light: string;
  /** Image shown in dark mode. */
  dark: string;
  alt: string;
  /** Maximum width in px (default 420). Ignored when `height` is set. */
  maxWidth?: number;
  /** Fixed height in px. The width follows the aspect ratio (never wider than the page). */
  height?: number;
};

export default function Screenshot({light, dark, alt, maxWidth = 420, height}: Props): ReactNode {
  return (
    <div className={styles.wrapper}>
      <ThemedImage
        className={styles.image}
        style={height ? {height, width: 'auto', maxWidth: '100%'} : {maxWidth}}
        alt={alt}
        sources={{light: useBaseUrl(light), dark: useBaseUrl(dark)}}
      />
    </div>
  );
}
