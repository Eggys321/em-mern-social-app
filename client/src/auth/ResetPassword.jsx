import loginImg from '../assets/login-img.svg';
import logoImg from '../assets/logo.svg';
import { useEffect } from 'react';
import emailImg from '../assets/email-img.svg';
import '../styles/ResetPassword.css';

const ResetPassword = () => {

  useEffect(() => {
    document.title = 'Recover password | page';
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
                <h3 className='fw-bold'>Forgot Password</h3>
                <p className='fw-bold'>Enter email address to recover password</p>
              </div>

              {/* form div */}
              <div className='form-div'>
                <form className='d-flex flex-column gap-3 position-relative'>
                  <input
                    type='email'
                    className='rounded-2 ps-5'
                    placeholder='Email'
                  />
                  <img
                    src={emailImg}
                    alt=''
                    className='email-input-img position-absolute'
                  />
                  {/* <p className='text-start'>Lorem ipsum dolor sit amet consectetur.</p> */}

                  {/* btn */}
                  <button className='btn btn-lg btn-primary rounded-pill fw-light'>
                    Recover Password
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
