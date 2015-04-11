function initialize() {

  var $latitude = document.getElementById('latitude');
  var $longitude = document.getElementById('longitude');
  //define the center
  var latitude = 52.626946
  var longitude = 13.408745; 
  var LatLng = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 8,
    center: LatLng,
    panControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //use to let window open one at the time 
    var currentInfoWindow = '';
    //marker image
    
    var image = '/assets/pin.png';
    var plusimage = '/assets/plusPin.png';
    
    var markerd = new google.maps.Marker({
      position: LatLng,
      map: map,
      icon:plusimage,
      title: 'Drag Me!',
      draggable: true
    });
    markerd.setMap(null);
    
    $( "#toggle" ).click(function() {
    $( ".nav-left" ).toggle( "slow" );

    if ($(this).attr('src') === "/assets/plus.png") { 
            $(this).attr("src", "/assets/minus.png"); 
               $(".map-wrap").css({"width":"80%"});
            
              markerd.setMap(map);
      
    }
    else { 
            $(this).attr("src", "/assets/plus.png");
            $( ".map-wrap" ).animate({ width: '100%' }, 610 );
            markerd.setMap(null);
   
        };
    });
    

    
    google.maps.event.addListener(markerd, 'dragend', function(markerd){
      var latLng = markerd.latLng;
      $latitude.value = latLng.lat();
      $longitude.value = latLng.lng();
    });

  

    
    //loop through myData
      for (var x in mydata) { 
        var place = mydata[x];
        var location = new google.maps.LatLng(place.lat,place.lng)
        //all  values 
        addMarker(map, place.title,  location, place.description)  
      } 
  //create markers
      function addMarker(map, title, location) {
        var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        icon: image,
        position: location,
        map: map
      });


       google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });
      //create info window
      var infowindow = new google.maps.InfoWindow({
      //hold all the content for the info window 
      content:'<div class="infobox"><h2>' + place.title + '</h2><p>'+ place.lat + "," + place.lng +'</p></div>',


      }); 
    
      
     // click on marker function
      google.maps.event.addListener(marker, 'click', function() {

         //let open only one window at the time 
        if(currentInfoWindow != '') { 
          currentInfoWindow.close();
          currentInfoWindow = '';
        }
        
          infowindow.open(map, marker);
          currentInfoWindow = infowindow;

        //click on open infowindow close it 
         if(!marker.open){
                    infowindow.open(map,marker);
                    marker.open = true;
                }
                else{
                    infowindow.close();
                    marker.open = false;
                }
                //zoom in 
                //map.setZoom(12);
                //map.setMarker(marker.location());
          });
     }
 //markers.push(marker);

}

google.maps.event.addDomListener(window, 'load', initialize);