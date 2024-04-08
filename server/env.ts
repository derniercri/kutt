import * as dotenv from "dotenv";
import { cleanEnv, num, str, bool, url, EnvMissingError } from "envalid";
import reporter from "envalid/src/reporter";

dotenv.config();

const env = cleanEnv(process.env, {
  ADMIN_EMAILS: str({ default: "" }),
  CONTACT_EMAIL: str({ default: "" }),
  CUSTOM_DOMAIN_USE_HTTPS: bool({ default: false }),
  DATABASE_URL: url(),
  DB_HOST: str({ default: "localhost" }),
  DB_NAME: str({ default: "postgres" }),
  DB_PASSWORD: str(),
  DB_POOL_MAX: num({ default: 10 }),
  DB_POOL_MIN: num({ default: 2 }),
  DB_PORT: num({ default: 5432 }),
  DB_SSL: bool({ default: false }),
  DB_USER: str(),
  DEFAULT_DOMAIN: str({ example: "kutt.it" }),
  DEFAULT_MAX_STATS_PER_LINK: num({ default: 5000 }),
  DISALLOW_ANONYMOUS_LINKS: bool({ default: false }),
  DISALLOW_REGISTRATION: bool({ default: false }),
  GOOGLE_SAFE_BROWSING_KEY: str({ default: "" }),
  JWT_SECRET: str(),
  LINK_LENGTH: num({ default: 6 }),
  MAIL_FROM: str({ default: "", example: "Kutt <support@kutt.it>" }),
  MAIL_HOST: str(),
  MAIL_PASSWORD: str(),
  MAIL_PORT: num(),
  MAIL_SECURE: bool({ default: false }),
  MAIL_USER: str(),
  NON_USER_COOLDOWN: num({ default: 10 }),
  PORT: num({ default: 3000 }),
  RECAPTCHA_SECRET_KEY: str({ default: "" }),
  RECAPTCHA_SITE_KEY: str({ default: "" }),
  REDIS_DB: num({ default: 0 }),
  REDIS_HOST: str({ default: "127.0.0.1" }),
  REDIS_PASSWORD: str({ default: "" }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_URL: url(),
  REPORT_EMAIL: str({ default: "" }),
  SITE_NAME: str({ example: "Kutt" }),
  USER_LIMIT_PER_DAY: num({ default: 50 }),
}, {
  reporter: ({errors, env}: {errors: { [key: string]: Error }, env: any}) => {
    if (env.DATABASE_URL !== undefined) {
      delete errors['DB_USER'];
      delete errors['DB_PASSWORD'];
    }
    if (env.DB_USER !== undefined && env.DB_PASSWORD !== undefined) {
      delete errors['DATABASE_URL'];
    }
    if (errors['REDIS_URL'] instanceof EnvMissingError) {
      delete errors['REDIS_URL'];
    }
    reporter({errors, env});
  }
});

export default env;
