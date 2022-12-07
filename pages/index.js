import Layout from "../components/Layout";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>Hello</div>
    </Layout>
  );
}
