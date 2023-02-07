/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webp: {
  //   preset: "default",
  //   quality: 100,
  // },
  images: {
    domains: [
      "localhost",
      "merchantapi.elaundry.co.in",
      "callapi.hrmsomra.com",
      "sms.tyrodigital.com",
      "flagcdn.com",
      "upload.wikimedia.org"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // i18n: {
  //   locales: ["en", "it"],
  //   defaultLocale: "en",
  // },
};

module.exports = nextConfig;
