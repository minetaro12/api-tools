<script lang="ts">
  import ShowStatus from "./ShowStatus.svelte";
  import type { ResponseData } from "../types/ResponseData";

  export let result: ResponseData;
  let selectedTab = 1;
</script>

<!-- ステータスコードの表示 -->
<div class="mb-2 text-lg">
  <ShowStatus statusCode={result.statusCode} status={result.status} />
</div>
<!-- タブの切り替えボタン -->
<input
  type="button"
  value="Body"
  class="p-2 cursor-pointer rounded-t"
  on:click={() => (selectedTab = 1)}
  class:bg-gray-300={selectedTab === 1}
/>
<input
  type="button"
  value="Headers"
  class="p-2 cursor-pointer rounded-t"
  on:click={() => (selectedTab = 2)}
  class:bg-gray-300={selectedTab === 2}
/>

{#if selectedTab === 1}
  <pre class="text-sm bg-gray-100 overflow-x-auto p-2">{result.body}</pre>
{/if}

{#if selectedTab === 2}
  <div class="text-sm bg-gray-100 overflow-x-auto p-2">
    {#each result.headers as header}
      <pre>{header}</pre>
    {/each}
  </div>
{/if}
