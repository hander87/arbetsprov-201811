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
  reversedOutput.innerHTML = '';
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
      console.log('Transorm array back into string', reversedJson);

      // CORRECTION: Flip the Key Value proccess, so we get {"beans":"nosrep"}
      // New array to store objects in later
      let newObjectsArray = [];
      reversedJson = JSON.parse(reversedJson);

      // Split our JSON into its objects
      reversedJson.forEach(eachObject => {

        // New empty object to store values in later
        let newObjects = {};
        // Object.keys() grabs the key values
        let objectKeys = Object.keys(eachObject);

        // Loops through each key value it gets
        for (let i = 0; i < objectKeys.length; i++) {

          // Takes the key value, and reverses it
          objectRevKey = objectKeys[i].split('').reverse().join('');

          // The new key gets its original value - then it is pushed into the empty array.
          newObjects[objectRevKey] = eachObject[objectKeys[i]];
        }
        // When loop is complete, the objects is pushed into the empty array.
        newObjectsArray.push(newObjects);
      });

      // The key value is now flipped and goes through output process!
      newObjectsArray = JSON.stringify(newObjectsArray);

      // Create Output for Reversed JSON
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = newObjectsArray;
      div.appendChild(p);
      reversedOutput.appendChild(div);

      // Transform back to JSON format
      newObjectsArray = JSON.parse(newObjectsArray);
      console.log(newObjectsArray);

      // Create Output for Reversed JSON elements
      newObjectsArray.forEach(person => {
        const div = document.createElement('div');
        const li = document.createElement('li');
        li.textContent = JSON.stringify(person);
        div.appendChild(li);
        reversedOutput.appendChild(div);
      });
    });
}
