const area = document.getElementById('output');

export class Question {

    static create(question) {
        return fetch('https://hnpu-asker.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)

    }


    static renderList() {
        const questions = getQuestionsFromLocalStorage();
        const html = questions.length ?
            questions.map(toCard).join('')
            : `<div class="mui--text-headline">No questions</div>`;
        const area = document.getElementById('output');
        area.innerHTML = html;
    }
    static listToHtml(questions) {
        return questions.length
        ? `<ol> ${questions.map(q=> `<li> ${q.text}  </li>`).join('')} </ol>  ` :
        `<div>  NO ANSWERS</div>`
    }
    static fetch(token) {
        if(!token){
            return Promise.resolve('<p class ="error"> u dont have right </p>')
        }
        fetch(`https://hnpu-asker.firebaseio.com/questions.json?auth=${token}`)
        .then( response => response.json())
        .then(response=> {
            if(response.error) {
                return `<p class="error"> ${response.error} </p>`
            }
            return response? Object.keys(response).map(key=>({
                ...response[key], 
                id: key
            })) : []
        })
    }
}


function addToLocalStorage(question) {

    const all = getQuestionsFromLocalStorage();
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))

}


function getQuestionsFromLocalStorage() {

    return JSON.parse(localStorage.getItem('questions') || '[]')
}



function toCard(question) {
    return `
    <div class = "wrapper">
    <div class="mui--text-dark-secondary"> 
    ${new Date(question.date).toLocaleString()}
    </div>
    <div>
      ${question.text}
    </div>
    </div>
    <br>`
}