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
  var encryptMode = fetchJson();
  var outputText = text;
  
  if(encryptMode == "nr"){
    outputText = normalEncrypt(outputText);
  }else if(encryptMode == "cr"){
    outputText = crazyEncrypt(outputText);
  }
  
  //load messages
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

//Get encryption settings
function fetchJson(){
  var settings = JSON.parse(localStorage.getItem('settings'));
  return settings;
}


function crazyEncrypt(text){
  var words = text.replace(/[\r\n]/g, '').toLowerCase().split(' ');
  var newWord = '';
  var newArr =[];

  words.map(function(w) {
    if(w.length > 1){
      w.split('').map(function() {
        var hash = Math.floor(Math.random() * w.length);
        newWord += w[hash];
        w = w.replace(w.charAt(hash), '');
      });
      newArr.push(newWord);
      newWord = '';
    
    }else{
      newArr.push(w);
    }
  });
  text = newArr.join(' ');
  return text;
}

//Normal encryption - first and last letter fixed position
function normalEncrypt(text){
  var words = text.replace(/[\r\n]/g, '').toLowerCase().split(' ');
  var newWord = '';
  var newArr =[];

  words.map(function(w) {
    if(w.length > 1){
      var lastIndex = w.length-1;
      var lastLetter = w[lastIndex];

      //add the first letter
      newWord += w[0];
      w = w.slice(1,lastIndex);

      //scramble only letters in between the first and last letter
      w.split('').map(function(x) { 
          var hash = Math.floor(Math.random() * w.length);
          newWord += w[hash];
          w = w.replace(w.charAt(hash), '');
      });

      //add the last letter
      newWord+=lastLetter;
      newArr.push(newWord);
      newWord = '';
    }else{
      newArr.push(w);
    }
  });
  text = newArr.join(' ');
  return text;
}
document.addEventListener('DOMContentLoaded',init);

