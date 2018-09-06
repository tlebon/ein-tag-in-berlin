let markerCollection = ['some array']

$(document).ready(() => {
  console.log("ready")

  getResults();

  // $('button.random').on('click', function () {
  //   console.log('getting results')
  // })
  function getResults() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('center: ', center)
        $(".redirect").html('<a href="locate/' + center.lat + '/' + center.lng + '"><button class="random">Haben Sie einen schönen Tag</button></a>')
        // $(".lat").val(center.lat)
        // $(".lng").val(center.lng)
        console.log("inserted link")
      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }



  $('.restaurants>.row>.cards').click(function () {
    console.log(this.cardtext)
    console.log($(".card-text.lng").html())
    // $(this)
    $(".bars").removeClass('hidden')
    $("#map").removeClass('hidden')
    let lat = $(".lat",this).html();
    let lng = $(".lng",this).html();
    let loc = new google.maps.LatLng(lat, lng);
    markerCollection.push(lat)
    startMap(lat, lng)
    addMarker(loc, map)
  })


  $('.bars>.row>.cards').click(function () {
    console.log("!!!clicked!!!")
    $(".events").removeClass('hidden')
    let lat = $(".lat",this).html();
    let lng = $(".lng",this).html();
    let loc = new google.maps.LatLng(lat, lng);
    startMap(lat, lng)
    addMarkerB(loc, map)
    markerCollection.push(lat)
  })

  $('.events>.row>.cards').click(function () {
    console.log("!!!clicked!!!")
    $(".events").removeClass('hidden')
    $("#mapc").removeClass('hidden')
    let lat = $(".lat",this).html();
    let lng = $(".lng",this).html();
    let loc = new google.maps.LatLng(lat, lng);
    startMap(lat, lng)
    addMarkerC(loc, mapc)
  })

  function startMap(lat, lng) {

    const ironhackBER = { lat: 52.5053175, lng: 13.3727438 };

    // Map initialization
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: ironhackBER
    });


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Center map with user location
        map.setCenter(user_location);

        // console.log('lat:', lat)

        // Add a marker for your user location
        const ironHackBERMarker = new google.maps.Marker({
          position: {
            lat: Number(lat),
            lng: Number(lng)
          },
          map: map,
          title: "You are here"
        });

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }

  startMap();

  function addMarker(loc, map) {
    console.log("loc", loc)
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map,
    });
    // marker.setMap(map);
  }
  function addMarkerB(loc, map) {
    console.log("loc", loc)
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map,
    });
    // marker.setMap(map);
  }

  function addMarkerC(loc, map) {
    console.log("loc", loc)
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map,
    });
    // marker.setMap(map);
  }

  // Adds a marker to the map.
  // function addMarker(location, map) {
  //   // Add the marker at the clicked location, and add the next-available label
  //   // from the array of alphabetical characters.
  //   var marker = new google.maps.Marker({
  //     position: location,
  //     label: labels[labelIndex++ % labels.length],
  //     map: map
  //   });
  // }

  // google.maps.event.addDomListener(window, 'load', initialize);

  // To add the marker to the map, call setMap();
  // marker.setMap(map);
  // var latlng = new google.maps.LatLng(42.745334, 12.738430);

  // function addmarker(latilongi) {
  //     var marker = new google.maps.Marker({
  //         position: latilongi,
  //         title: 'new marker',
  //         draggable: true,
  //         map: map
  //     });
  //     map.setCenter(marker.getPosition())
  // }

  // $('#btnaddmarker').on('click', function() {
  //     addmarker(latlng)
  // })
});
