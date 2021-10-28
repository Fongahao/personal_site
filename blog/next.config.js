const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

module.exports = {
    ...withCss({}),
    publicRuntimeConfig: {
        // Will be available on both server and client
        HOST: process.env.HOST || 'www.ahao.com'
      },
}

