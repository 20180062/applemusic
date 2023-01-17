import "./components/app-component"

const title = document.querySelector("title");
title.textContent = "Applemusic Search";
const body = document.querySelector("body");
const appComponent = document.createElement("app-component"); //selbst erstelltes Element, macht im Endeffekt das gesamte Programm aus
body.appendChild(appComponent); //app-component wird zum body hinzugefügt


