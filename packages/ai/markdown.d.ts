// `markdown.d.ts` file to tell TypeScript how to import `.md` files:
declare module '*.md' {
  const value: string;
  export default value;
}
