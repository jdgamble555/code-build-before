<script lang="ts">
	import Card from '@smui/card';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import EditProfile from '@components/auth-settings/edit-profile.svelte';
	import EditUsername from '@components/auth-settings/edit-username.svelte';
	import EditEmail from '@components/auth-settings/edit-email.svelte';
	import { browser } from '$app/environment';
	import { auth } from '$lib/database';
	import { goto } from '$app/navigation';
	import Loader from '@components/nav/loader.svelte';

	let panel1Open = false;
	let panel2Open = false;
	let panel3Open = false;

	const { user } = auth;

	// todo - move login check to +page.ts

</script>

{#if browser}
	{#if $user === 'loading'}
		<div class="centered">
			<Loader />
		</div>
	{:else if $user}
		<br />
		<Card variant="outlined" padded>
			<div class="accordion-container">
				<Accordion>
					<Panel bind:open={panel1Open}>
						<Header>
							Profile
							<span slot="description">Change Your Name and Picture</span>
							<IconButton slot="icon" toggle pressed={panel1Open}>
								<Icon class="material-icons" on>expand_less</Icon>
								<Icon class="material-icons">expand_more</Icon>
							</IconButton>
						</Header>
						<Content>
							<EditProfile user={$user} />
						</Content>
					</Panel>
					<Panel bind:open={panel2Open}>
						<Header>
							Username
							<span slot="description">Change Your Username</span>
							<IconButton slot="icon" toggle pressed={panel2Open}>
								<Icon class="material-icons" on>expand_less</Icon>
								<Icon class="material-icons">expand_more</Icon>
							</IconButton>
						</Header>
						<Content>
							<EditUsername username={$user.username || ''} />
						</Content>
					</Panel>
					<Panel bind:open={panel3Open}>
						<Header>
							Email
							<span slot="description">Change your Email</span>
							<IconButton slot="icon" toggle pressed={panel3Open}>
								<Icon class="material-icons" on>expand_less</Icon>
								<Icon class="material-icons">expand_more</Icon>
							</IconButton>
						</Header>
						<Content>
							<EditEmail email={$user.email} />
						</Content>
					</Panel>
				</Accordion>
			</div>
		</Card>
	{:else}
		{goto('/login')}
	{/if}
{/if}
