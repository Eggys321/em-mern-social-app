import loginImg from '../assets/login-img.svg';
import logoImg from '../assets/logo.svg';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import emailImg from '../assets/email-img.svg';
import passWordImg from '../assets/password-img.svg';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import { useForm } from "react-hook-form";
import {Loader} from "../utils/Loader";
import { signInSchema } from '../utils/ValidationSchema';
import { yupResolver } from "@hookform/resolvers/yup";
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';
import { post } from '../api/client';
import Seo from '../components/Seo';



const SignIn = () => {
  const [isReveal, setReveal] = useState(false);
  const [isCLicked,setIsClicked] = useState(false);
const navigate = useNavigate()

  function handleToggle() {
    !isReveal ? setReveal(true) : setReveal(false);
  }


  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm({
    resolver:yupResolver(signInSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const handleSignIn = async(data)=>{
    setIsClicked(true)

    try {
      const response = await post("/auth/login", data, { auth: false });
      toast.success(response.message)
      localStorage.setItem("clientToken",response.user.token)
      const decodedToken = jwtDecode(response.user.token);
      const userId = decodedToken.userId;
      localStorage.setItem("userId", userId);
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsClicked(false)
    }
  }
  const btnText = isCLicked ? <Loader/> : "Sign In";

  return (
    <>
      <Seo title="Sign in" description="Sign in to your EM account." />
      <div className='wrapper'>
        <main className='row align-items-center justify-contents-between'>
          <section className='col-lg-6 d-none d-lg-block d-flex flex-column align-items-center justify-content-center img-section'>
            <div className='text-center login-img-box'>
              <img src={loginImg} alt='Sign in illustration' className='w-75 my-5 login-img-box' />
            </div>
          </section>

          <section className='col-lg-6 d-flex align-items-center justify-content-center form-section'>
            <div className='text-center header-div'>
              <div>
                <img src={logoImg} alt='EM' />
                <h3 className='fw-bold'>Welcome to EM</h3>
                <p className='fw-bold'>Sign in to your account</p>
              </div>

              <div className='form-div'>
                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit(handleSignIn)}>
                    <div className="position-relative">
                    <label htmlFor="signin-email" className="sr-only">Email</label>
                    <input
                      id="signin-email"
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
                      <label htmlFor="signin-password" className="sr-only">Password</label>
                      <input
                        id="signin-password"
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
                  <div className='d-flex justify-content-between '>
                    {['checkbox'].map((type) => (
                      <div key={`default-${type}`} className='mb-2'>
                        <Form.Check
                          type={type}
                          id={`default-${type}`}
                          label={'Keep me signed in'}
                          className='fs-6'
                        />
                      </div>
                    ))}
                    <Link className='text-dark' to='/resetpassword'>
                      Forgot Password?
                    </Link>
                  </div>

                  <button className="btn btn-lg fw-light btn-primary rounded-pill" disabled={isSubmitting}>
                    {btnText}
                  </button>
                  <span className='d-flex gap-1 '>
                    <span className='fw-light'>
                      Dont have an account yet?
                    </span>
                    <Link
                      to='/signup'
                      className='text-decoration-none fw-bolder'
                    >
                      Sign Up
                    </Link>
                  </span>

                  <p className='fw-light'>
                    By signing in you accept our Privacy Policy, Terms &
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

export default SignIn;
