import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import ThemedImage from "@theme/ThemedImage";
import AnimatedLogo from "@site/src/components/AnimatedLogo";

import styles from "./index.module.css";

const features = [
  {
    title: "Your own signals",
    lead: "Track what matters to you.",
    text: "Count coffees, rate your mood, log your weight, time your workouts. Define a signal once, in whatever shape fits, and group related ones into boards.",
  },
  {
    title: "A timeline of your life",
    lead: "Log it now, find it later.",
    text: "Record events as they happen, in seconds. Scroll back through everything you've tracked.",
  },
  {
    title: "Analytics built in",
    lead: "Turn entries into insight.",
    text: "Numbers and charts show your trends and averages. They also show the patterns you'd never spot by memory alone.",
  },
  {
    title: "Yours to keep",
    lead: "Open source and self-hostable.",
    text: "Run it on your own server and keep your data under your control.",
  },
];

const steps = [
  {
    title: "Define a signal",
    text: "Pick what you want to track and how: a tally for coffees, a range for mood, a value for weight, a duration for sleep. It takes a few seconds.",
  },
  {
    title: "Log it as it happens",
    text: "Add an event whenever something happens. One tap, one number, fast and easy.",
  },
  {
    title: "Discover the patterns",
    text: "Look back through your timeline, then let the analytics show you trends and averages you'd never notice day to day.",
  },
];

export default function Home(): ReactNode {
  const shot = (name: string) => ({
    light: useBaseUrl(`/img/screenshots/${name}_light.png`),
    dark: useBaseUrl(`/img/screenshots/${name}_dark.png`),
  });
  const log = shot("log");
  const journal = shot("journal");
  const dashboard = shot("dashboard");

  return (
    <Layout
      title="Track anything. See what it means."
      description="Track anything you can count, rate, measure or time. Define your own signals, log them in seconds, and let built-in analytics show you the patterns."
    >
      <div className={styles.notice} role="note">
        <div className={`container ${styles.noticeInner}`}>
          <span className={styles.badge}>Early development</span>
          <p className={styles.noticeText}>
            bitjournal is still under active development, with more features and
            improvements on the way. Follow progress on{" "}
            <Link href="https://github.com/simon-mettler/bitjournal">
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>

      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <AnimatedLogo className={styles.logo} />
          <Heading as="h1" className={styles.title}>
            Track anything.
            <br />
            <span className={styles.accent}>See the patterns.</span>
          </Heading>
          <p className={styles.subtitle}>
            Track anything you can count, rate, measure or time. Define your own
            signals, log them in seconds, and explore your data through
            customizable dashboards, charts and widgets.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/pricing">
              Pricing
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/selfhost/overview"
            >
              Self-hosting guide
            </Link>
          </div>
          <div className={styles.shots}>
            <ThemedImage
              className={`${styles.shot} ${styles.shotSide}`}
              sources={journal}
              alt="The BitJournal journal timeline"
            />
            <ThemedImage
              className={`${styles.shot} ${styles.shotCenter}`}
              sources={log}
              alt="The BitJournal log screen"
            />
            <ThemedImage
              className={`${styles.shot} ${styles.shotSide}`}
              sources={dashboard}
              alt="The BitJournal analytics dashboard"
            />
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.featureGrid}>
              {features.map((f) => (
                <div key={f.title} className={styles.card}>
                  <Heading as="h3" className={styles.cardTitle}>
                    {f.title}
                  </Heading>
                  <p className={styles.cardLead}>{f.lead}</p>
                  <p className={styles.cardText}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              How it works
            </Heading>
            <p className={styles.sectionSub}>
              Simple to start. Useful over time.
            </p>
            <ol className={styles.steps}>
              {steps.map((s, i) => (
                <li key={s.title} className={styles.step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <Heading as="h3" className={styles.cardTitle}>
                    {s.title}
                  </Heading>
                  <p className={styles.cardText}>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.cta}`}>
            <Heading as="h2" className={styles.sectionTitle}>
              Start tracking today.
            </Heading>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/pricing">
                Pricing
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/selfhost/overview"
              >
                Self-hosting guide
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
