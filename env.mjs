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
  client: {},
  experimental__runtimeEnv: {},
});
