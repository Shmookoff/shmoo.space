import { withPayload } from "@payloadcms/next-payload";
import path from "path";
import { URL, fileURLToPath } from "url";
import { env } from "./env.mjs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const appUrl = new URL(env.NEXT_PUBLIC_APP_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: appUrl.protocol,
        hostname: appUrl.hostname,
        port: appUrl.port,
        pathname: "/api/uploads/*/*",
      },
    ],
  },
};

export default withPayload(nextConfig, {
  // The second argument to `withPayload`
  // allows you to specify paths to your Payload dependencies
  // and configure the admin route to your Payload CMS.

  // Point to your Payload config (Required)
  configPath: path.resolve(__dirname, env.PAYLOAD_CONFIG_PATH),

  // Point to custom Payload CSS (optional)
  cssPath: path.resolve(__dirname, env.PAYLOAD_CSS_PATH),

  // Point to your exported, initialized Payload instance (optional, default shown below`)
  payloadPath: path.resolve(process.cwd(), env.PAYLOAD_PATH),

  // Set a custom Payload admin route (optional, default is `/admin`)
  // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
  adminRoute: env.PAYLOAD_ADMIN_ROUTE,
});
