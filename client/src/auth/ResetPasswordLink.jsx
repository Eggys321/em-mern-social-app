import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate,useParams} from "react-router-dom";
import passWordImg from "../assets/password-img.svg";
import "../styles/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  {resetPwdLinkSchema} from '../utils/ValidationSchema';
import toast from "react-hot-toast";
import {Loader} from "../utils/Loader";
import { apiFetch } from "../api/client";
import Seo from "../components/Seo";


const ResetPasswordLink = () => {
  const [isReveal, setReveal] = useState(false);
  const [isReveal2, setReveal2] = useState(false);
  const [isCLicked,setIsClicked] = useState(false);

  const { resetToken } = useParams();


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm({
    resolver:yupResolver(resetPwdLinkSchema),
    defaultValues:{
      password:"",
      confirmPassword:""
    }
  });

  const onSubmit = async(data) => {
    setIsClicked(true)
    try {
      const res = await apiFetch(`/auth/resetpassword/${resetToken}`, {
        method: "PUT",
        body: data,
        auth: false,
      });
      toast.success(res.message)
      navigate('/signin')
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsClicked(false)
    }
  };
const btnText = isCLicked ? <Loader/> : "Reset Password";
  function handleToggle() {
    !isReveal ? setReveal(true) : setReveal(false);
  }

  function handleToggle2() {
    !isReveal2 ? setReveal2(true) : setReveal2(false);
  }

  return (
    <>
      <Seo title="Set a new password" description="Choose a new password for your EM account." />
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
                <h3 className="fw-bold">Welcome back to EM</h3>
                <p className="fw-bold">Reset Password</p>
              </div>

              <div className="form-div">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-3"
                >
                  <div className="">
                    <div className="position-relative">
                      <label htmlFor="reset-link-password" className="sr-only">Password</label>
                      <input
                        id="reset-link-password"
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
                      <label htmlFor="reset-link-confirm-password" className="sr-only">Confirm password</label>
                      <input
                        id="reset-link-confirm-password"
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
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ResetPasswordLink;
