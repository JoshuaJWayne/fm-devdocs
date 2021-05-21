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


## endpoint notes for later
```
# Write your query or mutation here
query getDevices {
  devices {
	Serial_Number
	storage
	OS
	Model
	  processor {
	  type
	}
	image {
	  id
			url
	}
	memory {
	  value
	}    
	user {
	  username
	  departments {
		name
	  }
	}
  }
}
```

```
query getNotes {
  notes {
		title
	Slug
	content
	author {
	  username
	}
	published_date
	Featured_Img {
	  url
	}
  }
}
```

```
# nextjs conf 2021
https://nextjs.org/conf/tickets/jun21/JoshuaJWayne
```