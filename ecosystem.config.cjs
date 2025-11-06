module.exports = {
  apps: [
    {
      name: 'fluxive-website',
      script: 'serve.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
