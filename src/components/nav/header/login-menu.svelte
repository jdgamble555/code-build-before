<script lang="ts">
	import Menu, { SelectionGroupIcon } from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button from '@smui/button';
	import { auth } from '$lib/database';

	let menu: Menu;

	const { user, logout } = auth;

	// todo: put no-bold in material global styles
</script>

<div>
	<Button class="no-bold" on:click={() => menu.setOpen(true)}>
		{#if $user && $user.photoURL}
			<img class="avatar" src={$user.photoURL} alt={$user.displayName} width="35" height="35" />
		{:else}
			<span class="material-icons">account_circle</span>
		{/if}
	</Button>
	<Menu bind:this={menu} anchorCorner="BOTTOM_LEFT">
		<List>
			<Item on:SMUI:action={() => {}}>
				<SelectionGroupIcon>
					<i class="material-icons back">settings</i>
				</SelectionGroupIcon>
				<Text>Account Settings</Text>
			</Item>
			<Item on:SMUI:action={() => {}}>
				<SelectionGroupIcon>
					<i class="material-icons back">dashboard</i>
				</SelectionGroupIcon>
				<Text>Dashboard</Text>
			</Item>
			<Item on:SMUI:action={() => {}}>
				<SelectionGroupIcon>
					<i class="material-icons back">bookmarks</i>
				</SelectionGroupIcon>
				<Text>Bookmarks</Text>
			</Item>
			<Item on:SMUI:action={() => {}}>
				<SelectionGroupIcon>
					<i class="material-icons back">account_box</i>
				</SelectionGroupIcon>
				<Text>My Posts</Text>
			</Item>
			<Separator />
			<Item on:SMUI:action={() => {}}>
				<SelectionGroupIcon>
					<i class="material-icons back">post_add</i>
				</SelectionGroupIcon>
				<Text>New Post</Text>
			</Item>
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

<style>
	.avatar {
		width: 35px !important;
		height: 35px !important;
		border-radius: 50% !important;
	}
	.back {
		color: #1e88e5;
	}
</style>
