const package = require('../../package.json');

module.exports = {
  title: 'Vune',
  description: 'Just playing around.',
  themeConfig: {
    version: package.version,
    nav: [{ text: 'Guide', link: '/guide/' }],
    sidebar: [
      { text: 'What is Vune?', link: '/' },
      {
        text: 'Guide',
        children: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Creating a Store', link: '/guide/store' },
          { text: 'Using in a component', link: '/guide/components' },
          { text: 'Mutations', link: '/guide/mutations' },
          { text: 'Actions', link: '/guide/actions' },
          { text: 'Modules', link: '/guide/modules' },
        ],
      },
    ],
  },
};
