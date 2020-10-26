const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/calistanguyen/git/climb-on/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/calistanguyen/git/climb-on/src/pages/index.js"))),
  "component---src-pages-test-js": hot(preferDefault(require("/Users/calistanguyen/git/climb-on/src/pages/test.js")))
}

