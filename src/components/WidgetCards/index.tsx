import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type CardProps = {
  to: string;
  title: string;
  description: string;
  light: string;
  dark: string;
};

export function WidgetCard({to, title, description, light, dark}: CardProps): ReactNode {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.imageBox}>
        <ThemedImage
          className={styles.image}
          alt={title}
          sources={{light: useBaseUrl(light), dark: useBaseUrl(dark)}}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}

export function WidgetCards({children}: {children: ReactNode}): ReactNode {
  return <div className={styles.grid}>{children}</div>;
}
