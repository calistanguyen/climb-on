/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* ... */
  plugins: [
    /* ... */
    `gatsby-plugin-sass`,

    {
      resolve: "gatsby-source-pg",
      options: {
        connectionString: "postgres:///climb_on",
        schema: "public",
        refetchInterval: 60, // Refetch data every 60 seconds
      },
    },
  ],
};