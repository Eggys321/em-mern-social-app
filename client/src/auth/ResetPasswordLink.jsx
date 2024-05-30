import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link,useNavigate,useParams} from "react-router-dom";
import passWordImg from "../assets/password-img.svg";
import "../styles/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  {resetPwdLinkSchema} from '../utils/ValidationSchema';
import toast from "react-hot-toast";
import {Loader} from "../utils/Loader";


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

  console.log(errors);

  const onSubmit = async(data) => {
    // console.log(data)
    setIsClicked(true)
    try {
      
      const req = await fetch(`https://em-mern-social-app.onrender.com/api/v1/auth/resetpassword/${resetToken}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const res = await req.json();
      // console.log(res);
      if(!res.success){
        const errorData = await res;
        toast.error(errorData.message)
        setIsClicked(true)
      }
      if(res.success){
        toast.success(res.message)
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message);
      
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

  useEffect(() => {
    document.title = "Reset-password-link | page";
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
                <h3 className="fw-bold">Welcome back to EM</h3>
                <p className="fw-bold">Reset Password</p>
              </div>

              {/* form div */}
              <div className="form-div">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-3"
                >
                  {/* password */}
                  <div className="">
                    <div className="position-relative">
                      <input
                        type={isReveal ? "text" : "password"}
                        className="rounded-2 ps-5 w-100"
                        placeholder="Password"
                        {...register("password", { required: true })}
                      />
                      <img
                        src={passWordImg}
                        alt=""
                        className="pass-input-img position-absolute start-0 bottom-0 translate-middle-y ms-3"
                      />
                      {/* reveal password */}
                      <p
                        className="position-absolute end-0 bottom-0  sign-up-eye-img  me-2"
                        role="button"
                        onClick={handleToggle}
                      >
                        {isReveal ? <FiEye /> : <FiEyeOff />}
                      </p>
                    </div>
                    <p className="text-danger fs-6 text-start fw-bold">
                    {errors.password?.message}
                    </p>
                  </div>

                  {/* confirm password */}
                  <div className="">
                    <div className="position-relative">
                      <input
                        type={isReveal2 ? "text" : "password"}
                        className="rounded-2 ps-5 w-100"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true })}
                      />
                      <img
                        src={passWordImg}
                        alt=""
                        className="con-pass-input-img position-absolute start-0 bottom-0 translate-middle-y ms-3"
                      />
                      {/* reveal password */}
                      <p
                        className="position-absolute end-0 bottom-0 sign-up-eye-img-2  me-2"
                        role="button"
                        onClick={handleToggle2}
                      >
                        {isReveal2 ? <FiEye /> : <FiEyeOff />}
                      </p>
                    </div>
                    <p className="text-danger fs-6 text-start fw-bold">
                    {errors.confirmPassword?.message}
                    </p>
                  </div>

                  {/* button */}
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
