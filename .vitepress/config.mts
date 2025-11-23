import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// 为 'markdown-it-obsidian-callouts' 添加类型定义
import './types.d.ts'
import mdItObsidianCallouts from 'markdown-it-obsidian-callouts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "SusSpace",
  base: '/',
  sitemap: {
    hostname: 'https://pages.xiaosuoaa.top'
  },
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
    logo: '/assets/logo.png',
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
      { icon: 'github', link: 'https://github.com/suq-weer/SusSpace' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373"/></svg>'
        },
        link: 'https://space.bilibili.com/646692539'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></svg>'
        },
        link: 'mailto:xiaosu@xiaosuoaa.top'
      }
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