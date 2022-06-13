import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from 'fastify';
import { Server } from 'http';

/**
 * TODO: We want to provide a generic authenticator
 * which will help to authenticate based on the provided
 * authenticate strategy
 *
 * - We public a simple api middleware for using purposes
 * - We allow client to register what strategy they want to
 */
export function AuthControllerRegister(
  fastify,
  opts,
  done,
): FastifyPluginCallback<FastifyPluginOptions, Server> {
  fastify.post('/', (req, rep, done) => {

  });
  return done();
}
