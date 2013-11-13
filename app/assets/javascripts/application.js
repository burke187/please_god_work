// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-1.9.1.min
//= require js/jquery.isotope.min
//= require js/jquery.imagesloaded
//= require bootstrap.min
//= require flexslider
//= require carousel
//= require js/jquery.cslider
//= require slider
//= require js/jquery.fancybox
//= require js/twitter
//= require js/jquery.placeholder.min
//= require jquery-easing-1.3
//= require js/layerslider.kreaturamedia.jquery
//= require js/excanvas
//= require js/jquery.flot
//= require js/jquery.flot.pie.min
//= require js/jquery.flot.stack
//= require js/jquery.flot.resize.min
//= require js/modernizr
//= require js/retina
//= require js/custom
//= require_tree .

$(document).ready(function(){

  $("#search_input").keyup(function() {
    var userInput = $(this).val();
    $("#list li").map(function(index, value) {
        $(value).toggle($(value).text().toLowerCase().indexOf(userInput) >= 0);
    });
  });

  $(".friends").on('click', function(){
    var fbId = ($(this).data('fid'))
    var data = {facebookUser: fbId}
    $.get('/search', data, function(response){
      $node = "<div>"+response+"</div>"
      $("#list").html($node);
    });
  });

  $(".landing_page_photo_button").on('click', function(event){
    event.preventDefault();
    console.log('hi');
    $("#friend_graph_div").show();
    $("#friend_event_div").show();
  });


  //-------------edit event form ---------//
  $(".individual_event").on('click', function(event){
    event.preventDefault();
    var friendData = $(this).children(":first").attr('href').match(/\d{1,}/);
    var eventData = $(this).children(":first").attr('href').match(/\d{1,}$/);
    var friendId      = friendData[0];
    var eventId       = eventData[0];
    var url           = '/friends/'+friendId+'/events/'+eventId;
    $.get(url, function(response){
      console.log(response)
      $("#form_for_new_event").remove();
      $("#form_to_update_event").remove();
      $(response).appendTo("#event_form_panel").hide().fadeIn("slow");
    });
  });

  //-------------new event form ---------//
  $(".new_event_button").on('click', function(event){
    event.preventDefault();
    var friendData = $(this).attr('href').match(/\d{1,}/);
    var friendId      = friendData[0];
    var data          = { 'friendId': friendId };
    var url           = '/friends/'+friendId+'/events/new';
    console.log(url);
    $.get(url, function(response){
      $("#form_for_new_event").remove();
      $("#form_to_update_event").remove();
      $(response).appendTo("#event_form_panel").hide().fadeIn("slow");
    });
  });

    $('#other_event').hide();
    $("#event_description").change(function(){
      if ($('#event_description option:selected').text() === "Other")
      {
        $('#other_event').show();
      }
      else
      {
        $('#other_event').hide();
      }
    });

});

