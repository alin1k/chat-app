const socket = io();

const message = document.getElementById("messages");
const form = document.querySelector("form");
const usersOnline = document.getElementById("users-online");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    
    if(formData.message && formData.name){
        console.log(formData);
        socket.emit('chat message', formData);
    }

    document.getElementById("message").value = '';
})

socket.on('chat message', (message)=>{
    const {name, message: msg} = message;

    const item = document.createElement("div");
    item.classList.add("message-body")
    const nameField = document.createElement("p");
    nameField.classList.add("name");
    nameField.innerText = name;
    const messageField = document.createElement("p");
    messageField.classList.add("message");
    messageField.innerText = msg;

    item.appendChild(nameField);
    item.appendChild(messageField);
    messages.appendChild(item);
})

socket.on('user connect', ({msg, users})=>{
    const item = document.createElement("p");
    item.classList.add("server-message");
    item.innerText = msg;

    messages.appendChild(item);

    usersOnline.innerText = users;
})

socket.on('user disconnect', ({msg, users})=>{
    const item = document.createElement("p");
    item.classList.add("server-message");
    item.innerText = msg;

    messages.appendChild(item);

    usersOnline.innerText = users;
})