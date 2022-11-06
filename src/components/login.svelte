<script lang="ts">
	import { auth } from '$lib/database';
	import Button, { Icon as BIcon } from '@smui/button';
	import Card from '@smui/card';
	import { showMsg } from '$lib/stores';
	import { auth_messages } from '$lib/messages';
	import LoginMagic from './login-magic.svelte';

	const { loginWithGoogle, loginWithApple } = auth;

	let showEmail = false;
</script>

<div class="login-container">
	<Card variant="outlined" padded>
		<div class="centered">
			<h2>Passwordless Login</h2>
			<div class="margin-spacer" />
			<Button
				class="g-button button-size"
				aria-label="Login"
				title="Login"
				on:click={() => loginWithGoogle().then((e) => !e && showMsg(auth_messages.LOGIN_SUCCESS))}
			>
				<BIcon class="material-icons">login</BIcon>
				<span class="no-bold">Login with Google</span>
			</Button>
			<div class="margin-spacer" />
			<Button
				class="a-button button-size"
				aria-label="Login"
				title="Login"
				on:click={() => loginWithApple().then((e) => !e && showMsg(auth_messages.LOGIN_SUCCESS))}
			>
				<BIcon class="material-icons">login</BIcon>
				<span class="no-bold">Login with Apple</span>
			</Button>
			<div class="margin-spacer" />
			<Button
				variant="outlined"
				color="secondary"
				class="button-size"
				aria-label="Login"
				title="Login"
				on:click={() => (showEmail = !showEmail)}
			>
				<BIcon class="material-icons">link</BIcon>
				<span class="no-bold">Login with Magic Link</span>
			</Button>

			{#if showEmail}
				<LoginMagic />
			{/if}
		</div>
	</Card>
</div>

<style global>
	.error {
		color: red;
	}
	.helper {
		margin: auto;
		width: 50%;
	}
	.g-button {
		background-color: rgb(219, 14, 14) !important;
		color: white !important;
		font-weight: bold;
	}
	.a-button {
		background-color: #a2babd !important;
		color: white !important;
		font-weight: bold;
	}
	.margin-spacer {
		margin: 20px;
	}
	.button-size {
		width: 250px;
	}
	.icon-color {
		color: #1e88e5 !important;
	}
	.login-container {
		width: 50%;
		margin: auto;
	}
</style>
