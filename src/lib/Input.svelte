<script lang="ts">
  export let value: string, placeholder: string;
</script>

<input
  type="text"
  class="border-2 border-gray-300 rounded w-full mt-2 p-1"
  {placeholder}
  bind:value
/>
