var firebase = app_fireBase;
function init(){
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in. Save the user id.
          uid= user.id;
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
        // Sign-out successful.
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {
        // An error happened.
      });
}

document.addEventListener('DOMContentLoaded',init);