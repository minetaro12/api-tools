<script lang="ts">
  import ShowStatus from "./ShowStatus.svelte";
  import type { ResponseData } from "../types/ResponseData";

  export let result: ResponseData;

  // タブの切り替え
  const items = [
    { id: 1, label: "Body" },
    { id: 2, label: "Headers" },
  ];
  let selectedTab = 1;
</script>

<!-- ステータスコードの表示 -->
<div class="mb-2 text-lg">
  <ShowStatus statusCode={result.statusCode} status={result.status} />
</div>

<!-- タブの切り替えボタン -->
{#each items as item}
  <button
    class="p-2 rounded-t hover:bg-gray-200"
    on:click={() => (selectedTab = item.id)}
    class:bg-gray-300={selectedTab === item.id}
  >
    {item.label}
  </button>
{/each}

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
