<script lang="ts">
  import ShowStatus from "./ShowStatus.svelte";
  import type { ResponseData } from "../types/ResponseData";

  export let result: ResponseData;
</script>

<div class="mb-2">
  <ShowStatus statusCode={result.statusCode} status={result.status} />
</div>
<details>
  <summary>Response Headers</summary>
  {#each result.headers as header}
    <pre>{header}</pre>
  {/each}
</details>
<pre class="mt-2">{result.body}</pre>
