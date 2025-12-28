/** biome-ignore-all lint/style/useConsistentTypeDefinitions: allowed here */
export { };

declare global {
  interface CustomJwtSessionClaims {
    metadata: { onboarded?: boolean };
  }
}
