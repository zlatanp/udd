var x = document.cookie;
var parts = x.split("username@");
var second = parts[1];

var username;
var type;
var pom = second.split("#");
type = pom[0];
username = pom[1];

var tempCard = new Array();

$(document).ready(function(){

    $('#usernamePlaceholder').html('<span class="glyphicon glyphicon-user"></span> ' + username);

   if(type === "buyer"){
        $('#istorija').show();
        $('#korpa').show();
        $('#needMore').hide();

   }else{
       $('#istorija').hide();
       $('#korpa').hide();
   }

   if(type === "manager") {
       $('#needMore').hide();
       managerOnload();

   }

    if(type === "seller") {
        $('#needMore').hide();
        $('#center').html('');
        $('#center').append('<h3>Spisak racuna sa statusom: </h3>');
        $('#center').append('<select onchange="changeStatus()"  name="selector" id="selector"><option value="PORUCEN">Porucen</option><option value="REALIZOVAN">Realizovan</option><option value="OTKAZAN">Otkazan</option></select>');
        $('#center').append('<div id="racunKontejner"></div>');
        prodavacOnLoad("PORUCEN");
        proveriZalihe();

    }

    //TODO ajax call for reading categories
    loadAllCategories();

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

      $( function() {
                $("#dialog4").dialog({
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
       $("#dialog5").dialog({
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
          $("#dialog6").dialog({
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
          $("#dialog7").dialog({
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
        $("#dialog8").dialog({
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
});

function logout(){
    document.cookie = "username" + '@; Max-Age=0';
    window.location.href="index.html"
}

function profile(){
    $('#center').html('');

    $.ajax({
        type: 'GET',
        url: 'user/info',
        dataType: 'json',
        data: {username : username},
        success: function(data){
            console.log(data);
            $('#center').append('<h3>Name: ' + data.name +  '</h3><br>');
            $('#center').append('<h3>Surname: ' + data.surname +  '</h3><br>');
            $('#center').append('<h6>Username: ' + data.username +  '</h6><br>');
            $('#center').append('<h6>Password: ' + data.password +  '</h6><br>');
            $('#center').append('<h6>Type: ' + data.type +  '</h6><br>');
            if(data.type == "BUYER") {
                var bp = data.buyerProfile;
                $('#center').append('<h6>Buyer Profile:</h6><br>');
                $('#center').append('<h6>Reward Points : ' + bp.rewardPoints + '</h6><br>');
                var cat = bp.category;
                $('#center').append('<h6>Category : ' + cat.name + '</h6><br>');
            }
            $('#center').append('<h6>ID: ' + data.id +  '</h6><br>');
            $('#center').append('<h6>Date of registration: ' + String(new Date(data.dateOfRegistration).subtractdHours(2)) +  '</h6><br>');
        },
    });
}

Date.prototype.subtractdHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}

//Manager things

function managerOnload(){
    $('#center').html('');
    $('#center').html('<table id="centerTable"></table>');

    $('#centerTable').append('<tr><td><h5>Update Buyer Categories </h5></td><td>&nbsp;<button onclick="buyerCategories()">See More...</button></td></tr>');
    $('#centerTable').append('<tr><td><h5>Update Item Categories </h5></td><td>&nbsp;<button onclick="itemCategories()">See More...</button></td></tr>');
    $('#centerTable').append('<tr><td><h5>Update Action Events </h5></td><td>&nbsp;<button onclick="actionEvents()">See More...</button></td></tr>');
}

//******************** itemCATEGORIES ********************

function itemCategories(){
    $('#center').html('');
    $('#center').append('<br>');
    $('#center').append('<h5>Add new item category &nbsp; <input type="button" onclick="add()" value="add"></h5>');
    $('#center').append('<h4>Preview of all item categories: </h4>');
    //TODO ajax call to list all categories
    //$('#center').append('<div id="dialog" title="Modify artist"><p>Name</p><input name="name" type="text" id="Dname"><br><p>Surname</p><input name="surname" type="text" id="Dsurname"><br><p>Hit</p><input name="hit" type="text" id="Dhit"><br><br><button id="dialogModify">Save</button></div>');
    $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Category code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Category name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Supercategory&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Max discount&nbsp;&nbsp;</th></tr></table>');
     $.ajax({
                     type: 'GET',
                     url: 'itemCategory/getAll',
                     dataType: 'json',
                     success: function(data){
                     console.log(data);
                         if(data.length > 0){
                            for(var i =0; i<data.length; i++){
                                $('#centerTable').append('<tr><td>' + data[i].code + '&nbsp;</td><td>' + data[i].name + '&nbsp;</td><td>' + data[i].superCategory + '&nbsp;</td><td>' + data[i].maxDiscount + ' %&nbsp;</td><td><input type="button" onclick="editCategory(\''+ data[i].code +'\')" value="Edit Category"></td></tr>');
                            }
                         }
                     },
                 });
}

function add(){
     $("#dialog").dialog("open");
     $('#dSupCategory').html('<option value="null">No Super Category</option>');
      $.ajax({
                 type: 'GET',
                 url: 'itemCategory/getAll',
                 dataType: 'json',
                 success: function(data){
                     if(data.length > 0){
                        for(var i =0; i<data.length; i++){
                            $('#dSupCategory').append('<option value="'+ data[i].name +'">'+ data[i].name+'</option>');
                        }
                     }
                 },
             });
}

function addNewCategory(){
    var i = document.getElementsByName('dCode');
    var codeValue = i[0].value;
    var j = document.getElementsByName('dName');
    var nameValue = j[0].value;
    var k = document.getElementsByName('dMaxDiscount');
    var maxDiscountValue = k[0].value;
    var l = document.getElementsByName('dSupCategory');
    var supCategory = l[0].value;
    var m = document.getElementsByName('wholesale');
    var wholesale = m[0].value;


    if(codeValue == "" || nameValue == "" || maxDiscountValue =="" || supCategory == "" || wholesale == ""){
        toastr.error("Fields can not be empty!");
        return false;
        }

        if(parseInt(maxDiscountValue) > 100){
                toastr.error("Max discount value can not be higher than 100%!");
                return false;
           }

    $.ajax({
            type: 'POST',
            url: 'itemCategory/add',
            dataType: 'json',
            data: {code : codeValue, name : nameValue, maxdiscount : maxDiscountValue, supercategory : supCategory, wholesale : wholesale},
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
                if(response == "ok")
                    toastr.success("Category added!");
            }
        });

    $("#dialog").dialog('close');
    itemCategories();
}

function editCategory(code){
    $("#dialog2").dialog("open");
    $('#dSupCategory2').html('<option value="null">No Super Category</option>');
    $.ajax({
        type: 'GET',
        url: 'itemCategory/getAll',
        dataType: 'json',
        success: function(data){
            if(data.length > 0){
                for(var i =0; i<data.length; i++){
                    $('#dSupCategory2').append('<option value="'+ data[i].name +'">'+ data[i].name+'</option>');
                }
            }
            $.ajax({
                type: 'GET',
                url: 'itemCategory/getOne',
                dataType: 'json',
                data: {code : code},
                success: function(data){
                    $("#dCode2").val(code);
                    $("#dCode2").prop('disabled', true);
                    $("#dName2").val(data.name);
                    $("#dMaxDiscount2").val(data.maxDiscount);
                    $("#dSupCategory2").val(data.superCategory);
                    $("#wholesale2").val(data.wholesale.toString());
                }
          });


        }
    });
}

function updateCategory(){
    var i = document.getElementsByName('dCode2');
    var codeValue = i[0].value;
    var j = document.getElementsByName('dName2');
    var nameValue = j[0].value;
    var k = document.getElementsByName('dMaxDiscount2');
    var maxDiscountValue = k[0].value;
    var l = document.getElementsByName('dSupCategory2');
    var supCategory = l[0].value;
    var m = document.getElementsByName('wholesale2');
    var wholesale = m[0].value;

    if(codeValue == "" || nameValue == "" || maxDiscountValue =="" || supCategory == "" || wholesale == ""){
        toastr.error("Fields can not be empty!");
        return false;
    }

    $.ajax({
                type: 'POST',
                url: 'itemCategory/update',
                dataType: 'json',
                data: {code : codeValue, name : nameValue, maxdiscount : maxDiscountValue, supercategory : supCategory, wholesale : wholesale},
                success: function(data){
                    console.log(data);
                },
                complete: function(data){
                var response = data.responseText;
                    console.log(response);
                    if(response == "nill")
                        toastr.error("Bad request!");
                    if(response == "ok")
                        toastr.success("Category updated!");
                }
            });

        $("#dialog2").dialog('close');
        itemCategories();
        loadAllCategories();
}

function loadAllCategories(){
    var subcat = new Array();
    var subsubcat = new Array();
    var getOver = false;
    $('#categories').html('<h4>Categories:<br></h4><br>');
    $.ajax({
            type: 'GET',
            url: 'itemCategory/getAll',
            dataType: 'json',
            success: function(data){
                if(data.length > 0){
                    console.log(data);
                    for(var i =0; i<data.length;i++){
                        getOver = false;

                        for(var r = 0; r<subcat.length;r++){ //Subcategory
                            if(subcat[r] == data[i].name)
                            getOver = true;
                        }

                        for(var e = 0; e<subsubcat.length;e++){ //SubSubcategory
                             if(subsubcat[e] == data[i].name)
                                getOver = true;
                        }

                        if(r == subcat.length && !getOver){
                            $('#categories').append('<h5><a href="#" onclick="getInCategory(\''+ data[i].name +'\')">*'+ data[i].name +'</a></h5>');
                            for(var j =i; j<data.length;j++){ //Do u have subcategory
                                if(data[j].superCategory == data[i].name){
                                    $('#categories').append('<h5>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="getInCategory(\''+ data[j].name +'\')">* '+ data[j].name +'</a></h5>');
                                    subcat.push(data[j].name);
                                    //treca podkat
                                    for(var z =j; z<data.length;z++){   //Do your subcategory have subcategory
                                         if(data[z].superCategory == data[j].name){
                                             $('#categories').append('<h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="getInCategory(\''+ data[z].name +'\')">* '+ data[z].name +'</a></h5>');
                                             subsubcat.push(data[z].name);
                                         }
                                    }
                                }
                            }
                        }


                    }
                }
            }
    });
}

//******************** buyerCATEGORIES ********************

function buyerCategories(){
    $('#center').html('');
    $('#center').append('<br>');
    $('#center').append('<h5>Add new buyer category &nbsp; <input type="button" onclick="add2()" value="add"></h5>');
    $('#center').append('<h4>Preview of all buyer categories: </h4>');
    //TODO ajax call to list all categories
    loadAllBuyerCategories();
}

function add2(){
    $("#dialog3").dialog("open");
}

function addNewUserCategory(){
    var p = document.getElementsByName('dCode3');
    var codeValue = p[0].value;
    var i = document.getElementsByName('dName3');
    var nameValue = i[0].value;
    var j = document.getElementsByName('from3');
    var fromValue = j[0].value;
    var k = document.getElementsByName('to3');
    var toValue = k[0].value;
    var l = document.getElementsByName('coefficientC3');
    var coefficient = l[0].value;

   if(codeValue == "" || nameValue == "" || fromValue == "" || toValue =="" || coefficient == ""){
        toastr.error("Fields can not be empty!");
        return false;
   }

   if(parseInt(fromValue) > parseInt(toValue)){
        toastr.error("From value can not be higher than to value!");
        return false;
   }

   if(parseInt(coefficient) > 100){
           toastr.error("Coefficient can not be higher than 100%!");
           return false;
      }


   $.ajax({
        type: 'POST',
        url: 'buyerCategory/add',
        dataType: 'json',
        data: {code : codeValue, name : nameValue, from : fromValue, to : toValue, coefficient : coefficient},
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
            if(response == "ok")
                toastr.success("Category added!");
            }
        });

    $("#dialog3").dialog('close');
    buyerCategories();
}

function loadAllBuyerCategories(){
    $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Category code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Category name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;From value&nbsp;&nbsp;</th><th>&nbsp;&nbsp;To value&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Coefficient&nbsp;&nbsp;</th></tr></table>');
         $.ajax({
             type: 'GET',
             url: 'buyerCategory/getAll',
             dataType: 'json',
             success: function(data){
                 console.log(data);
                 if(data.length > 0){
                    for(var i =0; i<data.length; i++){
                        $('#centerTable').append('<tr><td>' + data[i].code + '&nbsp;</td><td>' + data[i].name + '&nbsp;</td><td>' + data[i].from + '$&nbsp;</td><td>' + data[i].to + ' $&nbsp;</td><td>' + data[i].coefficient + ' %&nbsp;</td><td><input type="button" onclick="editBuyerCategory(\''+ data[i].code +'\')" value="Edit Category"></td></tr>');
                    }
                 }
             },
        });
}

function editBuyerCategory(code){
    $("#dialog4").dialog("open");
    $.ajax({
        type: 'GET',
        url: 'buyerCategory/getOne',
        dataType: 'json',
        data: {code : code},
        success: function(data){
            $("#dCode4").val(code);
            $("#dCode4").prop('disabled', true);
            $("#dName4").val(data.name);
            $("#dName4").prop('disabled', true);
            $("#from4").val(data.from);
            $("#to4").val(data.to);
            $("#coefficientC4").val(data.coefficient);
            }
    });
}

function saveUserCategory(){
    var p = document.getElementsByName('dCode4');
    var codeValue = p[0].value;
    var i = document.getElementsByName('dName4');
    var nameValue = i[0].value;
    var j = document.getElementsByName('from4');
    var fromValue = j[0].value;
    var k = document.getElementsByName('to4');
    var toValue = k[0].value;
    var l = document.getElementsByName('coefficientC4');
    var coefficient = l[0].value;

   if(codeValue == "" || nameValue == "" || fromValue == "" || toValue =="" || coefficient == ""){
        toastr.error("Fields can not be empty!");
        return false;
   }

   if(parseInt(fromValue) > parseInt(toValue)){
        toastr.error("From value can not be higher than to value!");
        return false;
   }
    $.ajax({
        type: 'POST',
        url: 'buyerCategory/update',
        dataType: 'json',
        data: {code : codeValue, name : nameValue, from : fromValue, to : toValue, coefficient : coefficient},
        success: function(data){
            console.log(data);
            },
        complete: function(data){
            var response = data.responseText;
            console.log(response);
            if(response == "nill")
                toastr.error("Bad request!");

            if(response == "ok")
                toastr.success("Category updated!");
            }
    });

        $("#dialog4").dialog('close');
        buyerCategories();

}

//******************** ACTION EVENTS ********************

function actionEvents(){
     $('#center').html('');
        $('#center').append('<br>');
        $('#center').append('<h5>Add new Action Event &nbsp; <input type="button" onclick="add3()" value="add"></h5>');
        $('#center').append('<h4>Preview of all Action Events: </h4>');
        //TODO ajax call to list all events
        loadEvents();
}

function add3(){
    $("#dialog5").dialog("open");
    $('#category5').html('');
          $.ajax({
                     type: 'GET',
                     url: 'itemCategory/getAll',
                     dataType: 'json',
                     success: function(data){
                         if(data.length > 0){
                            for(var i =0; i<data.length; i++){
                                $('#category5').append('<option value="'+ data[i].name +'">'+ data[i].name+'</option>');
                            }
                         }
                     },
                 });
}

function saveActionEvent(){
    var p = document.getElementsByName('dCode5');
    var codeValue = p[0].value;
    var i = document.getElementsByName('dName5');
    var nameValue = i[0].value;
    var j = document.getElementsByName('from5');
    var fromValue = j[0].value;
    var k = document.getElementsByName('to5');
    var toValue = k[0].value;
    var l = document.getElementsByName('coefficientC5');
    var coefficient = l[0].value;
    var i = document.getElementsByName('category5');
    var category = i[0];

    var categoriesList = getSelectValues(category);

    console.log(categoriesList);

    if(codeValue == "" || nameValue == "" || fromValue == "" || toValue =="" || coefficient == "" || category == null){
        toastr.error("Fields can not be empty!");
        return false;
    }

    if(parseInt(coefficient) > 100){
        toastr.error("Coefficient can not be higher than 100%!");
        return false;
    }

    var cat = JSON.stringify(categoriesList);

$.ajax({
            type: 'POST',
            url: 'actionEvent/add',
            dataType: 'json',
            data: {code : codeValue, name : nameValue, from : fromValue, to : toValue, coefficient : coefficient, category : cat},
            success: function(data){
                console.log(data);
            },
            complete: function(data){
            var response = data.responseText;
                console.log(response);
                if(response == "nill")
                    toastr.error("Bad request!");
                if(response == "codeErr")
                    toastr.error("Event with that code already exist!");
                if(response == "ok")
                    toastr.success("Event added!");
            }
        });

    $("#dialog5").dialog('close');
    actionEvents();

}

function loadEvents(){
    $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Event code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Event name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;From value&nbsp;&nbsp;</th><th>&nbsp;&nbsp;To value&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Coefficient&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Categories effected&nbsp;&nbsp;</th></tr></table>');
             $.ajax({
                 type: 'GET',
                 url: 'actionEvent/getAll',
                 dataType: 'json',
                 success: function(data){
                     console.log(data);
                     if(data.length > 0){
                        for(var i =0; i<data.length; i++){
                            $('#centerTable').append('<tr><td>' + data[i].code + '&nbsp;</td><td>' + data[i].name + '&nbsp;</td><td>' + data[i].from + '&nbsp;</td><td>' + data[i].to + ' &nbsp;</td><td>' + data[i].discount + ' %&nbsp;</td><td>' + data[i].category + ' &nbsp;</td><td><input type="button" onclick="editEvent(\''+ data[i].code +'\')" value="Edit Category"></td></tr>');
                        }
                     }
                 },
            });
}

function editEvent(code){
$("#dialog6").dialog("open");
    $.ajax({
        type: 'GET',
        url: 'itemCategory/getAll',
        dataType: 'json',
        success: function(data){
            if(data.length > 0){
                for(var i =0; i<data.length; i++){
                    $('#category6').append('<option value="'+ data[i].name +'">'+ data[i].name+'</option>');
                }
            }
            $.ajax({
                type: 'GET',
                url: 'actionEvent/getOne',
                dataType: 'json',
                data: {code : code},
                success: function(data){
                                $("#dCode6").val(code);
                                $("#dCode6").prop('disabled', true);
                                $("#dName6").val(data.name);
                                //Dates and categories selectedc
                                console.log(data.from);

                                console.log(data.to);
                                $("#from6").val(data.from);
                                $("#to6").val(data.to);
                                $("#coefficientC6").val(data.discount);
                                var categories = data.category+ '';
                                var dataarray=categories.split(',');
                                $("#category6").val(dataarray);
                }
          });


        }
    });



}

function saveChangesEvent(){
     var p = document.getElementsByName('dCode6');
        var codeValue = p[0].value;
        var i = document.getElementsByName('dName6');
        var nameValue = i[0].value;
        var j = document.getElementsByName('from6');
        var fromValue = j[0].value;
        var k = document.getElementsByName('to6');
        var toValue = k[0].value;
        var l = document.getElementsByName('coefficientC6');
        var coefficient = l[0].value;
        var i = document.getElementsByName('category6');
        var category = i[0];


        var categoriesList = getSelectValues(category);

            console.log(categoriesList);

            if(codeValue == "" || nameValue == "" || fromValue == "" || toValue =="" || coefficient == "" || category == null){
                toastr.error("Fields can not be empty!");
                return false;
            }

            if(parseInt(coefficient) > 100){
                toastr.error("Coefficient can not be higher than 100%!");
                return false;
            }

            var cat = JSON.stringify(categoriesList);

        $.ajax({
                    type: 'POST',
                    url: 'actionEvent/edit',
                    dataType: 'json',
                    data: {code : codeValue, name : nameValue, from : fromValue, to : toValue, coefficient : coefficient, category : cat},
                    success: function(data){
                        console.log(data);
                    },
                    complete: function(data){
                    var response = data.responseText;
                        console.log(response);
                        if(response == "nill")
                            toastr.error("Bad request!");
                        if(response == "codeErr")
                            toastr.error("Event with that code already exist!");
                        if(response == "ok")
                            toastr.success("Event added!");
                    }
                });

            $("#dialog6").dialog('close');
            actionEvents();
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

//******************** GET IN CATEGORY ********************

function getInCategory(categoryName){
    $('#center').html('');
    $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Item code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item category&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item price&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Action&nbsp;&nbsp;</th></tr></table>');


     $.ajax({
            type: 'GET',
            url: 'item/getAllByCat',
            dataType: 'json',
            data: {category : categoryName},
            success: function(data){
            console.log(data);
                if(data.length > 0){
                    for(var i =0; i<data.length; i++){
                        if(data[i].statusOfRecord == "ACTIVE"){
                            var item = data[i];
                            $('#centerTable').append('<tr><td>' + item.code + '&nbsp;</td><td>' + item.name + '&nbsp;</td><td>' + item.category + '&nbsp;</td><td>' + item.price + ' $&nbsp;</td><td><input type="button" onclick="checkActions(\''+ item.category +'\')" value="Check Actions"></td><td><input type="button" onclick="addToCard(\''+ item.code +'\')" value="Add To Card"></td></tr>');
                        }
                     }
                }
            }
     });

}

//TODO Add to card onclick

//******************** SEARCH FOR ITEMS ********************

function searchItems(){
    $('#center').html('');
    $('#center').append('<table id="centerTable" ><tr><td>Find by code:</td><td><input type="text" name="code"></td></tr><tr><td>Find by name:</td><td><input type="text" name="name"></td></tr><tr><td>Find by category:</td><td><input type="text" name="category"></td></tr><tr><td>Find by price:</td></tr><tr><td>Price from: </td><td><input type="number" min="0" name="pricefrom"></td></tr><tr><td>Price to: </td><td><input type="number" min="0" name="priceto"></td></tr><tr></tr><tr><td><button onclick="return searchItm()">Search</button></td></tr></table>');


    return false;
}

function searchItm(){
    var p = document.getElementsByName('code');
    var codeValue = p[0].value;
    var i = document.getElementsByName('name');
    var nameValue = i[0].value;
    var j = document.getElementsByName('category');
    var categoryValue = j[0].value;
    var k = document.getElementsByName('pricefrom');
    var fromValue = k[0].value;
    var l = document.getElementsByName('priceto');
    var toValue = l[0].value;


    if(codeValue == "" && nameValue == "" && categoryValue == "" && fromValue =="" && toValue == ""){
        toastr.error("All fields can not be empty!");
        return false;
    }

    if(parseInt(fromValue) > parseInt(toValue)){
         toastr.error("From value can not be higher than to value!");
         return false;
    }

    if(codeValue == "")
        codeValue = "null";
    if(nameValue == "")
        nameValue = "null";
    if(categoryValue == "")
        categoryValue = "null";
    if(fromValue == "")
         fromValue = 0;
    if(toValue == "")
         toValue = 0;

    var index;
    var list = new Array();

    $.ajax({
        type: 'POST',
        url: 'item/search',
        dataType: 'json',
        data: {code : codeValue, name : nameValue, category : categoryValue, from : fromValue, to : toValue},
        success: function(data){
                    console.log(data);
                    if(data.length > 0){
                        $('#center').html('');
                        $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Item code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item category&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item price&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Action&nbsp;&nbsp;</th></tr></table>');

                        index = 0;
                        while(index < data.length){
                            var item = data[index];
                            var categoryValue = item.category;
                            $('#centerTable').append('<tr><td>' + item.code + '&nbsp;</td><td>' + item.name + '&nbsp;</td><td id="'+ index +'">' + item.category + '&nbsp;</td><td>' + item.price + ' $&nbsp;</td><td><input type="button" onclick="checkActions(\''+ item.category +'\')" value="Check Actions"></td><td><input type="button" onclick="addToCard(\''+ item.code +'\')" value="Add To Card"></td></tr>');
                            list.push(item.category);
                            index ++;
                        }
                    }
        }
    });

    return false;
}

function checkActions(category){
    $.ajax({
        type: 'GET',
        url: 'actionEvent/isOnAction',
        dataType: 'json',
        data: {category : category},
        success: function(data){
            console.log(data)
        },
        complete: function(data){
            if(data.responseText ==""){
                alert("No Actions!");
            }else{
               alert(data.responseText);
            }
        }
    });
}


function addToCard(code){
    $("#idtempitem").val(code);
    $("#dialog7").dialog("open");
}

function addToCardFinal(){
    var code = $("#idtempitem").val();
    var quantity = $("#count").val();

    tempCard.push(code);
    tempCard.push(quantity);

    $("#dialog7").dialog("close");
    toastr.success("Item added to card!");
}

function card(){
    $('#center').html('');

    if(tempCard.length < 1){
        $('#center').append('<h3>No items in card!</h3>');
    }else{
    $('#center').append('<table id="centerTable" border="1"><tr><th>&nbsp;&nbsp;Item code&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item name&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item category&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Item price&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Action&nbsp;&nbsp;</th><th>&nbsp;&nbsp;Count&nbsp;&nbsp;</th></tr></table>');


    for(var i=0; i<tempCard.length; i+=2){
        var code = tempCard[i];
        var count =tempCard[i+1];
        $.ajax({
           type: 'GET',
           url: 'item/searchByCode',
           dataType: 'json',
           data: {code : code, count : count},
           success: function(data){
                console.log(data);
                var obj = data.i
                $('#centerTable').append('<tr><td>' + obj.code + '&nbsp;</td><td>' + obj.name + '&nbsp;</td><td>' + obj.category + '&nbsp;</td><td>' + obj.price + ' $&nbsp;</td><td><input type="button" onclick="checkActions(\''+ obj.category +'\')" value="Check Actions"></td><td>'+ data.count  +'</td><td><input type="button" onclick="deleteFromCard(\''+ obj.code +'\')" value="Delete item"></td></tr>');
           }
         });

    }

    $('#center').append('<br><button onclick="return statusCard()">Buy!</button>');

}

}

function deleteFromCard(code){
    for(var i=0; i<tempCard.length; i+=2){
        if(tempCard[i] == code){
            tempCard.splice(i,2);
        }
    }
    card();
}

function statusCard(){

    var json = JSON.stringify(tempCard);

    $.ajax({
        type: 'GET',
        url: 'cardController/count',
        dataType: 'json',
        data: {json : json, user : username},
        success: function(data){
             console.log(data);
            $('#center').html('');
            $('#center').append('<br><h5>Price without actions: ' + data.prvaCena + '</h5>');
            $('#center').append('<h5>Price after applied actions :' + data.cena + '</h5>');
            $('#center').append('<h5>Pay with reward points, you have: <p id="points">' + data.korisnickiPoeni + ' points</p><input onchange="dodajemPoene(\''+ data.cena +'\',\''+ data.korisnickiPoeni +'\')" type="number" min="0" id="enterPoints" value="0" /></h5>');
            $('#center').append('<h5>Final price: $ <p id="finallPrice"> ' + data.cena + ' </p></h5>');
            $('#center').append('<br><button onclick="saveRealRacun()">Buy!</button>');
            $('#center').append('<p hidden id="unique">'+ data.unique +'</p>');
           }
    });




    return false;
}

function dodajemPoene(prvaCena, korisnickiPoeni){

    var points = document.getElementById('enterPoints').value;
    var poeni = parseInt(points);

    var prvaCenaInt = parseInt(prvaCena);
    var korisnickiPoeniInt = parseInt(korisnickiPoeni);

    if(isNaN(poeni) || poeni > korisnickiPoeniInt){
        $('#enterPoints').text('0');
        $('#finallPrice').text(prvaCenaInt + '');
    }else{
        var noviiznos = prvaCenaInt - poeni;
        if(poeni = 0){
            $('#enterPoints').text('0');
            $('#finallPrice').text(prvaCenaInt + '');
        }else {
            $('#finallPrice').text(noviiznos + '');
        }
    }

    return false;

}

function saveRealRacun(){
    var points = document.getElementById('enterPoints').value;
    var pravaCena = $('#finallPrice').text();
    var unique = $('#unique').text();

    $.ajax({
        type: 'GET',
        url: 'cardController/save/',
        dataType: 'json',
        data: {points : points, pravaCena : pravaCena, unique : unique},
        success: function(data){
            console.log(data);
        }
    });
    showHistory();
    return false;
}

function showHistory(){
    $('#center').html('');
    $.ajax({
        type: 'GET',
        url: 'cardController/getHistory',
        dataType: 'json',
        data: {username : username},
        success: function(data){
            console.log(data);
            $('#center').html('');
            if(data.length > 0){

                for(var i=0; i<data.length; i++) {
                    $('#center').append('<table id="historyTable'+ i +'" border="1"><tr><th>Datum</th><th>Stvarna cena</th><th>Cena sa popustom</th><th>Dodatni Popusti</th><th>Osnovni popust</th></tr></table>');
                    var obj = data[i];
                    var datum = String(new Date(obj.datum).subtractdHours(2));
                    $('#historyTable'+ i +'').append('<tr><td>'+ datum.substring(3, 14) +'</td><td>&nbsp;&nbsp;' + obj.prvaCena + '$</td><td>&nbsp;&nbsp;' + obj.cena + '$</td><td>P1:' + obj.dodatnipopustCele1 + ', P2:' + obj.dodatnipopustCele2 + ', P3:' + obj.dodatnipopustCele3 + '</td><td>&nbsp;&nbsp;' + obj.osnovnipopustCele + '</td></tr>');
                    $('#center').append('<table id="itemTable'+ i +'" border="1"><tr><th>Naziv</th><th>Cena</th><th>Kolicina</th><th>Dodatni Popust</th><th>Osnovni popust</th><th>Cena sa popustom</th></tr></table>');

                    var itemi = obj.items;
                    for (var j = 0; j < itemi.length; j++) {
                        item = itemi[j];
                        $('#itemTable'+ i +'').append('<tr><td>&nbsp;&nbsp;' + item.item.name + '</td><td>&nbsp;&nbsp;' + item.item.price + '$</td><td>&nbsp;&nbsp;'+ item.count+'</td><td>Popust1:' + item.dodatnipopust1 + ', Popust2:' + item.dodatnipopust2 + ', Popust3:' + item.dodatnipopust3 + '</td><td>&nbsp;&nbsp;'+ item.stavkaRacunaPopust +'</td><td>&nbsp;&nbsp;'+item.price+'$</td></tr>');

                    }
                    $('#center').append('<br>');
                    $('#center').append('<br>');
                }

            }else{
                $('#center').append('<h3>History is empty!</h3>');
            }


        }
    });

    return false;
}

function prodavacOnLoad(status){
    $('#racunKontejner').html('');
    $.ajax({
        type: 'GET',
        url: 'cardController/getAllRacuni',
        dataType: 'json',
        data: {username : username},
        success: function(data){
            console.log(data);
            if(data.length > 0){

                for(var i=0; i<data.length; i++) {
                    var obj = data[i];
                    if (obj.status == status) {
                        $('#racunKontejner').append('<table id="historyTable' + i + '" border="1"><tr><th>Datum</th><th>Stvarna cena</th><th>Cena sa popustom</th><th>Dodatni Popusti</th><th>Osnovni popust</th></tr></table>');
                        var dejt = String(new Date(obj.datum).subtractdHours(2));
                        $('#historyTable' + i + '').append('<tr><td>' + dejt.substring(3, 14) + '</td><td>&nbsp;&nbsp;' + obj.prvaCena + '$</td><td>&nbsp;&nbsp;' + obj.cena + '$</td><td>P1:' + obj.dodatnipopustCele1 + ', P2:' + obj.dodatnipopustCele2 + ', P3:' + obj.dodatnipopustCele3 + '</td><td>&nbsp;&nbsp;' + obj.osnovnipopustCele + '</td></tr>');
                        $('#racunKontejner').append('<table id="itemTable' + i + '" border="1"><tr><th>Naziv</th><th>Cena</th><th>Kolicina</th><th>Dodatni Popust</th><th>Osnovni popust</th><th>Cena sa popustom</th></tr></table>');

                        var itemi = obj.items;
                        for (var j = 0; j < itemi.length; j++) {
                            item = itemi[j];
                            $('#itemTable' + i + '').append('<tr><td>&nbsp;&nbsp;' + item.item.name + '</td><td>&nbsp;&nbsp;' + item.item.price + '$</td><td>&nbsp;&nbsp;' + item.count + '</td><td>Popust1:' + item.dodatnipopust1 + ', Popust2:' + item.dodatnipopust2 + ', Popust3:' + item.dodatnipopust3 + '</td><td>&nbsp;&nbsp;' + item.stavkaRacunaPopust + '</td><td>&nbsp;&nbsp;' + item.price + '$</td></tr>');

                        }
                        if(obj.status == "PORUCEN")
                            $('#racunKontejner').append('<button onclick="return otkaziRacun(\''+ obj.unique +'\')">Otkazi</button><button onclick="return obradiRacun(\''+ obj.unique +'\')">Obradi</button>');

                        $('#racunKontejner').append('<br>');
                        $('#racunKontejner').append('<br>');
                    }
                }
            }else{
                $('#racunKontejner').append('<h3>History is empty!</h3>');
            }


        }
    });

    return false;
}

function changeStatus(){
   var value = $('select[name=selector]').val()

    prodavacOnLoad(value);

    return false;
}

function otkaziRacun(id){

    $.ajax({
        type: 'GET',
        url: 'cardController/otkaziRacun',
        dataType: 'json',
        data: {unique : id},
            success: function (data) {
        }
    });
    toastr.success("Racun uspesno otkazan!");
    prodavacOnLoad("OTKAZAN");

    return false;
}

function obradiRacun(id){

    $.ajax({
        type: 'GET',
        url: 'cardController/obradiRacun',
        dataType: 'json',
        data: {unique : id},
        success: function (data) {
        }
    });
    toastr.success("Racun uspesno obradjen!");
    prodavacOnLoad("PORUCEN");


    return false;
}

function proveriZalihe(){
    $.ajax({
        type: 'GET',
        url: 'cardController/proveriZalihe',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.length>0){
                $('#needMore').show();
            }else{
                $('#needMore').hide();
            }
        }
    });

}

function prikaziStaFali(){
    $.ajax({
        type: 'GET',
        url: 'cardController/proveriZalihe',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                $('#needMore').show();
                $('#center').html('');
                $('#center').append('<h3>You need to order next items:</h3><br>');
                $('#center').append('<table id="itemTable1" border="1"><tr><th>&nbsp;&nbsp;Category</th><th>&nbsp;&nbsp;Code</th><th>&nbsp;&nbsp;Name</th><th>&nbsp;&nbsp;Price</th><th>&nbsp;&nbsp;QuantityInShop</th><th>&nbsp;&nbsp;Min. Quantity</th></tr></table>');
                for (var i = 0; i < data.length; i++) {
                    if (data[i].statusOfRecord == "ACTIVE") {
                        $('#itemTable1').append('<tr><td>&nbsp;&nbsp;' + data[i].category + '</td><td>&nbsp;&nbsp;' + data[i].code + '</td><td>&nbsp;&nbsp;' + data[i].name + '</td><td>&nbsp;&nbsp;' + data[i].price + '</td><td>&nbsp;&nbsp;' + data[i].quantityInShop + '</td><td>&nbsp;&nbsp;' + data[i].minQuantityOnStock + '</td><td><button onclick="return poruciJos(\''+ data[i].code +'\')">Order</button></td></tr>');
                    }
                }
            }else{
                    $('#needMore').hide();
            }
        }
    });
}

function poruciJos(code){
    $("#dialog8").dialog("open");
    $('#itItemasetuj').text(code);

    return false;
}

function poruciKolicinu(){
    var code = $('#itItemasetuj').text();
    var kolicina = $('#koliko').val();

    $.ajax({
        type: 'GET',
        url: 'cardController/poruciKolicinu',
        dataType: 'json',
        data: {code : code, kolicina : kolicina},
        success: function (data) {
        }
    });

    $("#dialog8").dialog("close");
    toastr.success("Succes order!");
    window.setTimeout(function(){location.reload()},2000);

}