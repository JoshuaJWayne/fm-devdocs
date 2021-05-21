<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col>
				
				<v-btn
					color="primary"
					href="/notes"
				>
					<v-icon
					  dark
					  left
					>
					  mdi-arrow-left
					</v-icon>
					 All Notes
				</v-btn>
				<template v-for="note in notes">
					<header>
						<h1 class="mb-1">{{note.title}}</h1>
						<span><small>by: {{ note.author.username}} | Published: {{note.published_date}}</small></span>
					</header>
					
					<v-img 	v-if="note.Featured_Img"				
					lazy-src="https://picsum.photos/id/11/10/6"
					:src="note.Featured_Img.url"
					:alt="note.title"
					class="mt-8 mb-8"
					max-width="600"
					></v-img>
					<article class="mt-5">
						{{note.content}}
					</article>
				</template>
				<v-divider></v-divider>
				<pre>
					{{notes}}
				</pre>
				
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	import noteQuery from '~/apollo/queries/notes/note'
	
	export default  {
		async asyncData({ params }) {
		  return { noteSlug: params.note }
		},
		data() {
			return {
				notes: [],
				error: null
			}
		},
		apollo: {
			notes: {
				prefetch: true,
				query: noteQuery,
				variables() {
					return {
						"slug": this.noteSlug
					}
				}
				
			}
		},

	}
</script>
<style scoped>
	.v-divider {
		margin: 2.5rem 0;
	}
</style>