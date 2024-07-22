<script lang="ts">
  export let isOpen = false;

  const close = (event: Event) => {
    if (event.target === event.currentTarget) {
      isOpen = false;
    }
  };
</script>

<!-- ボタン -->
<button
  on:click={() => (isOpen = !isOpen)}
  class="bg-gray-700 border-gray-300 px-3 py-2 rounded hover:bg-gray-500"
>
  Menu</button
>

<!-- メニュー部分 -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class:hidden={!isOpen}
  class="fixed flex flex-row-reverse w-full h-full bg-black bg-opacity-30 top-0 left-0"
  on:click={close}
>
  <div class="flex flex-col bg-gray-700 py-10 font-semibold text-xl shadow-2xl">
    <a
      href="https://tool.0sn.net"
      target="_blank"
      rel="noopener noreferrer"
      class="px-7 py-3 hover:bg-gray-500">DNS Tools</a
    >
    <a
      href="https://github.com/minetaro12/api-tools"
      target="_blank"
      rel="noopener noreferrer"
      class="px-7 py-3 hover:bg-gray-500">GitHub</a
    >
  </div>
</div>
