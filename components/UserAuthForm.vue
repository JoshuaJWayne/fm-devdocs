<template>
	<!-- login module -->
	<v-app class="my-8">
		<v-card width="800" class="mx-auto">
			<v-card-title v-if="formTitle">
				<h2>{{formTitleText}}</h2>
			</v-card-title>
			<v-card-text>
				<v-form v-model="valid">
					<v-row>
						<v-col v-if="hasName">
							<v-text-field 
							v-model="userInfo.name" 
							label="Name"
							prepend-icon="mdi-account-circle"
							:rules="[required('name')]"
							 />
						</v-col>
						<v-col>
							<v-text-field 
							v-model="userInfo.identifier" 
							label="Email" 
							:rules="[required('email'), emailFormat()]"
							prepend-icon="mdi-email"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col col="12">
							<v-text-field v-model="userInfo.password"
							  label="Password"
							  :type="showPassword ? 'text' : 'password'"
							  prepend-icon="mdi-lock" 
							  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							  @click:append="showPassword = !showPassword"
							  counter=true
							  :rules="[required('password'), minLength('password', 8)]"
							  />
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="px-5 py-4">
				<v-spacer/>
				<v-btn color="info"
				@click="submitForm()"
				:disabled="!valid" 
				class="px-8"
				>{{ buttonText }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
  import validations from "@/utils/validations";

  export default {
	data() {
	  return {
		valid: false,
		showPassword: false,
		userInfo: {
		  identifier: '',
		  password: ''
		},
		...validations
	  }
	},
	props: {
		"buttonText": {
			type: String,
			default: 'Login'
		}, 
		"hasName" : {
			type: Boolean,
			default: false
		}, 
		"formTitle" : {
			type: Boolean,
			default: false
		}, 
		"formTitleText" : {
			type: String,
			default: 'Form Title'
		}
	},
	methods: {
		submitForm() {
			this.$emit('submit', {userInfo: this.userInfo})
		}
	}
  }
</script>

<style lang="scss" scoped>

</style>