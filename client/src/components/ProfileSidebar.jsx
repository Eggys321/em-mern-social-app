import locationImg from "../assets/location.svg";
import realtorImg from "../assets/realtor.svg";
import linkedinImg from "../assets/linkedin.svg";
import twitterImg from "../assets/twitter.svg";
import followersImg from "../assets/followers.svg";
import likesImg from "../assets/likes.svg";
import followingImg from "../assets/following.svg";
import { formatSocialUrl } from "../utils/formatUrl";

const ProfileSidebar = ({ data, onShowFollowers, onShowFollowing }) => (
  <div className="sticky-div-fp">
    <div className="d-flex align-items-center gap-2">
      <img
        src={data?.profilePhoto}
        alt={data?.userName ? `${data.userName}'s profile photo` : "Profile photo"}
        className="avatar avatar-lg"
      />
      <div className="d-flex flex-column">
        <span>{data?.userName}</span>
      </div>
    </div>
    <hr />

    <div>
      <h4>Bio</h4>
      <p>{data?.bio}</p>
    </div>
    <hr />

    <div>
      <h4>Activities</h4>
      <div className="d-flex align-items-center gap-2">
        <img src={followersImg} alt="" aria-hidden="true" />
        <div className="d-flex justify-content-between w-100">
          <span>Follower(s)</span>
          <button
            type="button"
            className="btn btn-link text-decoration-underline text-secondary p-0"
            onClick={onShowFollowers}
          >
            {data?.followers?.length ?? 0}
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2 gap-2">
        <img src={followingImg} alt="" aria-hidden="true" />
        <div className="d-flex justify-content-between w-100">
          <span>Following</span>
          <button
            type="button"
            className="btn btn-link text-decoration-underline text-secondary p-0"
            onClick={onShowFollowing}
          >
            {data?.following?.length ?? 0}
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2 gap-2">
        <img src={likesImg} alt="" aria-hidden="true" /> <span>Likes</span>
      </div>
    </div>
    <hr />

    <div>
      <h4>Info</h4>
      <div className="d-flex align-items-center gap-2">
        <img src={locationImg} alt="" aria-hidden="true" />
        <span>{data?.location}</span>
      </div>
      <div className="d-flex align-items-center mt-2 gap-2">
        <img src={realtorImg} alt="" aria-hidden="true" />
        <span>{data?.occupation}</span>
      </div>
    </div>
    <hr />

    <div>
      <h4>Socials</h4>
      <div className="d-flex align-items-center gap-2">
        <a
          href={formatSocialUrl(data?.x)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter) profile"
        >
          <img src={twitterImg} alt="" aria-hidden="true" />
        </a>
        <span>{data?.x}</span>
      </div>
      <div className="d-flex align-items-center mt-2 gap-2">
        <a
          href={formatSocialUrl(data?.linkedIn)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src={linkedinImg} alt="" aria-hidden="true" />
        </a>
        <span className="text-break">{data?.linkedIn}</span>
      </div>
    </div>
  </div>
);

export default ProfileSidebar;
