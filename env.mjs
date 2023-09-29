import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
    PAYLOAD_CONFIG_PATH: z
      .string()
      .min(1)
      .default("./payload/payload.config.ts"),
    PAYLOAD_CSS_PATH: z.string().default("./payload/styles.css"),
    PAYLOAD_PATH: z.string().default("./payload/payloadClient.ts"),
    PAYLOAD_ADMIN_ROUTE: z.string().default("/admin"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.preprocess((appUrl) => {
      if (appUrl) return appUrl;
      if (process.env.NEXT_PUBLIC_HOST && process.env.NEXT_PUBLIC_PORT)
        return `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    }, z.string().url()),
  },
  runtimeEnv: {
    MONGODB_URI: process.env.MONGODB_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_CONFIG_PATH: process.env.PAYLOAD_CONFIG_PATH,
    PAYLOAD_CSS_PATH: process.env.PAYLOAD_CSS_PATH,
    PAYLOAD_PATH: process.env.PAYLOAD_PATH,
    PAYLOAD_ADMIN_ROUTE: process.env.PAYLOAD_ADMIN_ROUTE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
process.env = { ...process.env, ...env };
