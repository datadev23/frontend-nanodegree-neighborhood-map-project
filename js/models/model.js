
/* http://knockoutjs.com/documentation/custom-bindings.html */
function MyModel() {

this.mapOne = ko.observable({
        lat: ko.observable(40.74135),
        lng:ko.observable(-73.99802)
    });
}



$(document).ready(function () {
   ko.applyBindings(model);
});
var model = new MyModel();














