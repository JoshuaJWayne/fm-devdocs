<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col>
				
				<template v-for="note in notes">
					<header>
						<h1 class="mb-1">{{note.title}}</h1>
						<span><small>by: {{ note.author.username}} | Published: {{note.published_date}}</small></span>
					</header>
					
					<v-img 	v-if="note.Featured_Img"				
					lazy-src="/uploads/Screen_Shot_2021_05_20_at_10_01_54_PM_008a9d74cd.jpg"
					:src="note.Featured_Img.url"
					:alt="note.title"
					:aspect-ratio="16/9"
					class="mt-8 mb-8"
					max-width="600"
					></v-img>
					<article 
					v-if="note.content" 
					id="editor" 
					v-html="$md.render(note.content)"
					>
					</article>
				</template>
				<v-divider></v-divider>
				<v-btn
				color="primary"
				class="mb-10"
				href="/notes"
				>
					<v-icon
					  dark
					  left
					>
					  mdi-arrow-left
					</v-icon>
				 Back to All Notes
				</v-btn>
				<!-- <pre>
					<code>
					{{notes}}
					</code>
				</pre> -->
				
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	import noteQuery from '~/apollo/queries/notes/note'
	
	export default  {
		head() {
			return {
				script: [
					{
						src: '/js/prism.js'
					}
				],
				link: [
					{ rel: 'stylesheet', href: '/css/prism.css' }
				]
			}
		},
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
</style>
<style lang="scss">
#editor {
	margin-top: 3rem;
	p + h2 {margin-top: 3rem;}
	h3 {margin-bottom: 1.25rem;}
	p + h3 {margin-top: 2.5rem;}
	ul + p {
		margin-top: 1.25rem;
	}
	pre {
		background-color: rgba(255, 255, 255, 0.1);
		padding: 1rem;
		border-radius: 5px;
		margin-bottom: 2rem;
	}
	code {
		background-color: transparent;
	}
	a {
		word-break: break-all;
	}
	hr {
		margin: 2rem 0;
		border-color: rgba(255, 255, 255, 0.12) !important;
		display: block;
		flex: 1 1 0px;
		max-width: 100%;
		height: 0px;
		max-height: 0px;
		border: solid;
		border-width: thin 0 0 0;
		transition: inherit;
	}
}
</style>
<style scoped>
	.theme--dark.v-application article code {
		background-color: transparent !important;
	}
	pre {
		background-color: rgba(0,0,0,0.2);
		padding: 1rem;
		border-radius:8px;
	}
	pre code {
		word-wrap: normal;
		background-color: transparent !important;
	}
	.v-divider {
		margin: 5rem 0;
	}
</style>