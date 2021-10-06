<template>
	<v-container>
		<!-- full list of notes -->
		<v-row justify="center" class="mt-10">
			<v-col cols="12">
				<h1>Devices Inventory</h1>
			</v-col>
		</v-row>	
		<v-row justify="center">
			<template v-if="devices && $auth.loggedIn">
				<v-col cols="12">
					<v-card class="elevation-3">
						<v-card-title>
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
						:items="devices"
						:search="search"
						:expanded.sync="expanded"
						:single-expand="singleExpand"
						item-key="id"
						show-expand
						:items-per-page="10"
						:footer-props="{
						  showFirstLastPage: true,
						  firstIcon: 'mdi-arrow-collapse-left',
						  lastIcon: 'mdi-arrow-collapse-right',
						  prevIcon: 'mdi-minus',
						  nextIcon: 'mdi-plus'
						}"
						>
						<template v-slot:expanded-item="{ headers, item }">
							<td v-if="item.Notes || item.OS || item.mac_user || item.icloudAccount " :colspan="headers.length"
								class="pt-3 pb-5">
								<div class="mx-14 mb-2">
									<h4 class="my-3">Additional Notes:</h4>
									<ul class="pl-4">
										<li><span class="blue--text">Operating System:</span> {{item.OS}}</li>
										<li><span class="blue--text">Mac User Name:</span> {{item.mac_user}}</li>
										<li><span class="blue--text">iCloud Account:</span> {{item.icloudAccount}}</li>
										<li><span class="blue--text">Processor: </span>{{item.processor.type}}</li>
										<li><span class="blue--text">Graphics Card: </span>{{item.graphics}}</li>
										</ul>
								</div>
								<template v-if="item.Notes">
									<div class="mx-14">
										<v-divider class="my-3"></v-divider>
										<article class="text-subtitle-1">{{ item.Notes }}</article>
									</div>
								</template>
							</td>
							<td v-else :colspan="headers.length">
								<p class="mx-14 mb-0">There are no additional notes.</p>
							</td>
						</template>
						</v-data-table>
		  			</v-card>
				</v-col>
			</template>
			<template v-else>
				<v-col cols="12">
					<h3>Please log in to review this content</h3>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>

<script>
import devicesQuery from '~/apollo/queries/devices/devices'

export default {
	head(){
		return{
			titleTemplate: '%s - FM-Wiki',
			title: 'Device Inventory'
		}
	},
	data() {
		return {
			search: '',
			devices : [],
			count: 0,
			error: null,
			expanded: [],
			singleExpand: true,
			headers: [

				{ 
					text: 'Serial Number', 
					value: 'Serial_Number'
				},
				{
					text: 'Model',
					value: 'Model',
					width: '200'
				},
				{
					text: 'Memory',
					value: 'memory.value',
					width: '100'
				},
				{
					text: 'Storage',
					value: 'storage',
					width: '150'
				},
				{
					text: 'Assigned Team Member',
					value: 'team_member.username',
					width: '190'
				}
			]
		}
	},
	apollo: {
		devices: {
			prefetch: true,
			query: devicesQuery
		} 
	}
}
</script>