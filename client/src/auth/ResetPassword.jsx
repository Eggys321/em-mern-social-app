import { useState } from "react";
import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import { useEffect } from "react";
import emailImg from "../assets/email-img.svg";
import "../styles/ResetPassword.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../utils/ValidationSchema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader } from "../utils/Loader";

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
      const request = await fetch(
        "https://em-mern-social-app.onrender.com/api/v1/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const response = await request.json();
      console.log(response);
      if (!response.success) {
        toast.error(response.message);
        setIsClicked(true);
      }
      if (response.success) {
        toast.success(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsClicked(false);
    }
  };

  const btnText = isCLicked ? <Loader /> : "Recover Password";

  useEffect(() => {
    document.title = "Recover password | page";
  });
  return (
    <>
      <div className="wrapper">
        <main className="row align-items-center justify-contents-between">
          {/* img section */}
          <section className="col-lg-6 d-none d-lg-block d-flex flex-column align-items-center justify-content-center img-section">
            <div className="text-center login-img-box">
              <img src={loginImg} alt="" className="w-75 my-5 login-img-box" />
            </div>
          </section>

          {/* form-section */}
          <section className="col-lg-6 d-flex align-items-center justify-content-center form-section">
            <div className="text-center header-div">
              {/* header div */}
              <div>
                <img src={logoImg} alt="" />
                <h3 className="fw-bold">Forgot Password</h3>
                <p className="fw-bold">
                  Enter email address to recover password
                </p>
              </div>

              {/* form div */}
              <div className="form-div">
                <form
                  onSubmit={handleSubmit(handleForgotPwd)}
                  className="d-flex flex-column gap-3 position-relative"
                >
                  <input
                    type="email"
                    className="rounded-2 ps-5"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <img
                    src={emailImg}
                    alt=""
                    className="email-input-img position-absolute"
                  />
                  <p className="text-danger fs-6 text-start fw-bold">
                    {errors.email?.message}
                  </p>

                  {/* btn */}
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
