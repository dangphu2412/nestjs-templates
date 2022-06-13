import fastify from 'fastify';
import { AuthControllerRegister } from './auth/auth.controller';

const server = fastify();
const PORT = 8080;

server.register(AuthControllerRegister, { prefix: '/auth' });

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
