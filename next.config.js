module.exports = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ['fr-fr', 'en-gb'],
  //   defaultLocale: 'fr-fr'
  // },
  // eslint: {
  //   ignoreDuringBuilds: true
  // }
  async rewrites() {
    return [
      { source: "/a-propos", destination: "/en-gb/a-propos" },
      { source: "/commissaires", destination: "/en-gb/commissaires" },
      { source: "/contact", destination: "/en-gb/contact" },
      { source: "/partenaires", destination: "/en-gb/partenaires" },
      { source: "/artistes/:id", destination: "/en-gb/artistes/:id" },
      { source: "/artistes", destination: "/en-gb/artistes" },
      // { source: "/:first", destination: "/fr-fr/:first" },
      // { source: "/:first/:second", destination: "/fr-fr/:first/:second" }
    ];
  }
}
