import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Tabs>
          <div label="Admin">I am an admin</div>
          <div label="Employee">I am an employee</div>
        </Tabs>
      </div>
    </Layout>
  );
}
