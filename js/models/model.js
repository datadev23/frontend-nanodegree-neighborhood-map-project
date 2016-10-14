
/* http://knockoutjs.com/documentation/custom-bindings.html */


var markers = [];

var model = [];

var map;

 var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];

var viewModel = {  

locations: ko.observableArray(locations),
query: ko.observable(''),

   search: function(value) {
        viewModel.locations.removeAll();
        for(var x in locations) {
         console.log(x);
        }
      }

}

// this is my model for knockout
function MyModel() {

    this.mapTwo = ko.observable({
        lat: ko.observable(40.74135),
        lng:ko.observable(-73.99802)
    });

  
}

// intitialise function which initialises the binding for MyViewModel
function initialise() {

  console.log("initialise map");

   // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map2Div'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
        });

  
   ko.applyBindings(MyModel);

} 




ko.bindingHandlers.map = {
            init: function (element, valueAccessor, allBindingsAccessor, MyViewModel) {
              console.log("initialise binding");
      var bounds = new google.maps.LatLngBounds();      
           // loop through the location points
           
           for(var i=0; i< locations.length; i++) {
           var position = (locations[i].location);
           var title = (locations[i].title);
           console.log(locations[i].title);
                var marker = new google.maps.Marker({
                    map: map.googleMap,
                    position: position,
                    title: "You Are Here",
                    draggable: true
                });    

                markers.push(marker); 

            }

            for(var i=0; i < markers.length; i++) {

            markers[i].setMap(map);
            bounds.extend(markers[i].position);
            
            }

               
            }
        };


var Model = new MyModel();

function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker(null);
          });
        }
      }










