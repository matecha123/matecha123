console.log("work")

async function getImg() {
    const response = await fetch("https://api.unsplash.com/search/photos?page=1&query=green_nature&per_page=1&client_id=gE2oOMHjCJR-B52gAp5cMEwZXpGFkCknpoTdZOxpkZ8");
    const img = await response.json();
    console.log(img);
  }

function changeBackground() {
    const container = document.getElementById("container");
    container.style.backgroundColor = "blue";
}

