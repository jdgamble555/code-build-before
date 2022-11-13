<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	let active = 'New';
</script>

<div>
	<TabBar tabs={['New', 'Updated', 'Top']} let:tab bind:active>
		<Tab {tab}>
			<Label class="no-bold">{tab}</Label>
		</Tab>
	</TabBar>
	{#if active === 'New'}
		newish
	{:else if active === 'Updated'}
		updater
	{:else}
		top
	{/if}
</div>
