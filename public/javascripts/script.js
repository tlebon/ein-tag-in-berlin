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
        $(".redirect").html( '<a href="locate/'+center.lat+'/'+center.lng+'"><button class="random">Haben Sie einen schönen Tag</button></a>')
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

});
