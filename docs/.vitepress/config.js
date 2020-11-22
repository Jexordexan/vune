module.exports = {
  title: 'Vune',
  description: 'Just playing around.',
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: [
      { text: 'What is Vune?', link: '/' },
      {
        text: 'Guide',
        children: [
          { text: 'Getting started', link: '/guide/installation' },
          { text: 'Store', link: '/guide/store' },
          { text: 'Mutations', link: '/guide/mutations' },
          { text: 'Actions', link: '/guide/actions' },
          { text: 'Modules', link: '/guide/modules' },
        ],
      },
    ],
  },
};
