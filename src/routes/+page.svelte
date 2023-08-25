<script lang="ts">
  import Select from "$lib/Select.svelte";
  import ShowStatus from "$lib/ShowStatus.svelte";
  import CodeMirror from "svelte-codemirror-editor";

  let url: string;
  let method: string;
  let headers: Record<string, string> = {};
  let body: string;

  let headerKey: string, headerValue: string;

  // Content-TypeがCustomの場合とメソッドがGETの場合はContent-Typeを削除
  $: {
    if (headers["Content-Type"] === "" || method === "get") {
      delete headers["Content-Type"];
      headers = headers;
    } else {
      headers["Content-Type"] = "application/json";
    }
  }

  // リクエストヘッダの追加
  function addHeader(key: string, value: string) {
    headers[key] = value;
    headerKey = "";
    headerValue = "";
  }

  // リクエストヘッダの削除
  function deleteHeader(key: string) {
    delete headers[key];
    headers = headers;
  }

  // 送信処理
  async function submit() {
    // 送信するデータ
    let data = {
      url: url,
      method: method,
      headers: headers,
      body: body,
    };

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  }

  let promise: Promise<any> | null = null;

  function handle() {
    promise = submit();
  }
</script>

<svelte:head>
  <title>API Tools</title>
</svelte:head>

<div class="border-2 border-gray-300 rounded mt-4 mx-auto max-w-[800px] p-4">
  <div class="flex">
    <input
      type="text"
      class="border-2 border-gray-300 rounded w-full mt-2 mr-1 p-1"
      placeholder="https://example.com"
      bind:value={url}
    />
    <Select bind:value={method}>
      <option value="get">GET</option>
      <option value="post">POST</option>
      <option value="put">PUT</option>
      <option value="delete">DELETE</option>
    </Select>
  </div>
  <div class:hidden={method == "get"}>
    <Select bind:value={headers["Content-Type"]}>
      <option value="application/json">application/json</option>
      <option value="application/x-www-form-urlencoded">
        application/x-www-form-urlencoded
      </option>
      <option value="text/html">text/html</option>
      <option value="application/xml">application/xml</option>
      <option value="text/plain">text/plain</option>
      <option value="">Custom</option>
    </Select>
    <div class="border-2 border-gray-300 rounded mt-2">
      <CodeMirror bind:value={body} placeholder={String('{ "foo": "bar" }')} />
    </div>
  </div>

  <div class="border-2 border-gray-300 rounded mt-2 p-4">
    <h2>Request Headers</h2>
    <div class="flex">
      <input
        type="text"
        class="border-2 border-gray-300 w-full rounded mt-2 p-1"
        placeholder="key"
        bind:value={headerKey}
      />
      <input
        type="text"
        class="border-2 border-gray-300 w-full rounded mt-2 p-1"
        placeholder="value"
        bind:value={headerValue}
      />
      <!-- リクエストヘッダの追加 -->
      <input
        type="button"
        class="bg-blue-600 text-white rounded mt-2 ml-2 px-3 py-1 hover:bg-blue-500"
        value="Add"
        on:click={() => addHeader(headerKey, headerValue)}
      />
    </div>
    <!-- リクエストヘッダの表示&削除 -->
    {#each Object.entries(headers) as [key, value]}
      <div class="mt-2">
        <input
          type="button"
          class="bg-red-600 text-white rounded px-1 hover:bg-red-500"
          value="✕"
          on:click={() => deleteHeader(key)}
        />
        <span>{key}: {value}</span>
      </div>
    {/each}
  </div>
  <input
    type="button"
    class="bg-blue-600 text-white rounded mt-2 px-3 py-2 hover:bg-blue-500"
    value="Send"
    on:click={handle}
  />
  <div class="border-2 border-gray-300 rounded mt-4 p-4 overflow-x-auto">
    {#await promise}
      <p>Wait...</p>
    {:then result}
      {#if result != null}
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
      {/if}
    {:catch error}
      <pre class="overflow-x-auto text-red-600">{error}</pre>
    {/await}
  </div>
</div>

<!-- <pre>
{JSON.stringify(
    {
      url: url,
      method: method,
      headers: headers,
      body: body,
    },
    null,
    2
  )}
</pre> -->
