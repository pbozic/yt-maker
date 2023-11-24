/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'yt-organize.s3.tebi.io'
          },
        ],
    },
    videos: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'yt-organize.s3.tebi.io'
          },
        ],
    },
    audio: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'yt-organize.s3.tebi.io'
          },
        ],
    },
};

export default config;
