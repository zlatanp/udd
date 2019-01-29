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

   $('#areaCodeTable').hide();
    $( function() {
          $("#dialog").dialog({
               autoOpen: false,
               show: {
                   effect: "blind",
                   duration: 500
                   },
               hide: {
                   effect: "explode",
                   duration: 500
                   }
          });

      });

   if("undefined" !== typeof second){
       $('#usernamePlace').show();
       $('#usernamePlaceholder').html('<span class="glyphicon glyphicon-user"></span> ' + email);
       $('#login').hide();
       $('#logout').show();

       if(type === "user"){
           $('.adminLeft').hide();
       }

       if(type === "author") {
           $('.adminLeft').hide();
       }

       if(type === "chiefeditor") {
           $('.adminLeft').hide();
       }

       if(type === "admin") {
           $('.adminLeft').show();

       }
   }else{
       $('#usernamePlace').hide();
       $('#logout').hide();
       $('#login').show();
       $('.adminLeft').hide();
   }
});


function logout(){
    document.cookie = "email" + '@; Max-Age=0';
    window.location.href="index.html";
}

function login(){
    window.location.href="home.html";
}

function searchItems(){
    $('#areaCodeTable').hide();
    $("#dialog").dialog('close');
    alert("search");
}

function newJournal(){
    $('#areaCodeTable').hide();
    $("#dialog").dialog('close');
}

function allJournals(){
    $('#areaCodeTable').hide();
    $("#dialog").dialog('close');
}

function newAreaCode(){
    $('#areaCodeTable').hide();
    $("#dialog").dialog("open");

}

function addNewAreaCode(){
    var i = document.getElementsByName('dCode');
    var codeValue = i[0].value;

    var j = document.getElementsByName('dName');
    var nameValue = j[0].value;

    if(codeValue == "" || nameValue == ""){
        toastr.error("Fields can not be empty!");
        return false;
    }else{
        $.ajax({
            type: 'POST',
            url: 'areacode/addCode',
            dataType: 'json',
            data: {code : codeValue, name : nameValue},
            success: function(data){
                console.log(data);
            },
            complete: function(data){
            var response = data.responseText;
                console.log(response);
                if(response == "nill")
                    toastr.error("Bad request!");
                if(response == "codeErr")
                    toastr.error("Category with that code already exist!");
                if(response == "ok"){
                    toastr.success("Category added!");
                    $("#dCode").val("");
                    $("#dName").val("");
                    $("#dialog").dialog('close');
                }
            }
        });
    }
}

function allAreaCodes(){
    $("#dialog").dialog('close');
    $('#areaCodeTable').show();
    $.ajax({
        type: 'GET',
        url: 'areacode/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
            if(data.length > 0){
               $("#areaCodeTable tbody").empty();
               for(var i =0; i<data.length; i++){
                   $("#areaCodeTable").append('<tr><td>' + data[i].code + '</td><td>' + data[i].name + '</td><td><input type="button" onclick="deleteArea(\''+ data[i].code +'\')" value="Delete Area"></td></tr>');
               }
            }
        }
    });
}

function deleteArea(areaCode){
    $.ajax({
            type: 'POST',
            url: 'areacode/deleteCode',
            dataType: 'json',
            data: {code : areaCode},
            complete: function(data){
                toastr.success("Successfully removed Area with code " + areaCode + " !");
                allAreaCodes();
            }
        });
}
