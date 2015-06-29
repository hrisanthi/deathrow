console.log("inmates.js loaded");

var inmates= new Array();

$(document).ready(function(){
  console.log("doc loaded");

  $.ajax({
               type: "GET",
               url: "data/inmate.xml",
               dataType: "xml",
               success: function(xml){
                   console.log("success");
                   loadData(xml);
               },
               error: function(){
                   console.log("error loading");
               }

});

function loadData(xml){
    //parse the xml into variabls
    console.log("Success, loadData() called")

    $(xml).find('inmate').each(function(){
               //console.log("once for every person");
               var $inmate = $(this);
               var name = $inmate.attr("name");
               inmates.push($inmate.attr("name"));
               var county =$inmate.find('county').text();
               var age =$inmate.find('age').text();
               var convicted =$inmate.find('convicted').text();
               var crime =$inmate.find('crime').text();
               var image = $inmate.find('image').text();
               console.log(name);
               console.log(county);
               console.log(age);
               console.log(convicted);


               var inmateHTML ='';
               inmateHTML += '<li><img src=' + image + '><span class ="text-content"><span></span><h4>' + name + '</h4><h5 class="county">' + county + '</h5><h5>'+ convicted +'</h5><h5>'+ crime +'</h5></span></li>';

               $(".img-list").append($(inmateHTML));

             });



}
});
