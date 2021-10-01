export async function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value

    console.log("::: Form Submitted :::")

    if (formText !== '') {
        post('http://localhost:8081/analyze', {url: formText})
            .then(function(res) {
                document.getElementById("results").innerHTML = `Confidence: ${res.confidence}, Irony: ${res.irony}, Subjectivity: ${res.subjectivity}`
            })
    }else {
        console.log('No Link Found')
    }
}

const post = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const collectData = await response.json();
        console.log('Data received:', collectData)
        return collectData;
    } catch (e) {
        console.error({'message:': "An error occured", error: e});
    }
};