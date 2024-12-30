const searchBtnEle = document.getElementById("nav-search-btn");
const clearBtnEle = document.getElementById("nav-clear-btn");
const navInputEle = document.getElementById("nav-input-id");
const bookNowBtn = document.getElementById("book-now-btn");
const searchResultDiv = document.getElementById("search-result-id");

searchBtnEle.addEventListener("click", function () {
    searchDestination(navInputEle.value);
});

clearBtnEle.addEventListener("click", function () {
    navInputEle.value = "";
    searchResultDiv.innerHTML = '';
});

navInputEle.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchDataAndDisplayResults(navInputEle.value);
    }
  });

  function fetchDataAndDisplayResults(query) {
    query = query.toLowerCase();
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let results = [];

        // Check for beach recommendations
        if (query === 'beach' || query === 'beaches') {
          data.beaches.forEach(beach => {
            results.push({
              name: beach.name,
              imageUrl: beach.imageUrl,
              description: beach.description
            });
          });
        }

        // Check for temple recommendations
        if (query === 'temple' || query === 'temples') {
          data.temples.forEach(temple => {
            results.push({
              name: temple.name,
              imageUrl: temple.imageUrl,
              description: temple.description
            });
          });
        }

        // Check for country recommendations
        data.countries.forEach(country => {
          if (country.name.toLowerCase().includes(query)) {
            country.cities.forEach(city => {
              results.push({
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description
              });
            });
          }
        });

        displayResults(results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById('search-result-id');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }

    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';

      const image = document.createElement('img');
      image.src = result.imageUrl;
      image.alt = result.name;

      const name = document.createElement('h3');
      name.textContent = result.name;

      const description = document.createElement('p');
      description.textContent = result.description;

      resultItem.appendChild(image);
      resultItem.appendChild(name);
      resultItem.appendChild(description);
      resultsContainer.appendChild(resultItem);
    });
  }