<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col>
				
				<template v-for="note in notes">
					<template v-if="note.Public || $auth.loggedIn">
						<header>
								<h1 class="mb-1">{{note.title}}</h1>
							<span><small>by: {{ note.author.username}} | Published: {{note.published_date}}</small></span>
						</header>
						<!-- {{goLight}} -->
						
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
						<!-- full list of websites performance scores -->	
						<template v-if="note.note_tr.length">
							<v-row justify="center" class="mt-10">
								<v-col :col="10">
									<v-card-title>
										All Sites
										<v-spacer></v-spacer>
										<v-text-field
										v-model="search"
										append-icon="mdi-magnify"
										label="Search"
										single-line
										hide-details
										></v-text-field>
									</v-card-title>
									<v-data-table
									:headers="headers"
									:items="note.note_tr"
									:items-per-page="25"
									:search="search"
									class="elevation-1 text-left"
									>
									<template v-slot:item="{ item }">
									  <tr :class="item.hostingOnly ? 'hosting-only':'full-service'">
										<td> 
											{{item.rowTitle}}
										</td>
										<td> 
											{{item.perfromanceScore}}
										</td>
										<td> 
											{{item.accessibility}}
										</td>
										<td> 
											{{item.bestPractices}}
										</td>
										<td> 
											{{item.seo}}
										</td>
										<td> 
											{{item.mobileScore}}
										</td>
										<td> 
											{{item.desktopScore}}
										</td>
										<td :class="item.client_category.name"> 
											{{item.client_category.name}}
										</td>
									  </tr>

									 </template>
										
								   </v-data-table>						
								</v-col>	
							</v-row>
						</template>

					</template>
					<template v-else>
						<h1 class="mb-1">Please Log In To View This Page</h1>
					</template>
				</template>
				<v-divider></v-divider>
				<v-btn
				color="primary"
				class="mb-10"
				x-large
				:to="`/notes`"
				>
					<v-icon
					  dark
					  left
					>
					  mdi-arrow-left
					</v-icon>
				 Back to All Notes
				</v-btn>

				
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
			return { 
				noteSlug: params.note
			}
		},
		data() {
			return {
				goLight: false,
				error: null,
				notes: [],
				search: '',
				headers: [
					{ text: 'website', value: 'rowTitle'},
					{ text: 'Performance Score', value: 'perfromanceScore'},
					{ text: 'Accessibility', value: 'accessibility'},
					{ text: 'Best Practices', value: 'bestPractices'},
					{ text: 'SEO', value: 'seo', width: 100},
					{ text: 'Mobile Score', value: 'mobileScore'},
					{ text: 'Desktop Score', value: 'desktopScore'},
					{ text: 'Category', value: 'client_category.name'}
				]			
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
		}
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
	pre code,
	code {
		background-color: transparent;
		padding: 0.2em 0;
		white-space: break-spaces;
		word-break: break-word;
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
	img {
		max-width: 100%;
		height: auto;
	}
}
.theme--light.v-application #editor {
	pre {
		background-color: #2d2d2d;
	}
	.code-toolbar pre code,
	.code-toolbar code {
		background-color: #2d2d2d;
	}
}
</style>
<style scoped>
	.v-divider {
		margin: 5rem 0;
	}
</style>
<style>
	.theme--dark.v-data-table tbody tr:nth-of-type(odd) {
		background-color: rgba(255, 255, 255, .05);
	}
</style>