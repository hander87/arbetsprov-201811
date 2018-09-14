console.log('JSON output script ready!');

// Setting consts for data-source and HTML output elements
const JSON_SOURCE = 'data.json';
const originalOutput = document.querySelector('#dataOriginal');
const reversedOutput = document.querySelector('#dataOutput');

function getPersons() {
  // Parsing JSON with Fetch
  fetch(JSON_SOURCE)
    .then(response => response.json())
    .then(posts => {
      console.log(posts);

      // Create HTML Output for JSON
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = JSON.stringify(posts);
      div.appendChild(p);
      originalOutput.appendChild(div);

      // Create HTML Output for JSON elements
      posts.forEach(person => {
        const div = document.createElement('div');
        const li = document.createElement('li');
        li.textContent = JSON.stringify(person);
        div.appendChild(li);
        originalOutput.appendChild(div);
      });
    });
}

function reversePersons() {
  fetch(JSON_SOURCE)
    .then(response => response.json())
    .then(posts => {
      // Transform JSON to String
      const stringPosts = JSON.stringify(posts);

      // Splits up "stringified" json into an array of characters - and reverses them
      let reversedJson = stringPosts.split('').reverse();

      // Loops through array and reverses brackets/curly brackets so data format is correct
      for (let i = 0; i < reversedJson.length; i++) {
        switch (reversedJson[i]) {
          case ']':
            reversedJson[i] = '[';
            break;
          case '[':
            reversedJson[i] = ']';
            break;
          case '{':
            reversedJson[i] = '}';
            break;
          case '}':
            reversedJson[i] = '{';
            break;
        }
      }
      // Transorm array back into string
      reversedJson = reversedJson.join('');
      console.log(reversedJson);

      // Create Output for Reversed JSON
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = reversedJson;
      div.appendChild(p);
      reversedOutput.appendChild(div);

      // Transform back to JSON format
      reversedJson = JSON.parse(reversedJson);
      console.log(reversedJson);

      // Create Output for Reversed JSON elements
      reversedJson.forEach(person => {
        const div = document.createElement('div');
        const li = document.createElement('li');
        li.textContent = JSON.stringify(person);
        div.appendChild(li);
        reversedOutput.appendChild(div);
      });
    });
}
