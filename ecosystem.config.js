const env = require('./.env.docker')

module.exports = {
  apps : [
      {
        name: "node-backgroundjobs",
        script: "./dist/server.js",
        watch: true,
        env
      },
      {
        name: "node-queue",
        script: "./dist/queue.js",
        watch: true,
        env
      },
  ]
}
