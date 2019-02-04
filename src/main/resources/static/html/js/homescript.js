var x = document.cookie;
var parts = x.split("email@");
var second = parts[1];
var addArticleAreas;
var addArticleISSN;

var email;
var type;
if("undefined" !== typeof second){
    var pom = second.split("#");
    type = pom[0];
    email = pom[1];
}

var journals = [];

$(document).ready(function(){

   $('#areaCodeTable').hide();
   $('#journalTable').hide();
   $('#allMagazines').show();
   $('#aboutMagazine').hide();
   $('#articles').hide();
   $('#addArticleButton').hide();
   $('.authorCenter').hide();
   getAllMagazines();
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

   $( function() {
         $("#dialog2").dialog({
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

     $( function() {
          $("#dialog3").dialog({
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
           getNotifications();
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
    $('#journalTable').hide();
    $('#allMagazines').hide();
    $("#dialog").dialog('close');
    $("#dialog2").dialog('close');
    $('#aboutMagazine').hide();
    $('#articles').hide();
    $('#addArticleButton').hide();
    $('.authorCenter').hide();
    alert("search");
}

function newJournal(){
    $('#areaCodeTable').hide();
    $('#journalTable').hide();
    $("#dialog").dialog('close');
    $("#dialog2").dialog('open');
    $('#aboutMagazine').hide();
    $('#articles').hide();
    $('#addArticleButton').hide();
    $('.authorCenter').hide();

    $.ajax({
        type: 'GET',
        url: 'areacode/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
            if(data.length > 0){
                $("#DareaCodesSelect option[value='empty']").remove();
                for(var i =0; i<data.length; i++){
                    $('#DareaCodesSelect').append('<option>' + data[i].name + '</option>');
                }
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: 'user/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
            if(data.length > 0){
                $("#DchiefEditorSelect option[value='empty']").remove();
                $("#DotherEditorsSelect option[value='empty']").remove();
                $('#DchiefEditorSelect').append('<option>Choose Chief Editor</option>');
                $('#DotherEditorsSelect').append('<option>None</option>');
                for(var i =0; i<data.length; i++){
                    if(data[i].email !== email && data[i].userType === "CHIEF_EDITOR"){
                        $('#DchiefEditorSelect').append('<option>' + data[i].email + '</option>');
                        $('#DotherEditorsSelect').append('<option>' + data[i].email + '</option>');
                    }
                }
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: 'journal/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
                for(var i =0; i<data.length; i++){
                    journals.push(data[i].issnnumber);
                }
            }
    });

}

function addNewJournalSubmit(){

    var ok = true;

    var i = document.getElementsByName('dissnNumber');
    var dissnNumberValue = i[0].value;

    var j = document.getElementsByName('dJournalName');
    var dJournalNameValue = j[0].value;

    var chiefEditorValue = $('#DchiefEditorSelect').find(":selected").text();

    var areaCodesValue = $('#DareaCodesSelect').find(":selected").text();

    var otherEditorsValue = $('#DotherEditorsSelect').find(":selected").text();

    if(dissnNumberValue==""){
        toastr.error("You must enter ISSNNumber!");
        ok = false;
    }

    if(dJournalNameValue==""){
        toastr.error("You must enter Journal Name!");
        ok = false;
    }

    if(chiefEditorValue=="Choose Chief Editor"){
        toastr.error("You must choose Chief Editor!");
        ok = false;
    }

    if(areaCodesValue==""){
        toastr.error("You must choose Area Codes!");
        ok = false;
    }

    if(otherEditorsValue==""){
        toastr.error("You must choose Other Editors!");
        ok = false;
    }

    if(journals.includes(dissnNumberValue)){
        toastr.error("Journal with ISSNNumber " + dissnNumberValue + " already exists!");
        ok = false;
    }

    if(ok)
       alert("New Journal Has Been successfully added!");

    return ok;



}

function allJournals(){
    $('#areaCodeTable').hide();
    $('#journalTable').show();
    $("#dialog").dialog('close');
    $("#dialog2").dialog('close');
    $('#allMagazines').hide();
    $('#aboutMagazine').hide();
    $('#articles').hide();
    $('#addArticleButton').hide();
    $('.authorCenter').hide();

    $.ajax({
            type: 'GET',
            url: 'journal/getAll',
            dataType: 'json',
            success: function(data){
                console.log(data);
                $("#journalTable tbody").empty();
                if(data.length > 0){
                   for(var i =0; i<data.length; i++){
                       $("#journalTable").append('<tr><td>' + data[i].issnnumber + '</td><td>' + data[i].name + '</td><td>' + data[i].chiefEditor.email + '</td><td><input type="button" onclick="getJournalAreas(\''+ data[i].issnnumber +'\')" value="Check Areas"></td><td><input type="button" onclick="deleteJournal(\''+ data[i].issnnumber +'\')" value="Delete Journal"></td></tr>');
                   }
                }else{
                $("#journalTable").append('<tr><td>No Journals</td></tr>');
                }

            }
        });
}

function getJournalAreas(ISSNNumber){
    var journalAreas = [];
    $.ajax({
        type: 'GET',
        url: 'journal/getJournal',
        dataType: 'json',
        data: {ISSNNumber : ISSNNumber},
        success: function(data){
                console.log(data);
                var areaCodes = data.areaCodes;
                console.log(areaCodes);
                if(areaCodes.length > 0){
                   for(var i =0; i<areaCodes.length; i++){
                        journalAreas.push(areaCodes[i].name);
                   }
                   alert(journalAreas);
                }

        }
    });
}

function deleteJournal(ISSNNumber){
    $.ajax({
            type: 'POST',
            url: 'journal/deleteJournal',
            dataType: 'json',
            data: {ISSNNumber : ISSNNumber},
            complete: function(data){
                toastr.success("Successfully removed Journal with ISSNNumber " + ISSNNumber + " !");
                allJournals();
            }
        });
}

function newAreaCode(){
    $('#areaCodeTable').hide();
    $('#journalTable').hide();
    $("#dialog").dialog("open");
    $("#dialog2").dialog('close');
    $('#allMagazines').hide();
    $('#aboutMagazine').hide();
    $('#articles').hide();
    $('#addArticleButton').hide();
    $('.authorCenter').hide();

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
    $("#dialog2").dialog('close');
    $('#areaCodeTable').show();
    $('#journalTable').hide();
    $('#allMagazines').hide();
    $('#aboutMagazine').hide();
    $('#articles').hide();
    $('#addArticleButton').hide();
    $('.authorCenter').hide();
    $.ajax({
        type: 'GET',
        url: 'areacode/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
            $("#areaCodeTable tbody").empty();
            if(data.length > 0){
               for(var i =0; i<data.length; i++){
                   $("#areaCodeTable").append('<tr><td>' + data[i].code + '</td><td>' + data[i].name + '</td><td><input type="button" onclick="deleteArea(\''+ data[i].code +'\')" value="Delete Area"></td></tr>');
               }
            }else{
                $("#journalTable").append('<tr><td>No Area Codes</td></tr>');
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

function getAllMagazines(){
    $.ajax({
        type: 'GET',
        url: 'journal/getAll',
        dataType: 'json',
        success: function(data){
            console.log(data);
            $("#magazineTable").empty();
            if(data.length > 0){
                for(var i =0; i<data.length; i++){
                    var image = data[i].image;
                    $("#magazineTable").append('<div class="column"><a href="#" onclick="openMagazine(\''+ data[i].issnnumber +'\')"><img src="data:image/png;base64,' + image.data + '"/ style="width:100%" class="zoom"></a></br><p align="center"><b> ' + data[i].name + ' </b></p></div>');
                }
            }else{
                $("#magazineTable").append('No Magazines!');
            }
        }
    });
}

function openMagazine(issnnumber){
    $('#allMagazines').hide();
    $('#aboutMagazine').show();
    $('#articles').show();
    $('.authorCenter').hide();

    if(type === "author") {
       $('#addArticleButton').show();
    }

    addArticleISSN = issnnumber;

    var journalAreas = [];
    $.ajax({
        type: 'GET',
        url: 'journal/getJournal',
        dataType: 'json',
        data: {ISSNNumber : issnnumber},
        success: function(data){
                    console.log(data);
                    $("#aboutMagazine tbody").empty();
                    var areaCodes = data.areaCodes;
                    addArticleAreas = areaCodes;
                    var chiefEditor = data.chiefEditor;
                    var image = data.image;
                    $("#aboutMagazine").append('<tr><td><img src="data:image/png;base64,' + image.data + '"/ class="aboutMagazinePic"></td></tr><tr><td>ISSNNumber: ' + data.issnnumber + '</td></tr><tr><td>Name: ' + data.name + '</td></tr><tr><td>Chief Editor: ' + chiefEditor.firstName + ' ' + chiefEditor.lastName + '</td></tr><tr><td>Chief Editor email: ' + chiefEditor.email + '</td></tr>');
                    for(var i =0; i<areaCodes.length; i++){
                        $("#aboutMagazine").append('<tr><td>Area: ' + areaCodes[i].name + '</td></tr>');
                    }
                }
    });

    $.ajax({
        type: 'GET',
        url: 'article/getArticleForMagazine',
        dataType: 'json',
        data: {ISSNNumber : issnnumber},
        success: function(data){
                    console.log(data);
                    $("#articleTable tbody").empty();
                    for(var i =0; i<data.length; i++){
                        if(data[i].status !== "PENDING"){
                            var author = data[i].author;
                            var area = data[i].areaCode;
                            var file = data[i].file;
                            $("#articleTable").append('<tr><td>' + data[i].title + '</td><td>' + data[i].apstract + '</td><td>' + author.firstName + ' ' + author.lastName + '</td><td>' + data[i].otherAuthors + '</td><td>' + area.name + '</td><td><a href="#" onclick="openAttachment(\''+ file.data +'\')">Open PDF</a></td></tr>');
                        }
                    }
                }
    });
}

function addArticleButton(){
    $("#dialog3").dialog('open');
    $("#dArticleAuthor").val(email);
    $('#dArticleKeywords').tagsInput({'width':'250px' });
    $("#articleJournalISSN").val(addArticleISSN);

     $("#DarticleCodeSelect option[value='empty']").remove();
    for(var i =0; i<addArticleAreas.length; i++){
        $("#DarticleCodeSelect").append('<option>' + addArticleAreas[i].name + '</option>');
    }

}

function checkCoAutors(){
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("coAuthors");
    if(checkBox.checked == true){
      text.style.display = "block";
    }else{
       text.style.display = "none";
    }
}

function addNewArticleSubmit(){
        var ok = true;

        var i = document.getElementsByName('dArticleTitle');
        var dArticleTitle = i[0].value;

        var j = document.getElementsByName('dArticleKeywords');
        var dArticleKeywords = j[0].value;

        var k = document.getElementsByName('dArticleAbstract');
        var dArticleAbstract = k[0].value;

        var dArticleArea = $('#DarticleCodeSelect').find(":selected").text();



        if(dArticleTitle==""){
            toastr.error("You must enter Article Title!");
            ok = false;
        }

        if(dArticleKeywords==""){
            toastr.error("You must enter Article Keywords!");
            ok = false;
        }

        if(dArticleAbstract==""){
            toastr.error("You must enter Abstract!");
            ok = false;
        }

        if(dArticleArea==""){
            toastr.error("You must choose Article Area!");
            ok = false;
        }

        if( document.getElementById("articleFile").files.length == 0 ){
            toastr.error("You must choose File!");
            ok = false;
        }

        if(ok)
           alert("New Article has been successfully added!");

        return ok;
}

function getNotifications(){
    $.ajax({
        type: 'GET',
        url: 'article/checkReview',
        dataType: 'json',
        data: {email : email},
        success: function(data){
                    console.log(data);
                    if(data.length > 0){
                        $('.authorCenter').show();
                    }
                }
    });
}

function reviewArticles(){
    $('#allMagazines').hide();
    $('#articles').show();
    $.ajax({
        type: 'GET',
        url: 'article/checkReview',
        dataType: 'json',
        data: {email : email},
        success: function(data){
                    $("#articleTable tbody").empty();
                    console.log(data);
                    for(var i =0; i<data.length; i++){
                        var author = data[i].author;
                        var area = data[i].areaCode;
                        var file = data[i].file;
                        $("#articleTable").append('<tr><td>' + data[i].title + '</td><td>' + data[i].apstract + '</td><td>' + author.firstName + ' ' + author.lastName + '</td><td>' + data[i].otherAuthors + '</td><td>' + area.name + '</td><td><a href="#" onclick="openAttachment(\''+ file.data +'\')">Open PDF</a></td><td><button onclick="acceptArticle(\''+ data[i].id +'\')">✔️</button></td><td><button onclick="rejectArticle(\''+ data[i].id +'\')">X</button></td></tr>');
                    }
                }
    });
}

function acceptArticle(id){
    $.ajax({
        type: 'POST',
        url: 'article/acceptArticle',
        dataType: 'json',
        data: {id : id},
        complete: function(data){
            alert("Article successfully accepted!");
            location.reload();
        }
    });
}

function rejectArticle(id){
    $.ajax({
        type: 'POST',
        url: 'article/deleteArticle',
        dataType: 'json',
        data: {id : id},
        complete: function(data){
            alert("Article successfully rejected!");
            location.reload();
        }
    });
}

function openAttachment(data){
//       let a = document.createElement("a");
//       a.href = "data:application/octet-stream;base64,"+data;
//       a.download = "documentName.pdf"
//       a.click();
    var objbuilder = '';
    objbuilder += ('<object width="100%" height="100%"      data="data:application/pdf;base64,');
    objbuilder += (data);
    objbuilder += ('" type="application/pdf" class="internal">');
    objbuilder += ('<embed src="data:application/pdf;base64,');
    objbuilder += (data);
    objbuilder += ('" type="application/pdf" />');
    objbuilder += ('</object>');

    var win = window.open("","_blank","titlebar=yes");
    win.document.title = "My Title";
    win.document.write('<html><body>');
    win.document.write(objbuilder);
    win.document.write('</body></html>');
    layer = jQuery(win.document);
}