
/* http://knockoutjs.com/documentation/custom-bindings.html */


var markers = [];

var foodmarkers = [];

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

};
console.log(locations);


// get the data from the textbox



//alert(location);
//viewModel.query.subscribe(viewModel.search);

// filter function

viewModel.filteredLocations = ko.computed(function() {
    var filter = this.query().toLowerCase();
    if (!filter) {
        // TODO: add loop to set all marker properties to visible **************
        return this.locations();
    } else {
        return ko.utils.arrayFilter(this.locations(), function(location) {
            console.log("current location outside foursquare lat " + location.location.lat);
                       console.log("current location outside foursquare lng " + location.location.lng);

                       // add the lat long from the users input and pass it to the foursquare api
 var local = location.location.lng + "," + location.location;
 console.log(local);
            $.ajax({
    url: "https://api.foursquare.com/v2/venues/search?client_id=KGJSO3R02HH124IYCUAYMJESY0CVOOTDTWWDJKY5ZCVWSPIL&client_secret=HOYZXG51I1NISLFXH5HMEXUFIQUCSLPKN2ZHNB3FROKLT2DS&v=20130815&ll=" + local +"&query=sushi",
 
    // The name of the callback parameter, as specified by Media Wiki
   // jsonp: "callback",
 
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
 
   
 
    // Work with the response
    success: function( response ) {
   // alert("successful query");
    var length = response['response']['venues'];
    var i = 1;
   for (i =0; i < length.length; i++) {
    console.log(response['response']['venues'][i].name);
   }
   
  
    }
});
         // 
      
        
            var match = location.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
            location.marker.setVisible(match);
            return match;
           
        });
    }
}, viewModel);



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

  
MyModel();
   ko.applyBindings(viewModel);
} 

ko.bindingHandlers.map = {
            init: function (element, valueAccessor, allBindingsAccessor, MyViewModel) {
              console.log("initialise binding");
 
      var bounds = new google.maps.LatLngBounds();   
      var largeInfowindow = new google.maps.InfoWindow();   
           // loop through the location points
          // var street= $("input:search[id$='mysearch']").val();
         
           for(var i=0; i< locations.length; i++) {
           var position = (locations[i].location);
           var title = (locations[i].title);
         //  console.log(locations[i].title);
                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    title: title,
                    draggable: true
                });    

                markers.push(marker); 
                 marker.addListener('click', function() {
        populateInfoWindow(this,largeInfowindow);
       

        });
                 locations[i].marker = marker;

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
           // infowindow.setMarker(null);
          });
        }
      }










