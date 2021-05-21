<template>
	<v-container>
		<!-- full list of notes -->
		<v-row justify="center" class="mt-10">
			<v-col :col="10">
				<h1>Notes Archive</h1>
				<v-card-title>
					Notes
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
				 :items="notes"
				 :items-per-page="10"
				 :search="search"
				 class="elevation-1 text-left"
			   >
				 <template v-slot:item.Slug="{ item }">
					 <a :href="`/notes/${item.Slug}`">Read More</a>
				 </template>
			   </v-data-table>	
			   <pre>
				   {{notes}}
			   </pre>
			</v-col>	
		</v-row>
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