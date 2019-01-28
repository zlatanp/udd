var x = document.cookie;
var parts = x.split("email@");
var second = parts[1];

var email;
var type;
if("undefined" !== typeof second){
    var pom = second.split("#");
    type = pom[0];
    email = pom[1];
}

$(document).ready(function(){

   if("undefined" !== typeof second){
       $('#usernamePlace').show();
       $('#usernamePlaceholder').html('<span class="glyphicon glyphicon-user"></span> ' + email);
       $('#login').hide();
       $('#logout').show();
//       if(type === "user"){
//
//       }
//
//       if(type === "author") {
//
//       }
//
//       if(type === "chiefeditor") {
//
//       }
   }else{
       $('#usernamePlace').hide();
       $('#logout').hide();
       $('#login').show();
   }
});


function logout(){
    document.cookie = "email" + '@; Max-Age=0';
    window.location.href="index.html";
}

function login(){
    window.location.href="home.html";
}
