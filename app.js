document.getElementById('joke-form').addEventListener('submit', loadJokes);

function loadJokes(e) {

    const jokeNum = document.getElementById('jokeNum').value;

    if (jokeNum === '') {
        //Show Alert.
        document.getElementById('alert').innerText = 'Please enter a valid input!';

        setTimeout(function () {
            document.getElementById('alert').innerText = '';
        }, 3000)

    } else {

        //create XMLHTTPReq obj.
        const xhr = new XMLHttpRequest();

        //Action on success.
        xhr.onload = function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                const jokeArr = data.value;
                let output = '<ul>';
                jokeArr.forEach((joke) => {
                    output += `
                        <li>${joke.joke}</li>
                    `
                });

                output += '</ul>';

                document.getElementById('jokes').innerHTML = output;

            }
        }

        //Open request.
        xhr.open('GET', `http://api.icndb.com/jokes/random/${jokeNum}`, true);

        //Send request.
        xhr.send();
    }

    e.preventDefault();

}