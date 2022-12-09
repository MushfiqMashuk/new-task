import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Tabs>
          <div label="Admin" onClick={() => console.log("Nice")}>
            I am an admin
          </div>
          <div label="Employee" onClick={() => console.log("Nice")}>
            I am an employee
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
