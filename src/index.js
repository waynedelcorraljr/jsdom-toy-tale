let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  return fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(json => renderToys(json))
}


function renderToys(toys) {
  const toyCollection = document.querySelector('#toy-collection');
  toys.forEach(toy => {
    let div = document.createElement('div');
    div.classList.add("card");
    div.id = toy.id
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');
    button.classList.add("like-btn")
    button.innerHTML = "Like <3"
    button.id = toy.id
    button.addEventListener('click', (e) => {
      likeToy(button.id);
      e.preventDefault();
    });
    h2.innerHTML = toy.name
    img.src = toy.image
    img.classList.add("toy-avatar")
    p.innerHTML = `${toy.likes} Likes`
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    toyCollection.appendChild(div);
  });
  console.log(toys);
}



function createToy(name, image) {

  let toyData = {
    name: name,
    image: image,
    likes: 0
  };

  let configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
  };

  return fetch("http://localhost:3000/toys", configObj)
        .then(resp => resp.json())
        .then(json => renderToys(json))
        .catch(error => console.log(error))
}

function likeToy(id) {
  
  let toyId = parseInt(id, 10);
  
  let toyCard = document.querySelector("[id=" + "'" + `${id}` + "'" + "].card");
  let toyCardLikesText = toyCard.querySelector('p').innerHTML;
  let likeCountText = toyCardLikesText.split()[0];
  let currentLikes = parseInt(likeCountText);

  let increasedCount = currentLikes + 1;

  let likeCount = {
    likes: increasedCount
  };

  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(likeCount)
  };

fetch(`http://localhost:3000/toys/${toyId}`, configObj)
      .then(resp => resp.json())
      .then(json => {
        toyCardLikesText = `${json.likes} likes`;
      })
}


document.addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementsByName("name")[0].value;
  let image = document.getElementsByName("image")[0].value;
  createToy(name, image);
})

document.addEventListener('DOMContentLoaded', function() {
  fetchToys(); 
})
