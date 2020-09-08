export function getAuthFrom() {
    return `  <form id= "registration"  class="mui-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input type="text" id="email">
        <label for="email"> insert email </label>
        </div> 
        <div class="mui-textfield mui-textfield--float-label">
        <input  type="text" id="pass">
        <label for="pass"> insert pass </label>
        </div> 
    <button id ="submit" type="submit" class="mui-btn mui-btn--primary">Submit</button>
</form>`
}


export function authWithEmailAndPass(email,password) {
    const apiKey = 'AIzaSyCPajPHYGMgera0pujHwUTX7eMnu9jZ5z0';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST', 
        body: JSON.stringify({
            email, password ,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    .then(response=> response.json())
    .then(data=> console.log(data.idToken)) //undefined
    .then(data=> data.idToken)
}