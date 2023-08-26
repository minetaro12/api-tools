<script lang="ts">
  export let isOpen = false;
</script>

<!-- ボタン -->
<input
  type="button"
  value="Menu"
  on:click={() => (isOpen = !isOpen)}
  class="bg-gray-800 border-2 border-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-700"
/>

<!-- メニュー部分 -->
{#if isOpen}
  <div
    class="popup fixed top-14 right-4 bg-white text-black border-2 border-gray-300y px-3 py-2 rounded"
  >
    <nav>
      <ul class="[&>li]:m-2">
        <li>
          <a
            href="https://tool.0sn.net"
            target="_blank"
            rel="noopener noreferrer">DNS Tools</a
          >
        </li>
        <li>
          <a
            href="https://github.com/minetaro12/api-tools"
            target="_blank"
            rel="noopener noreferrer">GitHub</a
          >
        </li>
      </ul>
    </nav>
  </div>
{/if}
