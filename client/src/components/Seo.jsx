import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, noIndex = false }) => (
  <Helmet>
    <title>{title ? `${title} | EM` : "EM"}</title>
    {description && <meta name="description" content={description} />}
    <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
    {title && <meta property="og:title" content={`${title} | EM`} />}
    {description && <meta property="og:description" content={description} />}
  </Helmet>
);

export default Seo;
