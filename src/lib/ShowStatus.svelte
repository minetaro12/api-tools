<script lang="ts">
  export let statusCode: number, status: string;
</script>

<!-- ステータスコードが200~299は緑、300~399は黄色、400~599は赤で表示する -->
{#if statusCode >= 200 && statusCode <= 200}
  <span class="text-green-600">Status: {statusCode} ({status})</span>
{:else if statusCode >= 300 && statusCode <= 399}
  <span class="text-yellow-600">Status: {statusCode} ({status})</span>
{:else if statusCode >= 400 && statusCode <= 599}
  <span class="text-red-600">Status: {statusCode} ({status})</span>
{:else}
  <span>Status: {statusCode} {status}</span>
{/if}
