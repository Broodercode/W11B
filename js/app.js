//lol this ended up being way harder than I thought it was going to be, but I am glad I achieved the result I wanted, which is a list that is dynmamic based on what is typed



let digimonName = document.getElementById("digi-name");
var API;

//response success
function onSuccess(response) {
  if (response) {
    console.log("API successfully connected");
    API = response;
  }
}

//error
function onError(error) {
  if (error) {
    console.log("fail");
    console.log(error);
  }
}

//api call
function getDigimon() {
  axios
    .request({
      method: "GET",
      url: "https://digimon-api.vercel.app/api/digimon",
    })
    .then(onSuccess)
    .then(onError);
}

//api initialize
getDigimon();

//function
function updateName(e) {
  userInput = e.target.value;
  let list = document.getElementById("digi-list");

  //reset list
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  //only acts if api-data present
  if (API.data) {
    //placing data into an array
    let digiArr = API.data;
    let name;

    //iterate through the array
    digiArr.forEach((el, index) => {
      userArr = [];
      name = el.name;

      //creating html elements
      let result = name.includes(userInput);
      let li = document.createElement("li");

      let content = document.createTextNode(name);
      li.appendChild(content);
      li.setAttribute("id", `${index}`);

      list.append(li);

      if (!result) {
       //removing negative results
        let removed = document.getElementById(`${index}`);
        removed.remove();
      }
    });
  } else {
    console.log("no API");
  }
}

digimonName.addEventListener("input", updateName);
