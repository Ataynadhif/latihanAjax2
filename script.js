const btn = document.getElementById("getData");
const card = document.querySelector(".cards");

btn.addEventListener("click", async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=36", {
    method: "GET",
  });
  const json = await response.json();
  const results = json.results;
  const datas = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i].url;
    const responsePoke = await fetch(result, {
      method: "GET",
    });
    const json = await responsePoke.json();
    const cardData = {
      numbs: json.id,
      names: json.name,
      imgs: json.sprites.front_default,
      type: json.types[0].type.name,
    };
    datas.push(cardData);
  }
  let output = "";
  const bg = [
    {
      type: "grass",
      bg: "#8dd694",
      border: "#5dad65",
    },
    {
      type: "poison",
      bg: "#a55db1",
      border: "#8a4a95",
    },
    {
      type: "fire",
      bg: "#e69d8d",
      border: "#c67d6d",
    },
    {
      type: "water",
      bg: "#8dc6e6",
      border: "#6f9eca",
    },
    {
      type: "bug",
      bg: "#bddd7a",
      border: "#a2c170",
    },
    {
      type: "normal",
      bg: "#b1b1b1",
      border: "#959595",
    },
    {
      type: "electric",
      bg: "#e7c859",
      border: "#d0b34a",
    },
    {
      type: "ground",
      bg: "#efbe85",
      border: "#d0a068",
    },
    {
      type: "fairy",
      bg: "#eea1e2",
      border: "#c77fbc",
    },
  ];
  datas.forEach((pokemon) => {
    let warna = bg.find((data) => data.type === pokemon.type.toLowerCase());
    if (warna === undefined) {
      warna = {
        type: "grass",
        bg: "white",
        border: "white",
      };
    }
    output += `
        <div class="card" style="background-color: ${warna.bg}; border-color:${warna.border}">
          <div class="title">
            <p>${pokemon.numbs}</p>
            <span>:</span>
            <span>${pokemon.names}</span>
          </div>
          <img src="${pokemon.imgs}" />
          <p>Type: <span>${pokemon.type}</span></p>
        </div>`;
  });
  card.innerHTML = output;
});
