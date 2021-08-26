<template>
  <v-app >
    <v-navigation-drawer 
      v-model="drawer"
      :mobile-breakpoint=0
      :mini-variant="miniVariant"
      :clipped="!clipped"
      fixed
      app
    >
     
    <v-list dense>
    <template>
        <div v-for="item in items" :key="item.title">
            <v-list-group v-if="item.items" v-model="item.active" no-action link>
                <template v-slot:activator>
                    <v-list-item-action v-if="item.icon">
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.to">
                    <v-list-item-icon v-if="subItem.icon">
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-item v-else :to="item.to" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </div>
    </template>
    </v-list>
     
     
     
      
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon   @click.stop="drawer = !drawer" />

      <nuxt-link  class="home-link" to="/">
        <v-toolbar-title v-text="title" />    
      </nuxt-link>
      <!-- <v-toolbar-title v-else v-text="title"/> -->
      <v-spacer />
      <v-switch class="mt-6 mr-4" :label="`Light Theme`" @click="$vuetify.theme.dark=!$vuetify.theme.dark"></v-switch>
      
      <div class="buttons" v-if="$auth.loggedIn">
        <!-- {{$auth.user.email }} -->
        <button class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default secondary" @click="logout()">
            Log Out  
            <v-icon>mdi-logout</v-icon>
        </button>
      </div>
      <div class="buttons" v-else>
        <a 
        <nuxt-link  class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default info" to="/login">
          Log in  <v-icon>mdi-login</v-icon>
        </nuxt-link>
      </div>

      
    </v-app-bar>
    <v-main>
      <v-container>
        <template v-if="goLight">
        <p>Light Mode !</p>
        </template>
        <template v-else>
          <p>Dark Mode</p>
        </template>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      isLight: false,
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-table-clock',
          title: 'Dashboard',
          to: '/notes'
        },
        {
          icon: 'mdi-server',
          title: 'Hosting Website/Email',
          items: [
            { 
              title: 'Required Assets',
              to: '/notes/required-assets/'
            },
            { 
              title: 'Hosting Platform & Tools',
              to: '/notes/hosting-platforms-and-tools',
              items: [
                {
                  title: 'cPanel',
                to: '/notes/hosting-platforms-and-tools#cpanel',
                },
                { 
                  title: 'WHM',
                  to: '/notes/hosting-platforms-and-tools#whm',
                },
              ]
            },           
            { 
              title: 'Plesk',
              to: '/notes/hosting-platforms-and-tools#plesk',
            }, 
            { 
              title: 'DNS',
              to: '/notes/what-is-dns/'
            },
            { 
              title: 'IP Address',
              to: '/notes/ip-address/'
            },
            {
              title: 'Name Servers',
              to: '/notes/name-servers/'
            },
            {
              title: 'Registrar',
              to: '/notes/registrar/'
            },
            {
              title: 'Technical Terms',
              to: '/notes/technical-terms/'
            },
            {
              title: 'Email Hosting',
              to: '/notes/email-hosting/'
            },
          ]
        },
        {
          icon: 'mdi-xml',
          title: 'Development/Research',
          items: [
            {
              title: 'API',
              to: '/notes/what-is-an-api',
            },
            {
              title: 'Modern Frameworks',
              to: '/notes/what-are-modern-frontend-frameworks',
            },
            {
              title: 'Rendering',
              to: '/notes/server-side-rendering',
            }
          ]
        },
        {
          icon: 'mdi-book-open-variant',
          title: 'Digital Marketing Terminology',
          items: [
            {
              title: 'General Marketing Terminology',
              to: '/notes/general-digital-marketing-terminology',
            },
            {
              title: 'Medical Marketing Terminology',
              to: '/notes/medical-marketing-terminology',
            },
            {
              title: 'Dental Marketing Terminology',
              to: '/notes/dental-marketing-terminology',
            },                       
          ]
        },
        {
          icon: 'mdi-file-document',
          title: 'Industry Resouces',
          to: '/notes/industry-resources',
        },
        {
          icon: 'mdi-share-variant',
          title: 'Social Media',
          items: [
            {
              title: 'Terminology',
              to: '/notes/social-media-terminology',
            },
            {
              title: 'Resources',
              to: '/notes/social-media-resources',
            }            
          ],
        }            
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FM-Wiki'
    }
  },
  methods: {
    async logout() {
      console.log('logout button clicked');
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
      this.$router.push('/login')
    },
    toggleTheme() {
       this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
       localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
    }
  },
  mounted() {
    const theme = localStorage.getItem("useDarkTheme");
      if (theme) {
        if (theme == "true") {
          this.$vuetify.theme.dark = false;
        } else this.$vuetify.theme.dark = true;
      }
  }
}
</script>
<style>
  a.scrolltoo {
    padding-top: 80px;
  }
  p {
    white-space: normal;
  }
  blockquote {
    border-left: solid 6px #CC4028;
    padding: 1.3rem 1.4rem 0.3rem;
    margin-top: 1rem;
    margin-bottom: 1.8rem;
    background: #fff;
    color: #000;
    box-shadow: 4px 3px 2px 1px rgb(111 111 111 / 20%);
    font-weight: 500;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 0 4px 4px 0;
  }
</style>
<style scoped>
  .disabled-link {
    color: currentColor;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }
  .home-link {
    text-decoration: none;
    color: black;
  }
  .theme--dark .home-link {
    text-decoration: none;
    color: white;
  }
</style>
