import fastify from 'fastify';
import { ExampleRouter } from './example-module';

const server = fastify();
const PORT = 8080;

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.register(ExampleRouter, { prefix: '/example' });

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
