console.log('JSON output script ready!');

const JSON_URL = 'data.json';
const originalOutput = document.querySelector('#dataOriginal');
const htmlOutput = document.querySelector('#dataOutput');

function getPersons() {
  fetch(JSON_URL)
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
        
      // Create Output for JSON
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = JSON.stringify(posts);
      div.appendChild(p);
      originalOutput.appendChild(div);
    
      // Create Output for JSON elements
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
  fetch(JSON_URL)
    .then(response => response.json())
    .then(posts => {
      const stringPosts = JSON.stringify(posts);

      // Splits up stringified array into characters and reverse them
      let reversedJson = stringPosts.split('').reverse();

      // Loops trough results and swtiches brackets and curly brackets
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
      htmlOutput.appendChild(div);

      // Transform back to JSON format
      JSON.parse(reversedJson);
      console.log(reversedJson);
    });
}
