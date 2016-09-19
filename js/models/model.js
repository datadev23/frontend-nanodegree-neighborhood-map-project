
/* http://knockoutjs.com/documentation/custom-bindings.html */
function MyModel() {

this.mapob = ko.observable({
        lat: ko.observable(40.74135),
        lng:ko.observable(-73.99802)
    });
}


ko.bindingHandlers.map = {

	 init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
                var latLng = new google.maps.LatLng(
                    ko.utils.unwrapObservable(mapObj.lat),
                    ko.utils.unwrapObservable(mapObj.lng));
                var mapOptions = { center: latLng,
                                  zoom: 6, 
                                  mapTypeId: google.maps.MapTypeId.ROADMAP};
                
                mapObj.googleMap = new google.maps.Map(element, mapOptions);

              $("#" + element.getAttribute("id")).data("mapObj",mapObj);
      }

	};


$(document).ready(function () {
   ko.applyBindings(model);
});
var model = new MyModel();














