import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import Tabs from "../components/Tabs";
import styles from "./home.module.scss";

export default function Home({ admin }) {
  let PageSize = 5;
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState(admin);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return adminData?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
            {adminData && (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>USER TYPE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.id}</td>
                        <td>{item?.first_name}</td>
                        <td>{item?.last_name}</td>
                        <td>{item?.user_type}</td>
                        <td>
                          <Link href={`/user/${item?.id}`}>
                            <a>Details</a>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div label="Employee" onClick={() => console.log("Nice")}>
            I am an employee
          </div>
        </Tabs>
        <Pagination
          className={styles.pagination_bar}
          currentPage={currentPage}
          totalCount={adminData?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_API}?user_type=admin`
    );

    if (response.ok) {
      data = await response.json();
    } else {
      throw Error("Internal Server Error!");
    }
  } catch (err) {
    console.log(err);
  }

  // If the data is not found, we are showing 404 page by returning notFound = true
  if (!data[0]?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      admin: data,
    },
    revalidate: 60,
  };
}
