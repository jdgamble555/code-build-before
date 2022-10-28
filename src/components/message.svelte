<script lang="ts">
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { snackbar, snackmsg } from '$lib/stores';
</script>

<Snackbar bind:this={$snackbar} labelText={$snackmsg} timeoutMs={4000}>
	<Label />
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
