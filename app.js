var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=kDo-rEc-FX4zhJneohlUZ-vxIX706T8Xf7NZvcHyzqk";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

const getData = (response) => {
  const plantData = JSON.parse(response).data;
  console.log(plantData);

  plantData.filter((plant) => (plant.year >= 1800))

  for (i = 0; i < plantData.length; i++) {
    addToDom(plantData[i]);
  }
}

const addToDom = (plant) => {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('class', 'plant');

  const plant_name = document.createElement('h2');
  plant_name.innerText = plant.common_name;

  const image_url = plant.image_url;
  const plant_img = document.createElement('img');

  plant_img.setAttribute('src', image_url);
  plant_img.setAttribute('class', 'plant_img');

  wrapperDiv.appendChild(plant_name);
  wrapperDiv.appendChild(plant_img);

  document.getElementById('plants').appendChild(wrapperDiv);
}

const displayContent = () => {
  corsPromise().then(request => request.onload = request.onerror = function () {
    getData(request.response);
  });
}

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      getData(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
