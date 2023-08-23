import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout home>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Messenger 📫</h1>
          <div className={styles.card}>
            <Link href="/message/SendMessagePage">
              <h2>send &rarr;</h2>
            </Link>
            <p>send messages and avax to other accounts</p>
          </div>

          <div className={styles.card}>
            <Link href="/message/ConfirmMessagePage">
              <h2>check &rarr;</h2>
            </Link>
            <p>Check messages from other accounts</p>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
