<template>
	<v-container>
		<!-- full list of notes -->
		<v-row justify="center" class="mt-10">
			<v-col cols="12">
				<h1>Notes Archive</h1>
			</v-col>
		</v-row>
		
		<v-row>
			<v-col cols="6">
				<v-text-field prepend-icon="mdi-magnify" type="text" v-model="search" placeholder="search notes"></v-text-field>
			</v-col>
			<v-col cols="12">
<v-card v-if="search">
	<v-list-item v-for="(notez, index) in filteredNotes" >
		  <v-list-item-content>
			<v-divider v-if="index > 0"></v-divider>
			<v-card-title>
				<nuxt-link :to="`${'notes/'}`+notez.Slug">{{notez.title}}</nuxt-link>
			</v-card-title>
			<v-card-text
			v-if="notez.excerpt"
			class="mx-0"
			v-html="$md.render(notez.excerpt)"
			></v-card-text>
			<v-card-text v-else
			class="mx-0"
			v-html="$md.render(notez.content).substring(0, 300)"
			></v-card-text>
		  </v-list-item-content>
	</v-list-item>
	
</v-card>				
			</v-col>
		</v-row>
		
		<template v-for="note in filteredNotes">
			<v-row 
			justify="center"
			align="center" 
			class="mt-6 mb-6">
				<v-col cols="auto">		
					<h2>{{note.title}}</h2>
				</v-col>
				<v-spacer></v-spacer>
				
				<v-btn
				color="primary"
				:href="`/notes/${note.Slug}`"
				>
				Read More
				<v-icon
				  dark
				  right
				>
				  mdi-arrow-right
				</v-icon>
				</v-btn>
				
			</v-row>
			<v-divider></v-divider>
		</template>
	</v-container>
</template>

<script>
import notesQuery from '~/apollo/queries/notes/notes'

export default {
	head(){
		return{
			titleTemplate: '%s - FM-Wiki',
			title: 'Dashboard'
		}
	},
	data() {
		return {
			search: '',
			notes : [],
			count: 0,
			error: null,
			headers: [
				{ 
					text: 'Title', 
					value: 'title'
				},
				{
					text: 'Author',
					align: 'start',
					sortable: true,
					value: 'author.username',
				},
				{ text: 'Link', value: 'Slug'}
			]
		}
	},
	apollo: {
		notes: {
			prefetch: true,
			query: notesQuery
		} 
	},
	computed: {
		filteredNotes: function(){
			return this.notes.filter((note)=>{
				return note.content.match(this.search);
			});
		}
	}
}
</script>