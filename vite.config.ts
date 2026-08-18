import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteSitemap } from "svelte-sitemap/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      prerender: {
        entries: [
          "*",
          "/",
          "/notice",
          "/notice/interaction",
          "/notice/reply",
          "/oauth",
          "/oauth/callback",
          "/register",
          "/settings/auth",
        ],
      },
      adapter: adapter(),
    }),
    svelteSitemap({
      domain: "https://ccw.kivotos.qzz.io",
      outDir: ".svelte-kit/cloudflare",
      resetTime: true,
      changeFreq: "weekly",
      ignore: ["oauth*", "settings*", "404.html"],
      additional: ["/user/244373873"],
    }),
  ],
  build: {
    minify: true,
    sourcemap: true,
  },
});
