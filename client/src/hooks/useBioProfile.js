import { useQuery } from "@tanstack/react-query";
import { get } from "../api/client";

const fetchBioProfile = async ({ queryKey }) => {
  const token = queryKey[1];
  return get("/users", { auth: false, headers: { Authorization: `Bearer ${token}` } });
};

export const useBioProfile = (token) => {
  return useQuery({
    queryKey: ["bioProfile", token],
    queryFn: fetchBioProfile,
    enabled: Boolean(token),
    staleTime: 30_000,
    gcTime: 600_000,
    refetchOnWindowFocus: true,
  });
};
