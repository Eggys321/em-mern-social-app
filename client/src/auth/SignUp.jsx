import loginImg from "../assets/login-img.svg";
import logoImg from "../assets/logo.svg";
import userImg from "../assets/user-name.svg";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link,useNavigate} from "react-router-dom";
import emailImg from "../assets/email-img.svg";
import passWordImg from "../assets/password-img.svg";
// import { Link } from 'react-router-dom';
import "../styles/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  {regFormSchema} from '../utils/ValidationSchema';
import toast from "react-hot-toast";
import Loader from "../utils/Loader";


const SignUp = () => {
  const [isReveal, setReveal] = useState(false);
  const [isReveal2, setReveal2] = useState(false);
  const [serverError,setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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

  console.log(errors);

  const onSubmit = async(data) => {
    // console.log(data)
    setIsClicked(true)
    try {
      setSuccessMsg('');
      setServerError("")
      const req = await fetch("https://em-mern-social-app.onrender.com/api/v1/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const res = await req.json();
      // console.log(res);
      if(!res.success){
        const errorData = await res;
        setServerError(errorData.message)
        toast.error(errorData.message)
        setIsClicked(true)
      }
      if(res.success){
        setSuccessMsg(res.message)
        toast.success(res.message)
        navigate('/signin')
      }
    } catch (error) {
      console.log(error.message);
      
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

  useEffect(() => {
    document.title = "Signup | page";
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
                <p className="fw-bold">Sign up for free</p>
              </div>

              {/* form div */}
              <div className="form-div">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-3"
                >
                  {/* email */}
                  <div className="position-relative">
                    <input
                      type="email"
                      className="rounded-2 ps-5 w-100"
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
                  </div>
                  {/* username */}
                  <div>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="rounded-2 ps-5 w-100"
                        placeholder="Username"
                        {...register("userName", { required: true })}
                      />
                      <img
                        src={userImg}
                        alt=""
                        className="user-input-img position-absolute  start-0 bottom-0 translate-middle-y ms-3"
                      />
                    </div>
                       <p className="text-danger fs-6 text-start fw-bold">
                    {errors.userName?.message}
                    </p>
                    {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
                  </div>

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
                    {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
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
                    {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
                  </div>

                  {/* {serverError && <p className="text-danger"> {serverError} </p> }
                  {successMsg && <p className="text-success"> {successMsg} </p> } */}

                  {/* button */}
                  <button className="btn btn-lg fw-light btn-primary rounded-pill" disabled={isSubmitting}>
                    {btnText}
                  </button>

                  {/* have account ? */}
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
