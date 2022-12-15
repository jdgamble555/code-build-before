<script lang="ts">
	import { page } from '$app/stores';
	import PostUser from '@components/post/post-user.svelte';
</script>

{#key $page}
	<PostUser />
{/key}
