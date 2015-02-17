$(document).ready(function() {
 $('form').submit(function (e) {
    e.preventDefault();
    var $search = $('#search');
    var $submit = $('#submit');
   
    $search.prop("disabled", true);
    $submit.attr("disabled", true).val("Searching...");             
    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    //Capture search term
    var query = $search.val();
    var opts = {
      tags: query,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,image) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + image.link + '" class="image">';
        photoHTML += '<img src="' + image.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $search.prop("disabled", false);
      $submit.attr("disabled", false).val("Search");
    }
    $.getJSON(flickerAPI, opts, displayPhotos);
  }); // end click
}); //end ready