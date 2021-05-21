<template>
  <v-app light>
    <v-navigation-drawer 
      v-model="drawer"
      :mobile-breakpoint=0
      :mini-variant="miniVariant"
      :clipped="!clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="!clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />

      <nuxt-link class="home-link" to="/">
        <v-toolbar-title v-text="title" />    
      </nuxt-link>
    
      <v-spacer />
      <div class="buttons" v-if="$auth.loggedIn">
        <!-- {{$auth.user.email }} -->
        <button class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default info" @click="logout()">
            Log Out  
            <v-icon>mdi-logout</v-icon>
        </button>
      </div>
      <div class="buttons" v-else>
        <nuxt-link  class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default info" to="/login">
          Log in  <v-icon>mdi-login</v-icon>
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
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
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-table-clock',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-note',
          title: 'Notes & Tutorials',
          to: '/notes'
        }       
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FM-Wiki'
    }
  }
}
</script>

<style scoped>
  .disabled-link {
    color: currentColor;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }
  .home-link {
    text-decoration: none;
    color: white;
  }
</style>
