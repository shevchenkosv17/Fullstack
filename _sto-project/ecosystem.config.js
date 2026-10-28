module.exports = {
  apps: [
    {
      name: 'sto-backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
      }
    },
    {
      name: 'sto-frontend',
      script: 'node_modules/vite/bin/vite.js',
      cwd: './frontend',
      args: 'preview --port 5173 --host 0.0.0.0', // Запускаем сборку для всей сети
      env: {
        NODE_ENV: 'production',
      }
    }
  ]
};
