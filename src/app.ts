import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import schema from './schema';
// import {checkDbConnection, initDB} from './db'

function createApp() {
  const yoga = createYoga({ schema });
  const server = createServer(yoga);

  return server;
}

export function server(port: number) {
  const app = createApp();

  app.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}
