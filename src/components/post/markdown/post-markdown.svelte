<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import '@styles/highlightjs-copy.scss';

	import { onMount } from 'svelte';
	import { CopyButtonPlugin } from '$lib/highlight-copy';
	import ImageMarkdown from './image-markdown.svelte';
	import LinkMarkdown from './link-markdown.svelte';
	import CodespanMarkdown from './codespan-markdown.svelte';

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

<SvelteMarkdown renderers={{ image: ImageMarkdown, link: LinkMarkdown, codespan: CodespanMarkdown }} {source} options={{ breaks: true }} />
