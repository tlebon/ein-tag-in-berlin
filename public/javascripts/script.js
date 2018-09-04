$(document).ready(() => {
  console.log("ready")


  $('button.random').on('click', function () {
    console.log('getting results')
    getResults();
  })
  function getResults() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('center: ', center)
        
      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }

});
