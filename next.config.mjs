import { env } from "./env.mjs";
import path from "path";
import { withPayload } from "@payloadcms/next-payload";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {};

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
