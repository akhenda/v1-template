export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: { onboarded?: boolean };
  }
}

declare module '*.svg' {
  const content: string;
  export default content;
}
