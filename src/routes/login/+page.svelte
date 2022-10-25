<script lang="ts">
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import { auth } from '$lib/database';
	import Button, { Icon as BIcon } from '@smui/button';
	import Card from '@smui/card';
	import Icon from '@smui/textfield/icon';
	import { Separator } from '@smui/list';

    import type { PageData } from './$types';

	const { loginWithGoogle, loginWithMagic } = auth;

    export let data: PageData;

    console.log(data);

	let showEmail = false;

	let value = '';
	let dirty = false;
	let invalid = false;
	$: disabled = !value || !dirty || invalid;
</script>

<div class="card-container">
	<Card variant="outlined" padded>
		<div class="centered">
			<h2>Passwordless Login</h2>
			<div class="margin-spacer" />
			<Button
				class="g-button button-size"
				aria-label="Login"
				title="Login"
				on:click={loginWithGoogle}
			>
				<span class="no-bold">Login with Google</span>
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
				<div class="margin-spacer" />
				<Separator />
				<div class="margin-spacer" />
				<Textfield
					type="email"
					variant="outlined"
					bind:dirty
					bind:invalid
					bind:value
					input$autocomplete="email"
					placeholder="Email"
					label="Email"
					required
					updateInvalid
				>
					<Icon class="material-icons icon-color" slot="leadingIcon">email</Icon>
					<HelperText class="helper" validationMsg slot="helper">
						That's not a valid email address.
					</HelperText>
				</Textfield>
				<div class="margin-spacer" />
				<Button
					variant="outlined"
					color="primary"
					class="button-size"
					aria-label="Login"
					title="Login"
					{disabled}
					on:click={() => loginWithMagic(value)}
				>
					<span class="no-bold">Send Link</span>
				</Button>
			{/if}
		</div>
	</Card>
</div>

<style global>
	.helper {
		margin: auto;
		width: 50%;
	}
	.g-button {
		background-color: rgb(219, 14, 14) !important;
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
</style>
