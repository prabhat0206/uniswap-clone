namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    sanityAPIToken: string;
    projectId: string;
  }
}
