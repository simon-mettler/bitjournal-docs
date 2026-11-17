import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import AnimatedLogo from '@site/src/components/AnimatedLogo';

export default function NavbarLogo(): ReactNode {
  return (
    <Link className="navbar__brand" to={useBaseUrl('/')} aria-label="BitJournal home">
      <AnimatedLogo />
    </Link>
  );
}
