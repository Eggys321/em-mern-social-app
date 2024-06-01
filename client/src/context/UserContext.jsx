import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import profileImg from '../assets/profile-pic.svg'
import { useNavigate } from "react-router-dom";


const UserContext = createContext();

export const  UserProvider = ({ children })=>{
  const [bioProfile, setBioProfile] = useState([]);
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [x, setX] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [isCLicked,setIsClicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(profileImg); 
  const [isLoading, setIsLoading] = useState(false);
  const [timeLine,setTimeLine] = useState([])
  
  
  
  
  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate()
// bioProfile Ftn
  const getBioProfile = async () => {
      
      try {
        setIsLoading(true);
        const request = await fetch("https://em-mern-social-app.onrender.com/api/v1/users", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const response = await request.json();
        // console.log(response.user);
        setBioProfile(response.user);
        setBio(response.user.bio || "");
        setLocation(response.user.location);
        setOccupation(response.user.occupation);
        setX(response.user.x);
        setLinkedIn(response.user.linkedIn);
        setAge(response.user.age || "") ;     
        setGender(response.user.gender || "");
        setPreview(response.user.profilePhoto || profileImg); 
    } catch (error) {
        console.log(error.message);
    }finally{
        setIsLoading(false);

    }
  };

  // file change ftn
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
// handlesubmit ftn for update ftn
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("location", location);
    formData.append("gender", gender);
    formData.append("occupation", occupation);
    formData.append("x", x);
    formData.append("linkedIn", linkedIn);
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }
    setIsClicked(true)

    try {
      const response = await fetch("https://em-mern-social-app.onrender.com/api/v1/users/update-profile", {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      // console.log(result);
      if(result){
        setIsClicked(true)
        toast.success(result.message)
          // Fetch updated profile information
      const profileRequest = await fetch(
        "https://em-mern-social-app.onrender.com/api/v1/users",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const profileResponse = await profileRequest.json();
      
      // Update bioProfile state with updated profile information
      setBioProfile(profileResponse.user);
      }
    } catch (error) {
      console.error("Error updating profile:", error);

    }finally{
      setIsClicked(false)
    }
  };

  // timeline
  const getTimeLine = async () => {
      
    try {
      setIsLoading(true);
      const request = await fetch("https://em-mern-social-app.onrender.com/api/v1/posts/timeline", {
          headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });
      const response = await request.json();
      // console.log(response.posts);
      setTimeLine(response?.posts)
      
  } catch (error) {
      console.log(error.message);
  }finally{
      setIsLoading(false);

  }
};
//logout
const logOut = ()=>{
  localStorage.removeItem("clientToken")
  navigate("/signin")
}

  useEffect(() => {
    getTimeLine()
    getBioProfile();
  }, []);

    return < UserContext.Provider value={{
      logOut,
        bio,
        getTimeLine,
        setTimeLine,
        getBioProfile,
        handleSubmit,
        handleFileChange,
        bioProfile,
        setBio,
        setBioProfile,
        age,
        setAge,
        location,
        setLocation,
        gender,
        setGender,
        occupation,
        setOccupation,
        x,
        setX,
        linkedIn,
        setLinkedIn,
        isCLicked,
        setIsClicked,
        selectedFile,
        setSelectedFile,
        preview,
        setPreview,
        isLoading,
        setIsLoading,
        timeLine
    }}>
    {children}
    </UserContext.Provider>
}

export default UserContext;