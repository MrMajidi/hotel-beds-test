declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_SECRET_KEY: string;
    }
  }
}
export {};
