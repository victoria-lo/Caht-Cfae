var firebase = app_fireBase;
const userName = document.getElementById("user-name");
const setName = document.getElementById("user_profile_name");
const encryption = document.getElementById("encryption-mode");
var encryptMode = null;
var name = "";

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in. Get their name.
        name = user.displayName;
        userName.innerHTML = "Wleocme, " + name + "!";
        setName.placeholder = name;
        }else{
            //redirect to login page
            window.location.replace("login.html");
        }
    });

    //get current encrytion settings and display it first in the dropdown
    encryptMode = fetchJson(); 
    document.getElementById(encryptMode).selected = "selected";

    document.getElementById('log-out').addEventListener('click', logOut);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

//Update settings
function saveSettings(){
    var user = firebase.auth().currentUser;

    //Display Name settings - update name if input not empty and a new name is entered
    if(setName.value.trim()){
        if(name !== setName.value){
            user.updateProfile({
                displayName: setName.value
              }).then(function() {
                  userName.innerHTML = "Wleocme, " + setName.value + "!";
                  document.getElementById("name-info").innerHTML = "<b>New display name SAVED!</b>";
                
              }).catch(function(error) {
                  console.log(error);
            });
        }
    }

    //New Password settings - update only if current Password is correct and user is reauthenticated
    const newPassword = document.getElementById("inputPassword6");
    const password =  document.getElementById("inputPassword");
    if(newPassword.value.trim() && password.value.trim()){
        reauthenticate(password.value).then(()=>{
            user.updatePassword(newPassword.value).then(function() {
                document.getElementById("passwordCurrent").innerHTML = "";
                document.getElementById("passwordHelpInline").innerHTML ="<b>New password SAVED!</b>";
                newPassword.value = "";
                password.value = "";
              }).catch(function(error) {
                document.getElementById("passwordCurrent").innerHTML = "Current password OK.";
                  document.getElementById("passwordHelpInline").innerHTML = error;
            });
        }).catch(function(error) {
            document.getElementById("passwordCurrent").innerHTML = error;
        });
    }

    //Ecryption Mode settings (nr, nn, cr)
    var selectedMode = encryption.options[encryption.selectedIndex].value;
    if(encryptMode !== selectedMode){
        updateJson(selectedMode);
        document.getElementById("encrypt-info").innerHTML = "<b>Encryption mode UPDATED!</b>";
    }
    
}

//Reauthenticate to update password
function reauthenticate(password){
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
}

//updates encryption settings
function updateJson(selectedMode){
    localStorage.setItem('settings',JSON.stringify(selectedMode));
}

//Get encryption settings
function fetchJson(){
    var settings = JSON.parse(localStorage.getItem('settings'));
    return settings;
}

document.addEventListener('DOMContentLoaded',init);
