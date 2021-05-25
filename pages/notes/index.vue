<template>
	<v-container>
		<!-- full list of notes -->
		<v-row justify="center" class="mt-10">
			<v-col cols="12">
				<h1>Notes Archive</h1>
			</v-col>
		</v-row>
		<template v-for="note in notes">
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
	data() {
		return {
	    	search: '',
			notes : [],
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
	}
}
</script>