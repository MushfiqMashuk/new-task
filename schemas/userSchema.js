import * as Yup from "yup";

export const userSchema = Yup.object({
  first_name: Yup.string().min(2).required("Please enter your first name"),
  last_name: Yup.string().min(2).required("Please enter your last name"),
  user_type: Yup.string().required("Please select a user type"),
});
