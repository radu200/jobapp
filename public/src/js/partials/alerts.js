$('#alert_close').click(function(){
    $( "#alert_box" ).hide();
  });

  $(' .dropdown-content').on('click', function(event) {
    event.stopPropagation();
  });


  $(document).ready(function(){
    $('.tooltipped').tooltip();
  });
        