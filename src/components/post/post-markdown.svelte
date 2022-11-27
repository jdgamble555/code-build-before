<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import '@styles/highlightjs-copy.scss';

	import { onMount } from 'svelte';
	import { CopyButtonPlugin } from '$lib/highlight-copy';

	export let source: string;

	onMount(() => {
		hljs.addPlugin(new CopyButtonPlugin());
		hljs.addPlugin({
			'after:highlightElement': ({ result, el }) => {
				const lines = document.createElement('div');
				if (!result.value.includes('<span class="line-num">')) {
					lines.innerHTML = result.value.replace(/^/gm, '<span class="line-num"></span>');
				}
				el.replaceChildren(...lines.childNodes);
			}
		});
		hljs.highlightAll();
	});
</script>

<SvelteMarkdown {source} />

<!-- https://stackoverflow.com/questions/67954877/how-to-set-numbers-to-pre-with-js-css -->
<style global lang="scss">
	pre {
		border-radius: 5px;
		counter-reset: linecounter;
	}

	pre .line-num {
		min-width: 3ch;
		display: inline-block;
		border-right: 1px solid;
		margin-right: 3ch;
		color: #c5c8c6;
	}

	pre .line-num::before {
		counter-increment: linecounter;
		content: counter(linecounter);
	}

	.hljs {
		padding: 1rem !important;
		line-height: 1.45 !important;
	}
</style>
