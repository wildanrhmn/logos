import zod from "zod";

const envSchema = zod.object({
  MONGO_URI: zod.string().min(1),
  AUTH_SECRET: zod.string().min(1),
  NEXT_PUBLIC_API_URL: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
