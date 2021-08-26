<template>	
	<v-row>
		<v-col class="text-center">
				<!-- login module -->
				<UserAuthForm 
				:formTitle=true
				formTitleText="Login" 	
				buttonText="Login" 
				@submit="loginUser($event)"
				/>
		</v-col>
	</v-row>
</template>
	
<script>
	import axios from 'axios'
	import UserAuthForm from '@/components/UserAuthForm'
	
	export default {
		components: {
			UserAuthForm,
		},
		methods: {
			async loginUser({userInfo}) {
				const loginResponse = await this.$auth.loginWith('local', {
						data: userInfo
				});
				const { jwt, user} = loginResponse.data;
				this.$auth.setUser(user)
				this.$apolloHelpers.onLogin(jwt, undefined, {
					expires: 7
				});
				this.$router.push('/')
			},
		},
	}
</script>
<style>
	.v-text-field input {
		padding: 10px;
	}
</style>