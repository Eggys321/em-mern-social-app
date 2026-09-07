import locationImg from "../assets/location.svg";
import realtorImg from "../assets/realtor.svg";
import linkedinImg from "../assets/linkedin.svg";
import twitterImg from "../assets/twitter.svg";
import toast from "react-hot-toast";
import { useBioProfile } from "../hooks/useBioProfile";
import { formatSocialUrl } from "../utils/formatUrl";
import { SpinnerLoader } from "../utils/Loader";

const Bio = () => {
  const token = localStorage.getItem("clientToken");
  const { data, error, isLoading } = useBioProfile(token);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-4" role="status" aria-label="Loading your profile">
        <SpinnerLoader />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <p className="text-danger p-2 mb-0">Couldn&apos;t load your profile. Please try again.</p>;
  }

  const bioProfile = data?.user;

  return (
    <main>
      <div>
        {bioProfile && (
          <>
            <div className="d-flex align-items-center gap-2">
              <img
                loading="lazy"
                src={bioProfile?.profilePhoto}
                alt={
                  bioProfile?.userName
                    ? `${bioProfile.userName}'s profile photo`
                    : "Profile photo"
                }
                className="avatar avatar-lg"
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
                <img src={locationImg} alt="" aria-hidden="true" />
                <span>{bioProfile?.location}</span>
              </div>
              <div className="d-flex align-items-center mt-2 gap-2">
                <img src={realtorImg} alt="" aria-hidden="true" />
                <span>{bioProfile?.occupation}</span>
              </div>
            </div>
            <hr />
            <div>
              <h4>Socials</h4>
              <div className="d-flex align-items-center gap-2">
                <a
                  href={formatSocialUrl(bioProfile?.x)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterImg} alt="" aria-hidden="true" />
                </a>
                <span>{bioProfile?.x}</span>
              </div>
              <div className="d-flex align-items-center mt-2 gap-2 ">
                <a
                  href={formatSocialUrl(bioProfile?.linkedIn)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinImg} alt="" aria-hidden="true" />
                </a>
                <span className="text-break">{bioProfile?.linkedIn}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Bio;
