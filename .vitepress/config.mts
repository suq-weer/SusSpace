import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// 为 'markdown-it-obsidian-callouts' 添加类型定义
import './types.d.ts'
import mdItObsidianCallouts from 'markdown-it-obsidian-callouts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "SusSpace",
  description: "Xiaosu 的知识库",
  markdown: {
    config: (md) => {
      md.use(mdItObsidianCallouts)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '参与贡献', link: '/知识库相关/参与贡献.md' }
    ],

    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.jooy2.com/guide/api
       */
      documentRootPath: '/',
      collapsed: true,
      collapseDepth: 2,
      removePrefixAfterOrdering: false,
      prefixSeparator: '.',
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/suq-weer/SusSpace' }
    ],

    lastUpdated: {
      text: '最近更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    externalLinkIcon: true,

    // Chinese localization
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '本页目录',
      level: [2, 6]
    },
    editLink: {
      pattern: '/知识库相关/参与贡献',
      text: '参与贡献？请点击这里'
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '多语言',
    notFound: {
      title: '页面未找到',
      quote: '抱歉，您访问的页面不存在。',
      linkText: '返回首页'
    }
  }
})
