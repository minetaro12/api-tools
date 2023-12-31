<script lang="ts">
  import Result from "$lib/Result.svelte";
  import Select from "$lib/Select.svelte";
  import CodeMirror from "svelte-codemirror-editor";

  import type { ResponseData } from "../types/ResponseData";
  import type { RequestData } from "../types/RequestData";

  let scheme: "http://" | "https://"; // http:// or https://
  let url: string; // example.com
  let method: RequestData["method"]; // リクエストメソッド
  let headers: Record<string, string> = {}; // リクエストヘッダ
  let body: string; // リクエストボディ

  let [headerKey, headerValue]: string = "";

  // Content-TypeがCustomの場合はContent-Typeを削除
  $: {
    if (headers["Content-Type"] === "" || method === "get") {
      delete headers["Content-Type"];
      headers = headers;
    }
  }

  // リクエストヘッダの追加
  function addHeader(key: string, value: string) {
    // 空やundefinedの場合は追加しない
    if (key === "" || value === "" || key === undefined || value === undefined)
      return;

    headers[key] = value;
    [headerKey, headerValue] = "";
  }

  // リクエストヘッダの削除
  function deleteHeader(key: string) {
    delete headers[key];
    headers = headers;
  }

  // 送信処理
  async function submit() {
    // 送信するデータの格納
    let data: RequestData = {
      url: `${scheme}${url}`,
      method: method,
      headers: headers,
      body: body,
    };

    // リクエストの送信
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ResponseData = await res.json();

    if (res.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  }

  let promise: Promise<ResponseData> | null = null;

  function handle() {
    promise = submit();
  }
</script>

<svelte:head>
  <title>API Tools</title>
</svelte:head>

<div class="border-2 border-gray-300 rounded mt-4 mx-auto max-w-[800px] p-4">
  <div class="flex">
    <Select bind:value={scheme}>
      <option value="https://">https://</option>
      <option value="http://">http://</option>
    </Select>
    <input
      type="text"
      class="border-2 border-gray-300 rounded w-full mt-2 mr-1 p-1"
      placeholder="example.com"
      bind:value={url}
      on:keydown={(e) => {
        // Enterキーで送信
        if (e.key === "Enter") {
          handle();
        }
      }}
    />
    <Select bind:value={method}>
      <option value="get">GET</option>
      <option value="post">POST</option>
      <option value="put">PUT</option>
      <option value="delete">DELETE</option>
    </Select>
  </div>
  <!-- GETメソッドのときはContent-Typeとbodyエディタを表示しない -->
  {#if method != "get"}
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
  {/if}

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
        on:keydown={(e) => {
          // Enterキーで追加
          if (e.key === "Enter") {
            addHeader(headerKey, headerValue);
          }
        }}
      />
      <!-- リクエストヘッダの追加 -->
      <input
        type="button"
        class="bg-blue-600 text-white rounded mt-2 ml-2 px-3 py-1 cursor-pointer hover:bg-blue-500"
        value="Add"
        on:click={() => addHeader(headerKey, headerValue)}
      />
    </div>
    <!-- リクエストヘッダの表示&削除 -->
    {#each Object.entries(headers) as [key, value]}
      <div class="mt-2">
        <input
          type="button"
          class="bg-red-600 text-white rounded px-1 cursor-pointer hover:bg-red-500"
          value="Del"
          on:click={() => deleteHeader(key)}
        />
        <span>{key}: {value}</span>
      </div>
    {/each}
  </div>
  <!-- 送信ボタン -->
  <input
    type="button"
    class="bg-blue-600 text-white rounded mt-2 px-3 py-2 cursor-pointer hover:bg-blue-500"
    value="Send"
    on:click={handle}
  />
  <!-- 結果の表示 -->
  <div class="mt-4">
    {#await promise}
      <p>Wait...</p>
    {:then result}
      {#if result != null}
        <Result {result} />
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
