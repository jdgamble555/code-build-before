<script lang="ts">
	import { onMount } from 'svelte';

	export let source: string;

	let fontWidthElem: HTMLElement;
	let fontWidth: number;
	let editorWidth: number;

	onMount(() => {
		fontWidth = fontWidthElem.getBoundingClientRect().width;
	});

	let lineNumbersWidth = 30;
	$: charactersPerLine = Math.floor((editorWidth - lineNumbersWidth) / fontWidth) - 1;

	function wrapped(str: string, charactersPerLine: number, timesWrapped: number): number {
		if (str.length > charactersPerLine) {
			return wrapped(str.substring(charactersPerLine).trim(), charactersPerLine, timesWrapped + 1);
		}
		return timesWrapped;
	}
</script>

<div class="editor-wrapper">
	<div class="editor" bind:clientWidth={editorWidth}>
		<div class="line-numbers" style:width="{lineNumbersWidth}px">
			{#each source.split('\n') as subStr, index}
				<div
					class="line-numbers"
					style:margin-bottom="calc(var(--line-height) * {wrapped(subStr, charactersPerLine, 0)})"
				>
					{index + 1}
				</div>
			{/each}
		</div>
		<textarea
			class="numbered-textarea"
			bind:value={source}
			style:width="{charactersPerLine}ch"
			rows="15"
		/>
		<div id="font-width" bind:this={fontWidthElem}>a</div>
	</div>
</div>

<style lang="scss">
	.editor-wrapper {
		--line-height: 21px;
		padding: 20px 10px;
		//background: #282a3a;
		border-radius: 2px;
	}

	.editor {
		position: relative;
		display: flex;
		width: 100%;
		font-family: monospace;
		line-height: var(--line-height);
	}

	.line-numbers {
		padding-right: 10px;
		text-align: right;
		//color: #1e88e5 !important;
        color: rgb(48, 48, 48);
        //font-weight: bold;
	}

	.numbered-textarea {
		line-height: var(--line-height);
		overflow-y: hidden;
		margin: 0;
		padding: 0;
		border: 0;
		//background: #282a3a;
		//color: #fff;
		outline: none;
		resize: none;
	}

	#font-width {
		position: absolute;
		top: -1000px;
		left: -1000px;
		visibility: hidden;
	}
</style>
