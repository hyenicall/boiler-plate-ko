if (process.env.NIDE_ENV === 'production') {
  module.exports = require('./prod')
} else {
  module.exports = require('./dev')
}
