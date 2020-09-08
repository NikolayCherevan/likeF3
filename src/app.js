import { isValid, createModal } from './utils';
import { Question } from './question.js'
import { getAuthFrom } from './auth'
import {authWithEmailAndPass}  from './auth'
import './style.scss';



const form = document.getElementById('form');
const input = form.querySelector('#questions');
const button = form.querySelector('#submit')
const seAll = document.querySelector('.seeAll');


window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
seAll.addEventListener('click', openModal)


input.addEventListener('input', () => {
    button.disabled = !isValid(input.value)
})
function submitFormHandler(event) {
    event.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        button.disabled = true;
        Question.create(question).then(() => {

            input.value = '';
            input.className = '';
            button.disabled = false;

        })
    }
}

function openModal() {
    createModal('Autorize', getAuthFrom())
    document
        .getElementById('registration')
        .addEventListener('submit', authFormHandler, {once:true})
}


function authFormHandler (event) {
    event.preventDefault();
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#pass').value
    authWithEmailAndPass(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)

}   

function renderModalAfterAuth(content) {
    if(typeof content === 'string') {
        createModal('error', content)
    } else {
        createModal('List', Question.listToHtml(content))
    }
}