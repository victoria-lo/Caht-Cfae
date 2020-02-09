var firebase = app_fireBase;
function init(){
    let name = "";
    let uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in. Get their name and userID.
          uid = user.uid;
          name = user.displayName;
          console.log(name);
        }else{
            //redirect to login page
            uid = null;
            window.location.replace("login.html");
        }
      });

    document.getElementById('log-out').addEventListener('click', logOut);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

document.addEventListener('DOMContentLoaded',init);