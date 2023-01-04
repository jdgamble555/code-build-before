<script>
	import { browser } from '$app/environment';
	import MarkdownEditor from '$lib/form/markdown-editor.svelte';
	const source = 'butter me up!';
</script>

<br />
{#if browser}
	<!--<MarkdownEditor {source} />-->
	<h1>test</h1>
	<button id="one" class="btn">
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 16 16"
			class="bi bi-type-bold"
			fill="currentColor"
			xmlns="https://www.w3.org/2000/svg"
		>
			<path
				d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"
			/>
		</svg>
	</button>
{/if}
<button id="two" class="btn">
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 16 16"
		class="bi bi-type-bold"
		xmlns="https://www.w3.org/2000/svg"
	>
		<path
			d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"
		/>
	</svg>
</button>
<br />

<!--{#await import('$lib/markdown/markdown-editor.svelte')}
loading...
{:then MarkdownEditor}
<MarkdownEditor.default {source} />

{/await}-->

<!--<MarkdownEditor {source} />-->
<style>
	svg {
		width: 1em;
		height: 1em;
		fill: black;
	}
	.btn {
		background: none;
		border: none;
		cursor: pointer;
		display: inline-block;
		height: 24px;
		padding: 3px 5px;
		width: 28px;
		color: #222;
	}
	svg:not(:root) {
		overflow-clip-margin: content-box;
		overflow: hidden;
	}
</style>
