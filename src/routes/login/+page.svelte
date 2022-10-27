<script lang="ts">
	import Textfield from '@smui/textfield';
	import { auth } from '$lib/database';
	import Button, { Icon as BIcon } from '@smui/button';
	import Card from '@smui/card';
	import Icon from '@smui/textfield/icon';
	import { Separator } from '@smui/list';
	import { createForm } from 'svelte-forms-lib';
	import { validEmail } from '$lib/email-validation';

	const { loginWithGoogle, loginWithMagic } = auth;

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: ''
		},
		validate: (values) => {
			const errs: { email?: string | undefined } = {};
			if (Object.hasOwn(values, 'email')) {
				if (values.email === '') {
					errs['email'] = 'Email is required.';
				} else if (!validEmail.test(values.email)) {
					errs['email'] = 'Invalid Email.';
				}
			}
			return Object.keys(errs).length ? errs : null;
		},
		onSubmit: (values) => {
			loginWithMagic(values.email).then(() => {
				
			});
		}
	});

	let showEmail = false;
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
				<form class:valid={$isValid} on:submit={handleSubmit}>
					<Textfield
						input$name="email"
						type="email"
						variant="outlined"
						input$autocomplete="email"
						placeholder="Email"
						label="Email"
						bind:value={$form.email}
						on:input={handleChange}
						required
					>
						<Icon class="material-icons icon-color" slot="leadingIcon">email</Icon>
					</Textfield>
					{#if $errors.email && $touched.email}
						<br />
						<span class="error"><small>{$errors.email}</small></span>
					{/if}
					<div class="margin-spacer" />
					<Button
						variant="outlined"
						color="primary"
						class="button-size"
						aria-label="Login"
						title="Login"
						disabled={!$isValid || !$touched.email}
					>
						<span class="no-bold">Send Link</span>
					</Button>
				</form>
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
