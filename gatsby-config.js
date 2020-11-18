/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [`gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString: 'postgres:///climb_on',
        schema: 'user_data', // Refetch data every 60 seconds
      },
    },

  ],
}
