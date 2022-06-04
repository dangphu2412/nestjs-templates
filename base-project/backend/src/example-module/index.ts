export function ExampleRouter(fastify, opts, done) {
  fastify.get('/', (req, rep) => {
    return 'Heheh';
  });
  done();
}
