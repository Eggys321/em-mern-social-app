import { useEffect, useCallback, useState } from "react";
import homeImg from "../assets/home-img.svg";
import communityImg from "../assets/community-img.svg";
import profileImg from "../assets/profile-img.svg";
import searchImg from "../assets/search-img.svg";
import NavBag from "../components/NavBag";
import logoImg from "../assets/logo.svg";
import "../styles/Nav.css";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import ProfileSection from "../components/ProfileSection";
import EditProfileModal from "../components/EditProfileModal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
const Navbar = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [bagShow, SetBagShow] = useState(false);
  const [bioProfile, setBioProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();
  const getBioProfile = async () => {
    try {
      const request = await fetch("http://localhost:5782/api/v1/users", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await request.json();
      // console.log(response.user);
      setBioProfile(response.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  function handleDrop() {
    !bagShow ? SetBagShow(true) : SetBagShow(false);
  }

  const performSearch = useCallback(
    async (term) => {
      if (term) {
        try {
          const request = await fetch(
            `http://localhost:5782/api/v1/users/search?searchTerm=${term}`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await request.json();
          if (response.success) {
            setSearchResults(response.users);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.log(error.message);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    },
    [token]
  );
  const debouncedSearch = useCallback(
    debounce((term) => {
      performSearch(term);
    }, 3000),
    [performSearch]
  );
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  useEffect(() => {
    if (!token) {
      toast.error("unauthorized,sign in");
      navigate("/signin");
    }
    getBioProfile();
  }, []);
  return (
    <>
      <main className="d-flex justify-content-between align-items-center container nav-container">
        {/* search section */}
        <section className="d-flex gap-3 align-items-center search-div">
          <div className="logo-div d-none d-lg-block">
            <Link to="/">
              <img src={logoImg} alt="" />
            </Link>
          </div>
          <ProfileSection />

          <div className="position-relative">
            <input
              type="text"
              className="rounded-pill ps-5 search-box"
              placeholder="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <img
              src={searchImg}
              alt=""
              className="position-absolute img-fluid search-img"
            />
            <div>
              {searchTerm && (
                <div className="search-results position-absolute z-1 bg-secondary text-white border rounded w-100">
                  {searchResults.length ? (
                    searchResults.map((user) => (
                      <div key={user._id} className="search-result-item">
                        <Link
                          className="text-decoration-none text-white"
                          to={`/singleuserprofile/${user._id}`}
                        >
                          {user.userName}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* profile section */}

        <div className="d-none d-lg-block">
          <section className="d-flex gap-3 align-items-center position-relative">
            <div className="d-flex flex-column align-items-center">
              <Link to="/" className="text-decoration-none">
                <div>
                  <img src={homeImg} alt="" />
                </div>
                <span> Home</span>
              </Link>
            </div>
            <div className="">
              <Link className="text-decoration-none" to="/community">
                <div>
                  <div className="text-center">
                    <img src={communityImg} alt="" />
                  </div>

                  <span>Community</span>
                </div>
              </Link>
            </div>
            <div className="d-flex flex-column align-items-center ">
              <img
                src={bioProfile?.profilePhoto}
                alt=""
                className="profile-img p-1 "
                style={{ borderRadius: "5rem", height: "3rem", width: "4rem" }}
              />{" "}
              <span className="d-flex">
                Me
                <span
                  className="d-none d-lg-block"
                  role="button"
                  onClick={handleDrop}
                >
                  {" "}
                  {bagShow ? <GoChevronUp /> : <GoChevronDown />}
                </span>
              </span>
            </div>
            <div className="position-absolute nav-bag bg-light">
              {bagShow && <NavBag />}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Navbar;
