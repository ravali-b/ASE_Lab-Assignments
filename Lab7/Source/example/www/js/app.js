(function (window) {
  'use strict';

  /* Google Maps object */
  var Map = function() {
    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {lat: 39.0997265, lng: -94.5785667},
      zoom: 9
    });
    this.infoWindow = new google.maps.InfoWindow({
      content: '<div class="spinner" id="spinner"></div>'
    });
  };

  /* Location object */
  var Location = function (city, state, lat, lng) {
    this.city = city;
    this.state = state;
    this.lat = lat;
    this.lng = lng;
    this.marker = null;
    this.infoWindowContent = null;
  };

  /* ViewModel object */
  var ViewModel = function () {
    var self = this;

    self.locations = ko.observableArray([
      new Location('Kansas City', 'MO', 39.0997265, -94.5785667),
      new Location('Overland Park', 'KS', 38.9822282, -94.6707917),
      new Location('Merriam', 'KS', 39.023617, -94.69357),
      new Location('Shawnee', 'KS', 39.0228485, -94.7151865),
      new Location('Independence', 'MO', 39.0911161, -94.4155068),
      new Location('St. Louis', 'MO', 38.627003, -90.199404),
      new Location('Jefferson City', 'MO', 38.57670170000001, -92.17351639999998)
    ]);

    self.query = ko.observable('');

    //filter locations in sidebar
    //if location does not match search terms,
    //then remove its marker from the map
    self.filteredLocations = ko.computed(function () {
        if(self.map)
          self.map.infoWindow.close();
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(self.locations(), function (location) {
            if(location.city.toLowerCase().indexOf(search) >= 0) {
              if(self.map) {
                location.marker.setVisible(true);
              }
              return true;
            } else {
              if(self.map) {
                location.marker.setVisible(false);
              }
              return false;
            }
        });
    });

    //when either a marker or location in side bar has been clicked
    //animate marker and open location's infoWindow
    //close any existing infoWindows
    self.clickLocation = function(location) {
      self.map.infoWindow.setContent(location.infoWindowContent);
      location.marker.setAnimation(google.maps.Animation.BOUNCE);
      window.setTimeout(function() {
        location.marker.setAnimation(null);
      }, 700);
      self.map.infoWindow.open(self.map.map, location.marker);
    }.bind(self);

    //resize the map to fit in the viewport without scrolling
    self.resizeMap = function() {
      $(window).resize(function () {
          var h = $(window).height();
          var titleHeight = $('.title').outerHeight(true);
          $('.map').css('height', h - titleHeight);
      }).resize();
    };

    //add markers to map by geocoding each location's city
    self.addMarkers = function(){
      var locations = self.locations();
      for(var i = 0; i < locations.length; i++) {
        (function(i) {
          self.map.geocoder.geocode( { 'address': locations[i].city}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              locations[i].marker = new google.maps.Marker({
                  map: self.map.map,
                  position: results[0].geometry.location
              });
              locations[i].lat = results[0].geometry.location.lat();
              locations[i].lng = results[0].geometry.location.lng();
              locations[i].marker.addListener('click', function() {
                self.clickLocation(locations[i]);
              });
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          });
        })(i);
      }
    };

    //add infoWindows by making an AJAX call to Flickr's API
    //uses JSONP because of cross-domain restrictions
    self.addInfoWindows = function() {
      var locations = self.locations();

      for(var i = 0; i < locations.length; i++) {


        $.ajax({
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          url: 'https://api.flickr.com/services/rest',
          data: {
            format: 'json',
            method: 'flickr.photos.search',
            api_key: 'da4f3d3ccf2f0b9a043094d727af5467',
            text: locations[i].city
          },
          thisLocation: {location: locations[i]}
        }).done(function(data) {
          //if no data was returned
          if(!data) {
            this.thisLocation.location.infoWindowContent = '<p>Image was unable to be loaded</p>';
          } else {
            var photos = data.photos.photo;
            //get random photo from response
            var photo = photos[Math.floor(Math.random()*photos.length)];
            var imgURL = 'https://';
            var farmId = photo.farm;
            var serverId = photo.server;
            var photoId = photo.id;
            var secret = photo.secret;
            var title = photo.title;
            var size = 'm';
            imgURL += 'farm' + farmId + '.staticflickr.com/' + serverId +
              '/' + photoId + '_' + secret + '_' + size + '.jpg';

            var html = '<div class="infoWindowTitle"><h2>' + this.thisLocation.location.city + '</h2></div>';
            var imgStr = '<div><img src="' + imgURL + '"/></div>';
            html += imgStr;
            html += '<p>Image from Flickr</p>';
            this.thisLocation.location.infoWindowContent = html;
          }
        }).fail(function( jqxhr, textStatus, error ) {
          var html = '<div class="infoWindowTitle"><h2>' + this.thisLocation.location.city + '</h2></div>';
          html += '<p>Image was not able to be loaded because of the following error: ' + error;
          this.thisLocation.location.infoWindowContent = html;
          self.map.infoWindow.setContent(html);
        });
      }
    };
  };

  var viewModel = new ViewModel();

  //Google Maps API calls this callback when it is finished loading
  window.initMap = function() {
      viewModel.map = new Map();
      viewModel.resizeMap();
      viewModel.addMarkers();
      viewModel.addInfoWindows();
      ko.applyBindings(viewModel);
  };
  window.loadMapError = function() {
    alert('Google Maps API unable to be loaded.');
  }
}(this));
