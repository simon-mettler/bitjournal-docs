import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./pricing.module.css";

export default function Pricing(): ReactNode {
  return (
    <Layout
      title="Pricing"
      description="BitJournal costs $9 per month or $90 per year."
    >
      <main className="container margin-vert--xl">
        <Heading as="h1" className="text--center">
          Pricing
        </Heading>
        <p className="text--center">One plan, billed monthly or yearly.</p>

        <div className={styles.plans}>
          <div className={styles.plan}>
            <span className={styles.name}>Monthly</span>
            <span className={styles.price}>
              $9 <small>/ month</small>
            </span>
            <span className={styles.note}>Cancel any time.</span>
            <button
              type="button"
              className={`button button--outline button--primary ${styles.soon}`}
              disabled
            >
              Coming soon
            </button>
          </div>

          <div className={`${styles.plan} ${styles.featured}`}>
            <span className={styles.name}>Yearly</span>
            <span className={styles.price}>
              $90 <small>/ year</small>
            </span>
            <span className={styles.note}>
              Two months free compared to monthly.
            </span>
            <button
              type="button"
              className={`button button--primary ${styles.soon}`}
              disabled
            >
              Coming soon
            </button>
          </div>
        </div>

        <p className={styles.selfhost}>
          Prefer to run it yourself?{" "}
          <Link to="/docs/selfhost/overview">Read the self-hosting guide</Link>.
        </p>
      </main>
    </Layout>
  );
}
