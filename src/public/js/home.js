
const socket = io()

let user;

window.onload = () => {
    Swal.fire({
        title:"Identificate",
        text:"Ingrese su nombre de usuario",
        input:"text",
        inputValidator: (value) => {

            return !value && "Necesitas escribir un nombre para continuar"

        },
        confirmButtonText:"OK"
    }).then((result) => {
        console.log(result)
        user = result.value
        socket.emit("auth",user)
    })
}


const input = document.getElementById("chatbox")
const log = document.getElementById("log")


input.addEventListener("keyup", e => {
    
    if(e.key === "Enter"){

        console.log(user,input.value)
        socket.emit("message",{ user: user, message: input.value })

    }

})


socket.on("messageLogs", data => {

    let messages = ""
console.log(data)
    data.forEach(msg => {
        messages+=`${msg.user} dice ${msg.message}</br>`
    })

    log.innerHTML=messages
})

