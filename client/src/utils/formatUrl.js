export const formatSocialUrl = (url) => {
  if (!url) return undefined;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
