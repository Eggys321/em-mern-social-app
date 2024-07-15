import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateProfile = async (formData, token) => {
  const response = await fetch('https://em-mern-social-app.onrender.com/api/v1/users/update-profile', {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('clientToken');

  return useMutation(
    (formData) => updateProfile(formData, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bioProfile', token]);
      },
      // onSuccess: () => {
      //   queryClient.invalidateQueries('bioProfile');
      // },
    }
  );
};