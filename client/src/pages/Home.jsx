import { useState } from 'react';
import NavSection from '../components/NavSection';
import Navbar from '../layouts/Navbar';
import profileImg from '../assets/profile-img.svg';
import locationImg from '../assets/location.svg';
import realtorImg from '../assets/realtor.svg';
import linkedinImg from '../assets/linkedin.svg';
import twitterImg from '../assets/twitter.svg';
import '../styles/Home.css';
import Post from '../components/Post';
import { people } from '../db';
import commentImg from '../assets/comment-image.svg';
import likeImg from '../assets/like-img.svg';
import shareImg from '../assets/share-img.svg';
import CommentModal from '../components/ComentModal';
const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  console.log(people);

  return (
    <>
      {/* nav */}
      <Navbar />

      {/* main content */}
      <div className='home-wrapper'>
        <div className='container'>
          <main className=' row home-main gap-2 pt-3'>
            {/* profile col */}
            <section className='vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section '>
              {/* profile div */}
              <div className='d-flex align-items-center gap-2'>
                <img src={profileImg} alt='' className='profile-img' />
                <div className='d-flex flex-column '>
                  <span className=''>John Doe</span>
                  <span className=''>0 friends</span>
                </div>
              </div>
              <hr />

              {/* bio div */}
              <div>
                <h4>Bio</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Mi nec turpis
                  vulputate sed. Tellus quisque pharetra facilisi nisl nisi
                  consectetur. Sed in nisi convallis vitae tortor rhoncus.
                </p>
              </div>
              <hr />

              {/* information */}
              <div>
                <h4>Info</h4>
                <div className='d-flex align-items-center gap-2'>
                  <img src={locationImg} alt='' /> <span>Location</span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <img src={realtorImg} alt='' /> <span>Realtor</span>
                </div>
              </div>
              <hr />
              {/* socials */}
              <div>
                <h4>Socials</h4>
                <div className='d-flex align-items-center gap-2'>
                  <a href='http://' target='_blank' rel=''>
                    <img src={twitterImg} alt='' />
                  </a>{' '}
                  <span>Twitter</span>
                </div>
                <div className='d-flex align-items-center mt-2 gap-2'>
                  <a href='http://' target='_blank' rel=''>
                    <img src={linkedinImg} alt='' />
                  </a>{' '}
                  <span>Linkedin</span>
                </div>
              </div>
              <div>
                <hr />
                <h3>Sponsored Ads</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, explicabo.</p>
              </div>
            </section>

            {/* news-field col */}

            <section className='col-lg'>
              {/* top div */}
              <div className='p-2 top-news-field rounded-2 mb-2 border'>
                {/*  */}
                <div className='d-flex gap-2 align-items-center'>
                  <img src={profileImg} alt='' />
                  <input
                    type='text'
                    className='rounded-pill ps-2 post-input w-100'
                    placeholder='What do you want to ask or share?'
                  />
                </div>

                {/*  */}
                <div className=' d-flex align-items-center justify-content-between mt-2'>
                  <Post />
                  <button className='btn btn-sm btn-primary text-light px-4 rounded-pill'>
                    {' '}
                    post
                  </button>
                </div>
              </div>

              <div>
              <CommentModal show={modalShow} onHide={() => setModalShow(false)} />
                {people.map((person) => {
                  const { id, name, time, post, profileImg, postImg, follow } =
                    person;
                  return (
                    <div
                      key={id}
                      className='p-2 mb-3 rounded-2 scroll-page'
                    >
                      {/* top div */}
                      <div className='d-flex justify-content-between align-items-center '>
                        {/* img and time */}
                        <div className='d-flex gap-2 align-items-center'>
                          <img src={profileImg} alt='' className='' />
                          <span className='d-flex flex-column justify-content-center '>
                            <h5 className='pt-3'>{name}</h5>
                            <p>{time}</p>
                          </span>
                        </div>

                        {/* btn-div */}
                        <div>
                          <button className='btn btn-white btn-sm rounded-pill border px-2'>
                            {follow}
                          </button>
                        </div>
                      </div>

                      {/* post */}
                      <p>{post}</p>

                      {/* post-img */}
                      <img src={postImg} className='w-100' alt='' />

                      {/* reactions */}
                      <main className='d-flex pt-2 justify-content-between align-items-center'>
                        {/* like and comment */}

                        <div className='d-flex gap-2'>
                          <img src={likeImg} alt='' role='button' />
                          <div show={modalShow} onClick={() => setModalShow(true)}>

                          <img src={commentImg} alt=''  role='button'/>
                          </div>
                          </div>
      
                          {/* share */}
                          <div>
                            <img src={shareImg} alt=''  role='button' />
                          </div>
                      </main>
                    </div>
                  );
                })}
              </div>

              {/* data base components */}
              {/* <div className=' rounded-2 '>
                
                {people.map((person) => {
                  const { id, name, time, post, profileImg, postImg } = person;
                  <div key={id} >
                    <img src={profileImg} alt='' />
                    <span className='fw-bold'>{name}</span>
                    <span className='fs-5'>{time}</span>
                    <p>{post}</p>
                    <img src={postImg} alt='' />
                  </div>;
                })}
              </div> */}
            </section>
          </main>
        </div>
      </div>
      {/* fixed section */}
      <NavSection />
    </>
  );
};

export default Home;
