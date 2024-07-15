import { useQuery } from "@tanstack/react-query";

const fetchBioProfile = async ({ queryKey }) => {
  const token = queryKey[1];
  const response = await fetch(
    "https://em-mern-social-app.onrender.com/api/v1/users",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  // console.log('API Response:', data);
  return data;
};

export const useBioProfile = (token) => {
  return useQuery({
    queryKey: ["bioProfile", token],
    queryFn: fetchBioProfile,
    staleTime: 30000, // 30 seconds
    cacheTime: 600000, // 10 minutes
    refetchOnWindowFocus: true,
    // queryKey: ["bioProfile", token],
    // queryFn: fetchBioProfile,
    // staleTime: Infinity,
    // cacheTime: Infinity,
  });
};