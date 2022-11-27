<script>
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/breadcrumbs';
	import PostDetail from '@components/post/post-detail.svelte';

	const post = $page.data.post;
	const details = true;

	breadcrumbs().addBC(post.title);
</script>

<PostDetail {post} {details} />
