let isDragging = false;
const elemento = $('section')
  $( function() {
    $( "section" ).draggable({
      start: function() {
        isDragging = true;
      },
      stop: function() {
        isDragging = false;
      }
    });
  } );

function toggleChat(){
  const lista = document.querySelector("ul")
  const form = document.querySelector("form")
  lista.hidden = !lista.hidden;
  if(form.style.display === "none"){
    form.style.display = "flex";
  } else {
    form.style.display = "none"
  }
}

const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('inputText')
const messages = document.getElementById('messages');

//Este evento manda el evento de socket 'chat message' al backend
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

//Evento de inicio de chat
socket.on('init chat', (mensajes) => {
  console.log(mensajes)
  mensajes.forEach(mensajeObjeto => {
    const li = document.createElement("li");
    li.innerHTML = mensajeObjeto.mensaje;
    messages.appendChild(li);
  });
});

//Este evento se dispara cuando el backend me responde con 'chat message'
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if(mouseIsPressed && !isDragging) {
        const datos = {
            x: mouseX,
            y: mouseY
        }
      //socket.emit("paint", datos)
      fill(0);
      //ellipse(mouseX, mouseY, 20)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}

 