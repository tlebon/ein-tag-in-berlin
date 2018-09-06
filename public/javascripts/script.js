let markerCollection = [];

$(document).ready(() => {
  console.log("ready beep");

  getResults();

  // $('button.random').on('click', function () {
  //   console.log('getting results')
  // })
  function getResults() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let title = `YOU`;
          markerCollection.push({ title: title, lat: position.coords.latitude, lng: position.coords.longitude, icon: "http://maps.google.com/mapfiles/ms/micons/man.png", });
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          $(".restaurants").removeClass("hidden");
          $(".loading").html("");
          console.log("center: ", center);
          $(".redirect").html(
            '<a href="locate/' +
            center.lat +
            "/" +
            center.lng +
            '"><button class="random">Haben Sie einen schönen Tag</button></a>'
          );
          // $(".lat").val(center.lat)
          // $(".lng").val(center.lng)
          console.log("inserted link");
        },
        function () {
          console.log("Error in the geolocation service.");
        }
      );
    } else {
      console.log("Browser does not support geolocation.");
    }
    // let lat = position.coords.latitude
    // let lng = position.coords.longitude
    // startMap(lat, lng);
  }

  $(".restaurants>.row>.cards").click(function () {
    console.log(this.cardtext);
    console.log($(".card-text.lng").html());
    // $(this)
    $(".bars").removeClass("hidden");
    $("#map").removeClass("hidden");
    let lat = $(".lat", this).html();
    let lng = $(".lng", this).html();
    let loc = new google.maps.LatLng(lat, lng);
    let title = `SPOT`;
    // if (markerCollection.length >= 3) {
    //  let pos = markerCollection.map(function (e) { return e.title; }).lastIndexOf('SPOT');
    //   markerCollection.pop(pos)
    // }
    if (markerCollection.length >= 2) {
    let pos = markerCollection.map(function (e) { return e.title; }).lastIndexOf('SPOT');
      markerCollection.pop(pos)
    }
    if (markerCollection.length >= 3) {
      let pos = markerCollection.map(function (e) { return e.title; }).indexOf('SPOT2');
        markerCollection.pop(pos)
      }

    markerCollection.push({ title: title, lat: lat, lng: lng, icon: 'http://maps.google.com/mapfiles/ms/micons/restaurant.png' });
    startMap(lat, lng);
    $(".restaurants").addClass("hidden");
    $(".rest-btn").removeClass("hidden");
    // addMarker(loc, map);
  });
  $(".rest-btn").click(function () {
    $(".restaurants").removeClass("hidden");
  })

  $(".bars>.row>.cards").click(function () {
    console.log("!!!clicked!!!");
    $(".events").removeClass("hidden");
    let lat = $(".lat", this).html();
    let lng = $(".lng", this).html();
    let loc = new google.maps.LatLng(lat, lng);
    let title = `SPOT2`;
    // markerCollection.pop(2)
    if (markerCollection.length >= 3) {
     let pos = markerCollection.map(function (e) { return e.title; }).lastIndexOf('SPOT2');
      markerCollection.pop(pos)
    }
    markerCollection.push({ title: title, lat: lat, lng: lng, icon: 'http://maps.google.com/mapfiles/ms/micons/bar.png' });
    startMap(lat, lng);
    // addMarkerB(loc, map);
    // markerCollection.push(lat);
    $(".bars").addClass("hidden");
    $(".bar-btn").removeClass("hidden");
    // addMarker(loc, map);
  });
  $(".bar-btn").click(function () {
    $(".bars").removeClass("hidden");
  })

  $(".events>.row>.cards").click(function () {
    console.log("!!!clicked!!!");
    $(".events").removeClass("hidden");
    $("#mapc").removeClass("hidden");
    let lat = $(".lat", this).html();
    let lng = $(".lng", this).html();
    let loc = new google.maps.LatLng(lat, lng);
    let title = `SPOT3`
    if (markerCollection.length >= 4) {
      let pos = markerCollection.map(function (e) { return e.title; }).lastIndexOf('SPOT3');
       markerCollection.pop(pos)
     }
    markerCollection.push({ title: title, lat: lat, lng: lng, icon: 'http://maps.google.com/mapfiles/ms/micons/question.png' });
    startMap(lat, lng);
    // addMarkerC(loc, mapc);
    $(".events").addClass("hidden");
    $(".event-btn").removeClass("hidden");
    // addMarker(loc, map);
  });
  $(".events-btn").click(function () {
    $(".events").removeClass("hidden");
  })


  function startMap(lat, lng) {
    const ironhackBER = { lat: 52.5053175, lng: 13.3727438 };

    // Map initialization
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: ironhackBER
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const user_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // Center map with user location
          map.setCenter(user_location);

          // console.log('lat:', lat)

          // Add a marker for your user location
          for (let i = 0; i < markerCollection.length; i++) {
            console.log(markerCollection[i])
            new google.maps.Marker({
              position: {
                lat: Number(markerCollection[i].lat),
                lng: Number(markerCollection[i].lng)
              },
              map: map,
              icon: markerCollection[i].icon,
              title: "You are here",
            });
          }
        },
        function () {
          console.log("Error in the geolocation service.");
        }
      );
    } else {
      console.log("Browser does not support geolocation.");
    }
    // ironHackBERMarker
  }

  // startMap();

  function addMarker(loc, map) {
    console.log("loc", loc);
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map
    });
    // marker.setMap(map);
  }
  function addMarkerB(loc, map) {
    console.log("loc", loc);
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map
    });
    // marker.setMap(map);
  }

  function addMarkerC(loc, map) {
    console.log("loc", loc);
    let marker = new google.maps.Marker({
      position: loc,
      setMap: map
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
