import * as yup from "yup";

export const regFormSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    userName: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),

      confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(8, "min lenght of password should be at least 8 chrs")
      .oneOf([yup.ref("password")], "Password do not match"),
  })
  .required();
