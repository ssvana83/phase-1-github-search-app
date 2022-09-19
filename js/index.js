//first defer out the src tage in html file since it is in the body 
//when dealing with a form start with adding an eventListener
//grab the form element/id off of the DOM using getElementById
//addEventListener including a preventDefault


const form = document.getElementById("github-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  // event.target[0].value
  //data we want to pass from the form
  fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
  .then(response => response.json())
  .then(response => {
    //login username, avatar, profile(url)
    //map preferred because we want an array returned
    response.items.map(item => {
      const li = document.createElement("li")
      const h2 = document.createElement("h2")
      h2.textContent = item.login

      h2.addEventListener("click", e => showUserRepos(item.login, e))
      const img = document.createElement("img")
      img.src = item.avatar_url

      //now we need to append
      const userList = document.querySelector("#user-list")
      li.append(h2, img)
      userList.append(li)
    })
  })

})

function showUserRepos(username, e) {
  const reposList = document.getElementById("repos-list")
  reposList.innerHTML
  e.preventDefault()
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(response => response.map(repo => {
    const li = document.createElement("li")
    const h1 = document.createElement("h1")
    h1.textContent = repo.name
    
    li.append(h1)
    reposList.append(li)

  }))
  }
