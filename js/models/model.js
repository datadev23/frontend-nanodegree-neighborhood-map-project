
/* http://knockoutjs.com/documentation/custom-bindings.html */


var markers = [];

var model = [];

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
          if(locations[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            viewModel.locations.push(locations[x]);
          }
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


   ko.applyBindings(MyModel);

} 




ko.bindingHandlers.map = {
            init: function (element, valueAccessor, allBindingsAccessor, MyViewModel) {
              console.log("initialise binding");
                var mapObj = ko.utils.unwrapObservable(valueAccessor());
               var latLng = new google.maps.LatLng(
                    ko.utils.unwrapObservable(mapObj.lat),
                    ko.utils.unwrapObservable(mapObj.lng));
                var mapOptions = { center: latLng,
                                  zoom: 12, 
                                  mapTypeId: google.maps.MapTypeId.ROADMAP};
            
                // viewModel.query.subscribe(viewModel.search);
                   

                mapObj.googleMap = new google.maps.Map(element, mapOptions);
                
                
           // loop through the location points
           
           for(var i=0; i< locations.length; i++) {
           var position = (locations[i].location);
           var title = (locations[i].title);
                mapObj.marker = new google.maps.Marker({
                    map: mapObj.googleMap,
                    position: position,
                    title: "You Are Here",
                    draggable: true
                });     

            }

                google.maps.event.addListener(mapObj.marker, 'dragend', mapObj.mymaker);
                
                $("#" + element.getAttribute("id")).data("mapObj",mapObj);
            }
        };


var Model = new MyModel();










