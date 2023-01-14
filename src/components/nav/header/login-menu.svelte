<script lang="ts">
	import Menu, { SelectionGroupIcon } from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Icon } from '@smui/button';
	import { auth } from '$lib/database';
	import { goto } from '$app/navigation';
	import Loader from '../loader.svelte';

	let menu: Menu;

	const { user, logout } = auth;
</script>

<div>
	<Button class="no-bold" on:click={() => menu.setOpen && menu.setOpen(true)}>
		{#if $user.data && !$user.loading}
			{#if $user.data.photoURL}
				<img
					class="avatar"
					src={$user.data.photoURL}
					alt={$user.data.displayName}
					width="35"
					height="35"
				/>
			{:else}
				<Icon class="material-icons account-icon-main">account_circle</Icon>
			{/if}
		{:else}
			<Loader white />
		{/if}
	</Button>
	<Menu bind:this={menu} anchorCorner="BOTTOM_LEFT">
		<List>
			<Item on:SMUI:action={() => goto('/settings')}>
				<SelectionGroupIcon>
					<i class="material-icons back">settings</i>
				</SelectionGroupIcon>
				<Text>Account Settings</Text>
			</Item>
			<Item on:SMUI:action={() => goto('/dashboard')}>
				<SelectionGroupIcon>
					<i class="material-icons back">dashboard</i>
				</SelectionGroupIcon>
				<Text>Dashboard</Text>
			</Item>
			<Item on:SMUI:action={() => goto('/dashboard')}>
				<SelectionGroupIcon>
					<i class="material-icons back">bookmarks</i>
				</SelectionGroupIcon>
				<Text>Bookmarks</Text>
			</Item>
			{#if $user.data && !$user.loading && $user.data.role !== 'USER'}
				<Item on:SMUI:action={() => goto('/dashboard')}>
					<SelectionGroupIcon>
						<i class="material-icons back">account_box</i>
					</SelectionGroupIcon>
					<Text>My Posts</Text>
				</Item>
				<Separator />
				<Item on:SMUI:action={() => goto('/new')}>
					<SelectionGroupIcon>
						<i class="material-icons back">post_add</i>
					</SelectionGroupIcon>
					<Text>New Post</Text>
				</Item>
			{/if}
			<Separator />
			<Item on:SMUI:action={logout}>
				<SelectionGroupIcon>
					<i class="material-icons">power_settings_new</i>
				</SelectionGroupIcon>
				<Text>Logout</Text>
			</Item>
		</List>
	</Menu>
</div>

<style global>
	.avatar {
		width: 35px !important;
		height: 35px !important;
		border-radius: 50% !important;
	}
	.back {
		color: #1e88e5;
	}
	.account-icon-main {
		transform: scale(2);
		margin-left: 30px;
		margin-top: 30px;
		margin-bottom: 30px;
	}
</style>
