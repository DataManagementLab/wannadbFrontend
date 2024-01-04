/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		setupFiles: './setupTest.ts',
	},
	// exclude all tests from the final bundle
	/* build: {
		sourcemap: true,
		rollupOptions: {
			external: (id) =>
				id.endsWith('.test.ts') || id.endsWith('.test.tsx'),
		},
	}, */
});
