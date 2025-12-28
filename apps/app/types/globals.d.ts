/** biome-ignore-all lint/style/useConsistentTypeDefinitions: allowed */
export { };

declare global {
  interface CustomJwtSessionClaims {
    metadata: { onboarded?: boolean };
  }
}
