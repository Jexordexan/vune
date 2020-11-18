export default function setNodeEnv(env: string) {
  const oldEnv = process.env.NODE_ENV;
  beforeEach(() => {
    process.env.NODE_ENV = env;
  });

  afterEach(() => {
    process.env.NODE_ENV = oldEnv;
  });
}
