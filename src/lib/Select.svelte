<script lang="ts">
  export let value: string;
</script>

<select bind:value class="border-2 border-gray-300 bg-white rounded mt-2 p-1">
  <slot />
</select>
