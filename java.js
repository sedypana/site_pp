const form = document.querySelector('#auth_form');
const login = document.querySelector('#login');
const password = document.querySelector('#password');

const user = JSON.parse(localStorage.getItem('main'));

form.addEventListener('submit', async function (event){
    event.preventDefault();
    const response = await fetch('test.csv');
    const usersText = await response.text();
    const users = csvToObj(usersText);
    const user = findUser({login: login.value, password: password.value}, users)
    if (user){
        localStorage.setItem('main', JSON.stringify(user));
        window.location = 'index2.html';
    } else {
        alert('Неверный логин или пароль!')
    }
});

function csvToObj(usersText){
    const usersListText = usersText.split('\n');
    const objectKeys = usersListText.shift().split(',');
    const usersList = [];
    return usersListText.map((user) => {
        const userNewObj = {};
        const userObj = user.split(',');
        objectKeys.forEach((key, index) => {
            if (index !== objectKeys.length -1){
                userNewObj[key.toString()] =  userObj[index];
            }
        })
        return userNewObj;
    })
}

function findUser(user, usersList){
    return usersList.find((userCurrent) => {
        return userCurrent.login === user.login && userCurrent.password === user.password;
    })
}