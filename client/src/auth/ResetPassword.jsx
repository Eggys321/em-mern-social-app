import { useState } from "react";
import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import emailImg from "../assets/email-img.svg";
import "../styles/ResetPassword.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../utils/ValidationSchema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader } from "../utils/Loader";
import { post } from "../api/client";
import Seo from "../components/Seo";

const ResetPassword = () => {
  const [isCLicked, setIsClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPwd = async (data) => {
    setIsClicked(true);

    try {
      const response = await post("/auth/forgotpassword", data, { auth: false });
      toast.success(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsClicked(false);
    }
  };

  const btnText = isCLicked ? <Loader /> : "Recover Password";

  return (
    <>
      <Seo title="Reset password" description="Request a password reset link for your EM account." />
      <div className="wrapper">
        <main className="row align-items-center justify-contents-between">
          <section className="col-lg-6 d-none d-lg-block d-flex flex-column align-items-center justify-content-center img-section">
            <div className="text-center login-img-box">
              <img src={loginImg} alt="Reset password illustration" className="w-75 my-5 login-img-box" />
            </div>
          </section>

          <section className="col-lg-6 d-flex align-items-center justify-content-center form-section">
            <div className="text-center header-div">
              <div>
                <img src={logoImg} alt="EM" />
                <h3 className="fw-bold">Forgot Password</h3>
                <p className="fw-bold">
                  Enter email address to recover password
                </p>
              </div>

              <div className="form-div">
                <form
                  onSubmit={handleSubmit(handleForgotPwd)}
                  className="d-flex flex-column gap-3 position-relative"
                >
                  <label htmlFor="reset-email" className="sr-only">Email</label>
                  <input
                    id="reset-email"
                    type="email"
                    className="rounded-2 ps-5"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <img
                    src={emailImg}
                    alt=""
                    aria-hidden="true"
                    className="email-input-img position-absolute"
                  />
                  <p className="text-danger fs-6 text-start fw-bold">
                    {errors.email?.message}
                  </p>

                  <button
                    className="btn btn-lg btn-primary rounded-pill fw-light"
                    disabled={isSubmitting}
                  >
                    {btnText}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ResetPassword;
