import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        [process.env.VITE_API]: { // * адрес api
          target: process.env.VITE_TARGET, // * порт подключения клиента к серву
          changeOrigin: true
        }
      },
      port: parseInt(process.env.VITE_PORT)
    }
  })
}
