import { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import profileImg from "../assets/profile-pic.svg";
import { useNavigate } from "react-router-dom";
import { get, patch } from "../api/client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [bioProfile, setBioProfile] = useState([]);
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [x, setX] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [isCLicked, setIsClicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(profileImg);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLine, setTimeLine] = useState([]);

  const token = localStorage.getItem("clientToken");
  const navigate = useNavigate();

  const getBioProfile = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await get("/users");
      setBioProfile(response?.user);
      setBio(response?.user?.bio || "");
      setLocation(response?.user?.location);
      setOccupation(response?.user?.occupation);
      setX(response?.user?.x);
      setLinkedIn(response?.user?.linkedIn);
      setAge(response?.user?.age || "");
      setGender(response?.user?.gender || "");
      setPreview(response?.user?.profilePhoto || profileImg);
    } catch (error) {
      console.error("Failed to load profile:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1000 * 1000) {
      toast.error("File with maximum size of 2MB is allowed");
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setIsClicked(true);

    try {
      const result = await patch("/users/update-profile", formData);
      if (result) {
        toast.success(result.message);
        await getBioProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(error.message);
    } finally {
      setIsClicked(false);
    }
  };

  const getTimeLine = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await get("/posts/timeline");
      setTimeLine(response?.posts || []);
    } catch (error) {
      console.error("Failed to load timeline:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  useEffect(() => {
    getTimeLine();
    getBioProfile();
  }, [getTimeLine, getBioProfile]);

  return (
    <UserContext.Provider
      value={{
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
        timeLine,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
