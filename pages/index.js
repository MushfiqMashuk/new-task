import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import Tabs from "../components/Tabs";
import { addUser as addAdmin } from "../redux/adminSlice";
import { addUser as addEmployee } from "../redux/employeeSlice";
import styles from "./home.module.scss";

export default function Home({ admin, employee }) {
  let PageSize = 5;
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("Admin");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addAdmin(admin));
    dispatch(addEmployee(employee));
  }, [admin, employee]);

  const adminUsers = useSelector((state) => state.admin.users);
  const employeeUsers = useSelector((state) => state.employee.users);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    // 'limit' & 'page' query parameters of the given api doesn't work.
    // So I had to paginate manually.

    return selectedTab?.toLowerCase() === "admin"
      ? adminUsers?.slice(firstPageIndex, lastPageIndex)
      : employeeUsers?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, selectedTab, adminUsers, employeeUsers]);

  // Prevents the ui not remain on the same page when we toggle between tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const handleClick = (user) => {
    setSelectedTab(user);
  };

  return (
    <Layout>
      <div className={styles.container}>
        {showModal && (
          <Modal title="Add new user" onClose={() => setShowModal(false)}>
            <Form onClose={() => setShowModal(false)} />
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
          <div label="Admin" onClick={() => handleClick("admin")}>
            {adminUsers && (
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
                      <tr key={item?.id}>
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
          <div label="Employee" onClick={() => handleClick("employee")}>
            {employeeUsers && (
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
                      <tr key={item?.id}>
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
        </Tabs>
        <Pagination
          className={styles.pagination_bar}
          currentPage={currentPage}
          totalCount={
            selectedTab.toLowerCase() === "admin"
              ? adminUsers?.length
              : employeeUsers?.length
          }
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let admin;
  let employee;

  try {
    const adminResponse = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_API}?user_type=admin`
    );

    const employeeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_USERS_API}?user_type=employee`
    );

    if (adminResponse.ok && employeeResponse.ok) {
      admin = await adminResponse.json();
      employee = await employeeResponse.json();
    } else {
      throw Error("Internal Server Error!");
    }
  } catch (err) {
    console.log(err);
  }

  // If the data is not found, we are showing 404 page by returning notFound = true
  if (!admin[0]?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      admin,
      employee,
    },
    revalidate: 60,
  };
}
