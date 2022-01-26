const socket = io("http://localhost:5000");

const person=document.getElementById('person');
const message=document.getElementById('message');
const send=document.getElementById('send');
const output=document.getElementById('output');
const istyping=document.getElementById('istyping');

// click listener
send.addEventListener('click',()=>{
 
    // takes two params, the event to be emitted and the data to be sent to the server when the event is emitted
socket.emit('chat',
    {
message:message.value,
person:person.value
    }
)


message.value='';
})

// typing listener
message.addEventListener('keypress',()=>{
    // since we want to know which person is typing so we pass the person name as data to the server
    socket.emit('typing',{person:person.value});
})

socket.on('chat',(data)=>{
    istyping.innerHTML="";
    console.log(data);
    output.innerHTML+='<p><strong>'+ data.person+':' + data.message+'</p></strong>'
});

socket.on('typing',(data)=>{
    console.log(data);

    istyping.innerHTML = '<p><em>' + data.person + ' is typing a message...</em></p>';
})
