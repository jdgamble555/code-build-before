<script lang="ts">
	export let schema: any;

	// create schema with context
	function createSchema(schema: any) {
		// add context
		const addContext = (c: any) => ({ '@context': 'http://schema.org', ...c });

		// handle object
		if (!Array.isArray(schema)) {
			return addContext(schema);
		}

		// handle array
		schema = schema.map((v) => addContext(v));
		return schema.length === 1 ? schema[0] : schema;
	}

	$: json = `${'<scri' + 'pt type="application/ld+json">'}${JSON.stringify(createSchema(schema))}${
		'</scri' + 'pt>'
	}`;
</script>

<svelte:head>
	{@html json}
</svelte:head>
