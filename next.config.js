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
      { source: "/a-propos", destination: "/fr-fr/a-propos" },
      { source: "/commissaires", destination: "/fr-fr/commissaires" },
      { source: "/contact", destination: "/fr-fr/contact" },
      { source: "/partenaires", destination: "/fr-fr/partenaires" },
      { source: "/artistes/:id", destination: "/fr-fr/artistes/:id" },
      { source: "/artistes", destination: "/fr-fr/artistes" },
      // { source: "/:first", destination: "/fr-fr/:first" },
      // { source: "/:first/:second", destination: "/fr-fr/:first/:second" }
    ];
  }
}
