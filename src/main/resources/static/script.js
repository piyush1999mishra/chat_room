var stompClient=null
var key="This is the SECRET KEY"



   function sendMessage(){

    var encryptedMsg = CryptoJS.AES.encrypt(
            document.getElementById("message-value").value,
            key
         ).toString();

    var encryptedName = CryptoJS.AES.encrypt(
                     localStorage.getItem("name"),
                     key
                  ).toString();

    var encryptedRoom = CryptoJS.AES.encrypt(
                         localStorage.getItem("room"),
                         key
                      ).toString();

    var getValue= document.getElementById("message-value");
            if (getValue.value !="") {
                getValue.value = "";
            }

    let jsonOb={
        name:encryptedName,
        content:encryptedMsg,
        room:encryptedRoom
    }


    stompClient.send("/app/message",{},JSON.stringify(jsonOb));
   }

function connect()
{
        let socket=new SockJS("/server1")
        stompClient=Stomp.over(socket)
        stompClient.connect({},function(frame){
            console.log("Connected : "+frame)
            $("#name-from").addClass('d-none')
              $("#chat-room").removeClass('d-none')
                //subscribe
                stompClient.subscribe("/topic/return-to",function(response){
                        showMessage(JSON.parse(response.body))
                })
        })
}


 function showMessage(message)
 {
    var decryptedRoom = CryptoJS.AES.decrypt(
                 message.room,
                 key
              ).toString(CryptoJS.enc.Utf8);
if(decryptedRoom == localStorage.getItem("room")){

var decryptedMsg = CryptoJS.AES.decrypt(
             message.content,
             key
          ).toString(CryptoJS.enc.Utf8);

 var decryptedName = CryptoJS.AES.decrypt(
              message.name,
              key
           ).toString(CryptoJS.enc.Utf8);
    $("#message-container-table").prepend(`<tr><td><b>${decryptedName} :</b> ${decryptedMsg}</td></tr>`)
}


 }

$(document).ready((e)=>{
   $("#login").click(()=>{
       let name=$("#name-value").val()
       localStorage.setItem("name",name)

       let room=$("#room-value").val()
              localStorage.setItem("room",room)
       $("#name-title").html(`Welcome , <b>${name} </b>`)

       connect();
   })
   $("#send-btn").click(()=>{
    sendMessage()

   })

$("#logout").click(()=>{
    localStorage.removeItem("name")
    if(stompClient!==null)
    {
        stompClient.disconnect()
         $("#name-from").removeClass('d-none')
         $("#chat-room").addClass('d-none')
         console.log(stompClient)
    }
})

})