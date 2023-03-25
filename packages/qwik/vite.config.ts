import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite({
      devTools: {
        clickToSource: false,
      }
    }), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    optimizeDeps: {
      include: [
        "@speedsouls/database",
        "@speedsouls/trpc",
        "@speedsouls/zod"
      ],
      exclude: [
        "@prisma/client",
      ]
    },
    ssr: {
      external: ["@prisma/client"]
    },
    // build: {
    //   commonjsOptions: {
    //     include: [/\.prisma\/client/, /node_modules/],
    //   },
    // },
    resolve: {
      preserveSymlinks: true
    },
  };
});
