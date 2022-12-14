import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser as updateAdmin } from "../../redux/adminSlice";
import { updateUser as updateEmployee } from "../../redux/employeeSlice";
import { userSchema } from "../../schemas/userSchema";
import RadioButton from "../RadioButton";
import styles from "./form.module.scss";

const Form = ({ onClose }) => {
  const dispatch = useDispatch();

  const adminUsers = useSelector((state) => state.admin.users);
  const employeeUsers = useSelector((state) => state.employee.users);

  const initialValues = {
    first_name: "",
    last_name: "",
    user_type: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: userSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        // add user to the database

        if (values.user_type === "admin") {
          const userObject = {
            ...values,
            division: "",
            district: "",
          };

          try {
            const response = await fetch(process.env.NEXT_PUBLIC_USERS_API, {
              method: "POST",
              body: JSON.stringify(userObject),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              // setting the new data to the local state
              dispatch(updateAdmin(await response.json()));
            } else {
              throw Error("Internal Server Error!");
            }
          } catch (err) {
            console.log(err);
          }
        } else if (values.user_type === "employee") {
          const userObject = {
            ...values,
            division: "",
            district: "",
          };

          try {
            const response = await fetch(process.env.NEXT_PUBLIC_USERS_API, {
              method: "POST",
              body: JSON.stringify(userObject),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              // setting the new data to the local state
              dispatch(updateEmployee(await response.json()));
            } else {
              throw Error("Internal Server Error!");
            }
          } catch (err) {
            console.log(err);
          }
        }
        //// to get rid of all the values after submitting the form
        action.resetForm();
        onClose();
      },
    });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <p className={styles.form_label}>First Name</p>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            className={styles.input_fields}
            onChange={handleChange}
            value={values.first_name}
            onBlur={handleBlur}
          />
          {errors.first_name && touched.first_name && (
            <p className={styles.error_message}>{errors.first_name}</p>
          )}
        </div>
        <div>
          <p className={styles.form_label}>Last Name</p>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            className={styles.input_fields}
            onChange={handleChange}
            value={values.last_name}
            onBlur={handleBlur}
          />
          {errors.last_name && touched.last_name && (
            <p className={styles.error_message}>{errors.last_name}</p>
          )}
        </div>

        <div>
          <p className={styles.form_label}>User Type</p>
          <RadioButton
            options={["admin", "employee"]}
            callback={(value) => (values.user_type = value)}
            name="user_type"
          />
          {errors.user_type && touched.user_type && (
            <p className={styles.error_message}>{errors.user_type}</p>
          )}
        </div>
        <div className={styles.button_container}>
          <button className={styles.cancel_button} onClick={onClose}>
            Cancel
          </button>
          <input type="submit" value="Add" className={styles.add_button} />
        </div>
      </form>
    </div>
  );
};

export default Form;
