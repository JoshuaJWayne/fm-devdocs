<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center my-5">
        <FMLogo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to The Firm Media Wiki
        </v-card-title>
        <v-card-text>
          <p>This site is a place for our team to gather documentation that is helpful in dealing with any Technical information related both Internal Tools and External Tools we utilize in managing our Clients' digital assets.</p>
          <p>I Hope this tool is helpful. Please give me feedback so that we can add any information that may be helpful to you or your departments. With a little work this could be great!</p>
          <site class="text-right">- Joshua James</site>
          <hr class="my-3">
          <ul>
            <li>
              <a
              href="https://docs.google.com/spreadsheets/d/1QIZhuijn2X8E6P-uGzu06AZJ1lHcnY3kNGU3G9TLCIk/edit?pli=1#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              >Super Board
              </a>
            </li>
            <li>
              <a href ="https://docs.google.com/spreadsheets/d/1WEl3crbo7vuH_PYcRhGwq8bKW2qYOhqE8e6dWz2qSTg/edit#gid=0" target="_blank" rel="noopener noreferrer">Site List Doc</a>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions class="pb-5 d-flex justify-center">
          <v-btn
            class="px-3"
            color="secondary"
            elevation="2"
            x-large
            nuxt
            to="/notes"
          >
            DashBoard →
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FmLogo from '~/components/FMLogo.vue'

export default {
  components: {
    FmLogo
  }
}
</script>
