require('dotenv').config();
import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - FM-Wiki',
    title: 'FM-Wiki ',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/fm_logo-400x400.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', '@nuxtjs/apollo', '@nuxtjs/auth', '@nuxtjs/proxy', '@nuxtjs/markdownit', '@nuxtjs/strapi'
  ],
  axios: {
    baseURL: process.env.API_AUTH_URL,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.firmmedia.org/graphql',
      },
    },
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/notes',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/local',
            method: 'post',
            propertyName: 'jwt',
          },
          logout: false,
          user: false,
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: false,
      },
    },
  },
  proxy: [
    // Proxies /api/books/*/**.json to http://example.com:8000
    'https://api.firmmedia.org/uploads/*',
  ],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      darkMode: true,
      themes: {
        light:{
          primary: colors.lightBlue,
          accent: colors.grey.darken3,
          secondary: '#CC4028',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.lightBlue,
          accent: colors.grey.darken3,
          secondary: '#CC4028',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
