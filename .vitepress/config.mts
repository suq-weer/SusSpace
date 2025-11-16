import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "SusSpace",
  description: "Xiaosu's knowledge space.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.jooy2.com/guide/api
       */
      documentRootPath: '/',
      collapsed: false,
      collapseDepth: 2,
      removePrefixAfterOrdering: false,
      prefixSeparator: '.',
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})
