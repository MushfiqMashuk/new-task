import { useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import styles from "./home.module.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className={styles.container}>
        {showModal && (
          <Modal title="Add new user" onClose={() => setShowModal(false)}>
            Nice looing Kid
          </Modal>
        )}
        <div className={styles.add_user}>
          <button
            className={styles.add_button}
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>
        <Tabs title="User Info">
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
