<script lang="ts">
	import Textfield from '@smui/textfield';
	import { auth } from '$lib/database';
	import Button from '@smui/button';
	import Icon from '@smui/textfield/icon';
	import { Separator } from '@smui/list';
	import { createForm } from 'svelte-forms-lib';
	import { validEmail } from '$lib/email-validation';
	import { showMsg } from '$lib/stores';
	import { auth_messages } from '$lib/messages';
	import { goto } from '$app/navigation';

	const { loginWithMagic } = auth;

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
				showMsg(auth_messages.EMAIL_SENT);
				goto('/');
			});
		}
	});
</script>

<div class="margin-spacer" />
<Separator />
<div class="margin-spacer" />
<form class:valid={$isValid} on:submit={handleSubmit}>
	<Textfield
		input$name="email"
		type="email"
		variant="outlined"
		class="text-size"
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

<style global>
	.text-size {
		width: 250px;
	}
</style>
