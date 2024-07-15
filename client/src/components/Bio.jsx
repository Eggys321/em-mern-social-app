// import React, { useContext } from "react";
// import { useState, useEffect } from "react";
// import locationImg from "../assets/location.svg";
// import realtorImg from "../assets/realtor.svg";
// import linkedinImg from "../assets/linkedin.svg";
// import twitterImg from "../assets/twitter.svg";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useBioProfile } from "../hooks/useBioProfile";
// import { SpinnerLoader } from "../utils/Loader";
// import UserContext from "../context/UserContext";

// const Bio = () => {
//   // const [bioProfile, setBioProfile] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const {getBioProfile,bioProfile,isLoading, setIsLoading} = useContext(UserContext)

//   const token = localStorage.getItem("clientToken");
//   const navigate = useNavigate();

//   const { handleSubmit } = useContext(UserContext);

//   const { data, error, isLoading } = useBioProfile(token);

//   // const getBioProfile = async () => {
//   //   try {
//   //     // setIsLoading(true);
//   //     const request = await fetch(
//   //       "https://em-mern-social-app.onrender.com/api/v1/users",
//   //       {
//   //         headers: {
//   //           "Content-type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     const response = await request.json();
//   //     // console.log(response.user);
//   //     setBioProfile(response.user);
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   } finally {
//   //     // setIsLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     if (!token) {
//       toast.error("unauthorized,sign in");
//       navigate("/signin");
//     }
//     // getBioProfile();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) {
//     toast.error(error.message);
//     return <div>Error: {error.message}</div>;
//   }

//   const bioProfile = data?.user;

//   // Function to ensure the URL is properly formed
//   const formatUrl = (url) => {
//     if (!url) return '';
//     return url.startsWith('http') ? url : `https://${url}`;
//   };
//   return (
//     <>
//       <main>
//         {/* profile col */}

//         <div>
//           {/* <>
//               <div className="d-flex align-items-center gap-2">
//                 <img
//                 loading="lazy"
//                   src={bioProfile?.profilePhoto}
//                   alt=""
//                   className="profile-img w-25 "
//                   style={{ borderRadius: "100%", height: "6rem" }}
//                 />
//                 <div className="d-flex flex-column ">
//                   <span className=""> {bioProfile?.userName} </span>
//                   <span className="">
//                     {bioProfile?.followers?.length} followers(s)
//                   </span>
//                 </div>
//               </div>

//               <hr />

//               <div>
//                 <h4>Bio</h4>
//                 <p>{bioProfile?.bio}</p>
//               </div>
//               <hr />

//               <div>
//                 <h4>Info</h4>
//                 <div className="d-flex align-items-center gap-2">
//                   <img src={locationImg} alt="" />{" "}
//                   <span> {bioProfile?.location} </span>
//                 </div>
//                 <div className="d-flex align-items-center mt-2 gap-2">
//                   <img src={realtorImg} alt="" />{" "}
//                   <span>{bioProfile?.occupation} </span>
//                 </div>
//               </div>
//               <hr />
//               <div>
//                 <h4>Socials</h4>
//                 <div className="d-flex align-items-center gap-2">
//                   <a href="http://" target="_blank" rel="">
//                     <img src={twitterImg} alt="" />
//                   </a>{" "}
//                   <span>{bioProfile?.x} </span>
//                 </div>
//                 <div className="d-flex align-items-center mt-2 gap-2">
//                   <a href="" target="_blank" rel="">
//                     <img src={linkedinImg} alt="" />
//                   </a>{" "}
//                   <a href={bioProfile?.linkedIn} target="_blank" rel="">
//                     {bioProfile?.linkedIn}
//                   </a>
//                 </div>
//               </div>
//               <div>
//                 <hr />
//                 <h3>Sponsored Ads</h3>
//                 <p>
//                   Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//                   Omnis, explicabo.
//                 </p>
//               </div>
//             </>
//           } */}

//           <div>
//             {bioProfile && (
//               <>
//                 <div className="d-flex align-items-center gap-2">
//                   <img
//                     loading="lazy"
//                     src={bioProfile?.profilePhoto}
//                     alt=""
//                     className="profile-img w-25"
//                     style={{ borderRadius: "100%", height: "6rem" }}
//                   />
//                   <div className="d-flex flex-column">
//                     <span className="">{bioProfile?.userName}</span>
//                     <span className="">
//                       {bioProfile?.followers?.length} follower(s)
//                     </span>
//                   </div>
//                 </div>
//                 <hr />
//                 <div>
//                   <h4>Bio</h4>
//                   <p>{bioProfile?.bio}</p>
//                 </div>
//                 <hr />
//                 <div>
//                   <h4>Info</h4>
//                   <div className="d-flex align-items-center gap-2">
//                     <img src={locationImg} alt="" />
//                     <span>{bioProfile?.location}</span>
//                   </div>
//                   <div className="d-flex align-items-center mt-2 gap-2">
//                     <img src={realtorImg} alt="" />
//                     <span>{bioProfile?.occupation}</span>
//                   </div>
//                 </div>
//                 <hr />
//                 <div>
//                   <h4>Socials</h4>
//                   <div className="d-flex align-items-center gap-2">
//                     <a
//                       href={bioProfile?.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={twitterImg} alt="" />
//                     </a>
//                     <span>{bioProfile?.x}</span>
//                   </div>
//                   <div className="d-flex align-items-center mt-2 gap-2">
//                     <a
//                       href={formatUrl(bioProfile?.linkedIn)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={linkedinImg} alt="" />
//                     </a>
//                     <span>{bioProfile?.linkedIn}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <hr />
//                   <h3>Sponsored Ads</h3>
//                   <p>
//                     Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//                     Omnis, explicabo.
//                   </p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Bio;

import React, { useContext, useEffect } from "react";
import locationImg from "../assets/location.svg";
import realtorImg from "../assets/realtor.svg";
import linkedinImg from "../assets/linkedin.svg";
import twitterImg from "../assets/twitter.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBioProfile } from "../hooks/useBioProfile";
import UserContext from "../context/UserContext";

const Bio = () => {
  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();

  const { handleSubmit } = useContext(UserContext);

  const { data, error, isLoading } = useBioProfile(token);

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized, please sign in");
      navigate("/signin");
    }
  }, [token, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error(error.message);
    return <div>Error: {error.message}</div>;
  }

  const bioProfile = data?.user;

  const formatUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <main>
      <div>
        {bioProfile && (
          <>
            <div className="d-flex align-items-center gap-2">
              <img
                loading="lazy"
                src={bioProfile?.profilePhoto}
                alt=""
                className="profile-img w-25"
                style={{ borderRadius: "100%", height: "6rem" }}
              />
              <div className="d-flex flex-column">
                <span>{bioProfile?.userName}</span>
                <span>{bioProfile?.followers?.length} follower(s)</span>
              </div>
            </div>
            <hr />
            <div>
              <h4>Bio</h4>
              <p>{bioProfile?.bio}</p>
            </div>
            <hr />
            <div>
              <h4>Info</h4>
              <div className="d-flex align-items-center gap-2">
                <img src={locationImg} alt="" />
                <span>{bioProfile?.location}</span>
              </div>
              <div className="d-flex align-items-center mt-2 gap-2">
                <img src={realtorImg} alt="" />
                <span>{bioProfile?.occupation}</span>
              </div>
            </div>
            <hr />
            <div>
              <h4>Socials</h4>
              <div className="d-flex align-items-center gap-2">
                <a
                  href={bioProfile?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterImg} alt="" />
                </a>
                <span>{bioProfile?.x}</span>
              </div>
              <div className="d-flex align-items-center mt-2 gap-2 ">
                <a
                  href={formatUrl(bioProfile?.linkedIn)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinImg} alt="" />
                </a>
                <span className="text-break">{bioProfile?.linkedIn}</span>
              </div>
            </div>
            <div className="">
              <hr />
              <h3>Sponsored Ads</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Bio;

