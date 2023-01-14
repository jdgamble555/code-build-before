<script lang="ts">
	export let source: string;

	let fontWidthElem: HTMLElement;
	let fontWidth: number;
	let editorWidth: number;
	let lineNumEl: HTMLElement;
	let lineNumbersWidth: number;
	let charactersPerLine: number;

	$: {
		fontWidth = fontWidthElem?.getBoundingClientRect().width || 0;
		lineNumbersWidth = lineNumEl?.scrollWidth || 0;
		charactersPerLine = Math.floor((editorWidth - lineNumbersWidth) / fontWidth);
	}

	function wrapped(str: string, timesWrapped: number): number {
		if (charactersPerLine && str.length > charactersPerLine) {
			return wrapped(str.substring(charactersPerLine), timesWrapped + 1);
		}
		return timesWrapped;
	}
</script>

<div class="editor-wrapper">
	<div class="editor" bind:clientWidth={editorWidth}>
		<div class="line-numbers" bind:this={lineNumEl}>
			{#if charactersPerLine > 111}
				{#each source.split('\n') as subStr, index}
					<div style:margin-bottom="calc(var(--line-height) * {wrapped(subStr, 0)})">
						{index + 1}
					</div>
				{/each}
			{/if}
		</div>
		<textarea
			id="controlId"
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
		margin-left: -15px;
		padding-right: 20px;
		text-align: right;
		color: rgb(48, 48, 48);
	}

	.numbered-textarea {
		line-height: var(--line-height);
		overflow-y: auto;
		margin: 0;
		padding: 0;
		border: 0;
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
