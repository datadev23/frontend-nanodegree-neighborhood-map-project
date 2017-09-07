/* http://knockoutjs.com/documentation/custom-bindings.html */
var markers = [];

var foodmarkers = [];

var foodcoordinate = [];

var model = [];

var map;
var length;

var phone;

var foodmarker;

var locations = [{
        title: 'Park Ave Penthouse',
        location: {
            lat: 40.7713024,
            lng: -73.9632393
        },
        category: "Penthouse",
        color: '#ff1a1a'
    },
    {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        },
        category: "Loft",
        color: '#1a66ff'
    },
    {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        },
        category: "Entertainment",
        color: '#ffcc00'
    },
    {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        },
        category: "Entertainment",
        color: '#00e600'
    },
    {
        title: 'TriBeCa Artsy Bachelor Pad',
        location: {
            lat: 40.7195264,
            lng: -74.0089934
        },
        category: "Entertainment",
        color: '#ff0066'
    },
    {
        title: 'Chinatown Homey Space',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        },
        category: "Entertainment",
        color: '#c61aff'
    }
];

var food = {


}
var locationdata = locations[0].title;
var section = ['All', 'Entertainment', 'Loft', 'Penthouse', "shopping"]

var distance = [100,200,300,400,500];

console.log(locationdata);
var viewModel = {

    locations: ko.observableArray(locations),
    query: ko.observable(''),
    availableSections: ko.observableArray(section),
    availablelocations: ko.observableArray(locations),
    availabledistances: ko.observableArray(distance),
            chosenSection: ko.observableArray(['All']), // Initially, only Germany 
};
//console.log(locations);


// get the data from the textbox


//alert(location);
//viewModel.query.subscribe(viewModel.search);

foodmarkerdata = function(response) {

    for (i = 0; i < length; i++) {
        //console.log(i);

        var lat = parseFloat(response['response']['venues'][i].location.lat);
        var lng = parseFloat(response['response']['venues'][i].location.lng);
        var title = (response['response']['venues'][i].name);
     phone = (response['response']['venues'][i].contact.phone);

        console.log(phone);

        console.log("distance", distance[i])

        //alert(lat + " " + lng + " (types: " + (typeof lat) + ", " + (typeof lng) + ")")
        // console.log(response['response']['venues'][i].location.lng);
        // console.log(response['response']['venues'][i].location.lat);
        // console.log("titles" + title); 

        var largeInfowindow = new google.maps.InfoWindow();
   
        foodcoordinate = {
            'lat': lat,
            'lng': lng
        };

        foodmarker = new google.maps.Marker({
            map: map,
            position: foodcoordinate,
            title: title,
            icon: pinSymbol("#FFF"),
            draggable: true,
            phone: phone
        });

             foodmarker.addListener('click', function() {
                foodMarkerPopulateInfoWindow(this, largeInfowindow);
                toggleBounce(this);
               

            });

              //foodmarker.addListener('click', toggleBounce);

// https://developers.google.com/maps/documentation/javascript/examples/marker-animations

              function toggleBounce(foodmarker) {
        if (foodmarker.getAnimation() !== null) {
        } else {
          foodmarker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }




        viewModel.foodMarkers.push(foodmarker);

        //console.log(title);

      


    }


}

// filter function
var showlist = true;

console.log(section);

//console.log(locations.catagory[0]);

viewModel.foodMarkers = ko.observableArray([]);

viewModel.filteredLocations = ko.computed(function() {
    var chosenSection = this.chosenSection();
    var filter = this.query().toLowerCase();

    console.log(this.chosenSection());
    //if (!filter) {
    console.log(chosenSection[0]);
    if (chosenSection[0] === "All") {
        // TODO: add loop to set all marker properties to visible **************
        return this.locations();

    } else {
        return ko.utils.arrayFilter(this.locations(), function(location) {
            //  console.log("current location outside foursquare lat " + location.location.lat);
            //            console.log("current location outside foursquare lng " + location.location.lng);

            // add the lat long from the users input and pass it to the foursquare api
            //alert(location);
            var category = location.category;
            var title = location.title.toLowerCase();
            var local = location.location.lat + "," + location.location.lng;
            //var match = title.indexOf(filter) >= 0;
            var match = chosenSection.includes(category); // true or false
            console.log(match, );
            location.marker.setVisible(match);
            console.log(category, chosenSection, match)
            
            //console.log(local);
            if (match) {
                $.ajax({
                    url: "https://api.foursquare.com/v2/venues/search?client_id=KGJSO3R02HH124IYCUAYMJESY0CVOOTDTWWDJKY5ZCVWSPIL&client_secret=HOYZXG51I1NISLFXH5HMEXUFIQUCSLPKN2ZHNB3FROKLT2DS&v=20130815&ll=" + local + "&intent=browse&query=sushi&radius=300",

                    // The name of the callback parameter, as specified by Media Wiki
                    // jsonp: "callback",

                    // Tell jQuery we're expecting JSONP
                    dataType: "jsonp",



                    // Work with the response
                    success: function(response) {
                        // alert("successful query");



                        // alert(showlist);
                        // foodmaker
                        length = response['response']['venues'].length;
                        console.log(length);
                        var i = 1;
                        foodmarkerdata(response);



                    }
                });
                // 


            }
            return match;

        });
    }
}, viewModel);



// this is my model for knockout
function MyModel() {

    this.mapTwo = ko.observable({
        lat: ko.observable(40.74135),
        lng: ko.observable(-73.99802)
    });


}


  


// intitialise function which initialises the binding for MyViewModel
function initialise() {

    //console.log("initialise map");
    // validate the mpa is
    validation();

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map2Div'), {
        center: {
            lat: 40.7413549,
            lng: -73.9980244
        },
        zoom: 13
    });

   


    MyModel();
    ko.applyBindings(viewModel);
}


function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
    };
}

ko.bindingHandlers.map = {
    init: function(element, valueAccessor, allBindingsAccessor, MyViewModel) {
        //console.log("initialise binding");
     

        var bounds = new google.maps.LatLngBounds();
        var largeInfowindow = new google.maps.InfoWindow();
        // loop through the location points
        // var street= $("input:search[id$='mysearch']").val();

        for (var i = 0; i < locations.length; i++) {
            var position = (locations[i].location);
            var title = (locations[i].title);
            var color = (locations[i].color)
            //  console.log(locations[i].title);


            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                icon: pinSymbol(color),
                animation: google.maps.Animation.DROP,
                draggable: true
            });
            //console.log("my responses" + response['response']['venues'][4].location.lat);
           
           //marker.setAnimation(google.maps.Animation.BOUNCE);

            markers.push(marker);
            foodmarkers.push(foodmarker);

            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
               

            });




     
             
          

        





            locations[i].marker = marker;
            locations[i].marker.foodmarkers = foodmarker;
            //alert(locations[i].marker.title);


        }

        // alert(locations[i].marker.foodmarkers.title);

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
        infowindow.addListener('closeclick', function() {
            // infowindow.setMarker(null);
        });
    }
}


function foodMarkerPopulateInfoWindow(foodmarker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.foodmarker != foodmarker) {
        infowindow.foodmarker = foodmarker;
        infowindow.setContent('<div>' + '<p>' + 'name ' + foodmarker.title + '</p>'+  ' phone: ' + foodmarker.phone + '</div>');
        infowindow.open(map, foodmarker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            // infowindow.setMarker(null);
        });
    }
}

function validation() {
 if (google.maps) {

        console.log("google map loaded");
    }
    else {

        console.log("google map failed ")
    }

}


