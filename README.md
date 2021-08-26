# app

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### removed from default.vue
``` js
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
<!-- breaker -->
```


``` js 


```