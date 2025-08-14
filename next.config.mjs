/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: [
      "credithaatimages.s3.ap-south-1.amazonaws.com",
      "chdocsusers.s3.ap-south-1.amazonaws.com",
      "a.krdt.be",
      "hicredit-loan.oss-ap-south-1.aliyuncs.com",
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@components"] = path.join(__dirname, "components");
    return config;
  },
};

export default nextConfig;
