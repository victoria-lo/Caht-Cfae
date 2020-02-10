var firebase = app_fireBase;
let email = "";
let name = "";
const msgScreen = document.getElementById("messages");
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");
const userName = document.getElementById("user-name");
const db = firebase.database();
const msgRef = db.ref("/msgs"); //save in msgs folder in database

function init(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in. Get their name.
           name = user.displayName;
           email = user.email;
          msgRef.on('child_added', updateMsgs);
          userName.innerHTML = "Wleocme, " + name + "!";
        }else{
            //redirect to login page
            uid = null;
            window.location.replace("login.html");
        }
      });

    document.getElementById('log-out').addEventListener('click', logOut);
    msgForm.addEventListener('submit', sendMessage);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

const updateMsgs = data =>{
  const {email: userEmail , name, text} = data.val();

  //Check the encrypting mode
  var outputText = text + "ECRYPT";
  
  const msg = `<li class="${email == userEmail ? "msg my": "msg"}"><span class = "msg-span">
    <i class = "name">${name}: </i>${outputText}
    </span>
  </li>`
  msgScreen.innerHTML += msg;
  document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
  //auto scroll to bottom
}

function sendMessage(e){
  e.preventDefault();
  const text = msgInput.value;

    if(!text.trim()) return alert('Palese tpye yuor mesagse.'); //no msg submitted
    const msg = {
        email,
        name,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}

document.addEventListener('DOMContentLoaded',init);