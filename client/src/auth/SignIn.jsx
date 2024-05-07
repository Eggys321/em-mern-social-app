import loginImg from '../assets/login-img.svg';
import logoImg from '../assets/logo.svg';
import { useState } from 'react';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
import emailImg from '../assets/email-img.svg';
import passWordImg from '../assets/password-img.svg';
import { Link } from 'react-router-dom';
import '../styles/SignIn.css';

const SignIn = () => {
  const [isReveal, setReveal] = useState(false);

  function handleToggle() {
    !isReveal ? setReveal(true) : setReveal(false);
  }

  useEffect(() => {
    document.title = 'Login | page';
  });
  return (
    <>
      <div className='wrapper'>
        <main className='row align-items-center justify-contents-between'>
          {/* img section */}
          <section className='col-lg-6 d-none d-lg-block d-flex flex-column align-items-center justify-content-center img-section'>
            <div className='text-center login-img-box'>
              <img src={loginImg} alt='' className='w-75 my-5 login-img-box' />
            </div>
          </section>

          {/* form-section */}
          <section className='col-lg-6 d-flex align-items-center justify-content-center form-section'>
            <div className='text-center header-div'>
              {/* header div */}
              <div>
                <img src={logoImg} alt='' />
                <h3 className='fw-bold'>Welcome to EM</h3>
                <p className='fw-bold'>Sign in to your account</p>
              </div>

              {/* form div */}
              <div className='form-div'>
                <form className='d-flex flex-column gap-3'>
                    {/* email */}
                    <div className="position-relative">
                    <input
                      type="email"
                      className="rounded-2 ps-5 w-100"
                      placeholder="Email"
                    />
                    <img
                      src={emailImg}
                      alt=""
                      className="email-input-img position-absolute"
                    />
                    {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
                  </div>

                  {/* password */}
                  <div>
                    <div className="position-relative">
                      <input
                        type={isReveal ? "text" : "password"}
                        className="rounded-2 ps-5 w-100"
                        placeholder="Password"
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
                    {/* <p className='text-start mt-2'>Lorem ipsum dolor sit amet consectetur.</p> */}
                  </div>
                  {/* checkbox */}
                  <div className='d-flex justify-content-between '>
                    {['checkbox'].map((type) => (
                      <div key={`default-${type}`} className='mb-2'>
                        <Form.Check // prettier-ignore
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

                  {/* btn */}
                  <Link className='btn btn-lg btn-primary rounded-pill fw-light' to='/'>
                    Sign in
                  </Link>
                  {/* have an acc ? */}
                  <span className='d-flex gap-1 '>
                    <span className='fw-light'>
                      {' '}
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
