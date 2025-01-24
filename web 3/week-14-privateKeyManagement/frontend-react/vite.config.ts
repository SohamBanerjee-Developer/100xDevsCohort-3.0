import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
//added node polyfills so that @solana/web3.js package cam be polyfilled to function in the browser, as it uses things that are only 
//definde in node.js not in the browser
export default defineConfig({
  plugins: [react(),nodePolyfills()],
})
