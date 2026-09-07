import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import userImg from "../assets/user-name.svg";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link,useNavigate} from "react-router-dom";
import emailImg from "../assets/email-img.svg";
import passWordImg from "../assets/password-img.svg";
import "../styles/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  {regFormSchema} from '../utils/ValidationSchema';
import toast from "react-hot-toast";
import {Loader} from "../utils/Loader";
import { post } from "../api/client";
import Seo from "../components/Seo";


const SignUp = () => {
  const [isReveal, setReveal] = useState(false);
  const [isReveal2, setReveal2] = useState(false);
  const [isCLicked,setIsClicked] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm({
    resolver:yupResolver(regFormSchema),
    defaultValues:{
      userName:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  });

  const onSubmit = async(data) => {
    setIsClicked(true)
    try {
      const res = await post("/auth/register", data, { auth: false });
      toast.success(res.message)
      navigate('/signin')
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsClicked(false)
    }
  };
const btnText = isCLicked ? <Loader/> : "Sign Up";
  function handleToggle() {
    !isReveal ? setReveal(true) : setReveal(false);
  }

  function handleToggle2() {
    !isReveal2 ? setReveal2(true) : setReveal2(false);
  }

  return (
    <>
      <Seo title="Sign up" description="Create your EM account." />
      <div className="wrapper">
        <main className="row align-items-center justify-contents-between">
          <section className="col-lg-6 d-none d-lg-block d-flex flex-column align-items-center justify-content-center img-section">
            <div className="text-center login-img-box">
              <img src={loginImg} alt="Sign up illustration" className="w-75 my-5 login-img-box" />
            </div>
          </section>

          <section className="col-lg-6 d-flex align-items-center justify-content-center form-section">
            <div className="text-center header-div">
              <div>
                <img src={logoImg} alt="EM" />
                <h3 className="fw-bold">Welcome back to EM</h3>
                <p className="fw-bold">Sign up for free</p>
              </div>

              <div className="form-div">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-3"
                >
                  <div className="position-relative">
                    <label htmlFor="signup-email" className="sr-only">Email</label>
                    <input
                      id="signup-email"
                      type="email"
                      className="rounded-2 ps-5 w-100"
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
                  </div>
                  <div>
                    <div className="position-relative">
                      <label htmlFor="signup-username" className="sr-only">Username</label>
                      <input
                        id="signup-username"
                        type="text"
                        className="rounded-2 ps-5 w-100"
                        placeholder="Username"
                        {...register("userName", { required: true })}
                      />
                      <img
                        src={userImg}
                        alt=""
                        aria-hidden="true"
                        className="user-input-img position-absolute  start-0 bottom-0 translate-middle-y ms-3"
                      />
                    </div>
                       <p className="text-danger fs-6 text-start fw-bold">
                    {errors.userName?.message}
                    </p>
                  </div>

                  <div className="">
                    <div className="position-relative">
                      <label htmlFor="signup-password" className="sr-only">Password</label>
                      <input
                        id="signup-password"
                        type={isReveal ? "text" : "password"}
                        className="rounded-2 ps-5 w-100"
                        placeholder="Password"
                        {...register("password", { required: true })}
                      />
                      <img
                        src={passWordImg}
                        alt=""
                        aria-hidden="true"
                        className="pass-input-img position-absolute start-0 bottom-0 translate-middle-y ms-3"
                      />
                      <button
                        type="button"
                        className="position-absolute end-0 bottom-0 sign-up-eye-img me-2 btn-icon"
                        aria-label={isReveal ? "Hide password" : "Show password"}
                        onClick={handleToggle}
                      >
                        {isReveal ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                    <p className="text-danger fs-6 text-start fw-bold">
                    {errors.password?.message}
                    </p>
                  </div>

                  <div className="">
                    <div className="position-relative">
                      <label htmlFor="signup-confirm-password" className="sr-only">Confirm password</label>
                      <input
                        id="signup-confirm-password"
                        type={isReveal2 ? "text" : "password"}
                        className="rounded-2 ps-5 w-100"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true })}
                      />
                      <img
                        src={passWordImg}
                        alt=""
                        aria-hidden="true"
                        className="con-pass-input-img position-absolute start-0 bottom-0 translate-middle-y ms-3"
                      />
                      <button
                        type="button"
                        className="position-absolute end-0 bottom-0 sign-up-eye-img-2 me-2 btn-icon"
                        aria-label={isReveal2 ? "Hide password" : "Show password"}
                        onClick={handleToggle2}
                      >
                        {isReveal2 ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                    <p className="text-danger fs-6 text-start fw-bold">
                    {errors.confirmPassword?.message}
                    </p>
                  </div>

                  <button className="btn btn-lg fw-light btn-primary rounded-pill" disabled={isSubmitting}>
                    {btnText}
                  </button>

                  <span className="d-flex gap-1 ">
                    <span className="fw-light"> Already have an account?</span>
                    <Link
                      to="/signin"
                      className="text-decoration-none fw-bolder"
                    >
                      Sign in
                    </Link>
                  </span>
                  <p className="fw-light">
                    By signing up you accept our Privacy Policy, Terms &
                    Licensing Agreement. Protected by reCAPTCHA. Google Privacy
                    Policy & Terms apply.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SignUp;
