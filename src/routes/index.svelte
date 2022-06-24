<script context="module">
  export async function load({ fetch }) {
    const request = await fetch("https://www.gov.uk/bank-holidays.json");

    if (request.ok) {
      let result = await request.json();

      return {
        status: 200,
        props: { regions: Array.from(Object.values(result)) },
      };
    }
  }
</script>

<script>
  export let regions = [];
</script>

<h1>Here are a list of UK holidays:</h1>

<ul>
  {#each regions as region}
    <li>
      {region.division}

      <ul>
        {#each region.events as event}
          <li>{event.title} - {event.date}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
