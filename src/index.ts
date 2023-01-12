import { searchAppleMusic } from "./applemusic";

const form = document.querySelector("form");
const searchword = document.querySelector("input");
//const radio = document.querySelector("");
const results = document.querySelector("#results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    results.innerHTML = "Lädt...";

    //const data = await searchAppleMusic(searchword.value, "album"/*radio.value*/);

    //const response = await fetch(`https://itunes.apple.com/search?term=${searchword.value}&entity=${entity}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${searchword.value}&entity=album`);
    const data = await response.json();
    
    results.innerHTML = "";

    data.results.forEach((item: { artistName: any; collectionName: any; artworkUrl100: any; }) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.artistName} - ${item.collectionName}</p>
        `;
        results.appendChild(div);
    });
});

//<img src="${item.artworkUrl100}" alt="${item.collectionName}"/>