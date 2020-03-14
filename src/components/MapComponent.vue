<template>
  <div id="MyMap" class="map-container"></div>
</template>

<script>
import * as L from "leaflet";
import "leaflet.locatecontrol";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "MapComponent",
  props: {
    scrollWheelZoom: Boolean
  },
  data() {
    return {
      userMarker: null,
      myMap: null,
      treeMarkers: null,
      treeLocation: {
        latitude: null,
        longitude: null,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        bounds: null,
        heading: null
      }
    };
  },
  computed: {
    isScrollZoomable() {
      return this.scrollWheelZoom;
    },
    trees() {
      return this.$store.state.trees.trees;
    }
  },
  methods: {
    createMap() {
      const map = L.map("MyMap", {
        scrollWheelZoom: this.isScrollZoomable
      }).setView([40.775449, -73.970959], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      this.myMap = map;
      this.userMaker = L.marker([0, 0]).addTo(this.myMap);
      this.treeMarkers = L.layerGroup().addTo(this.myMap);
      L.control.locate().addTo(this.myMap);

      const overlayMaps = {
        "empty trees": this.treeMarkers
      };

      L.control.layers(null, overlayMaps).addTo(this.myMap);
    },
    handleLocateUser(evt) {
      this.userMaker.remove();

      this.userMaker
        .setLatLng(evt.latlng)
        .bindPopup("Empty Tree Bed Near Here!")
        .openPopup();

      this.treeLocation = {
        latitude: evt.latlng.lat,
        longitude: evt.latlng.lng,
        altitude: evt.altitude,
        altitudeAccuracy: evt.altitudeAccuracy,
        accuracy: evt.accuracy,
        bounds: { ...evt.bounds },
        heading: evt.heading
      };

      this.userMaker.addTo(this.myMap);
      this.$store.commit("setTreeLocation", this.treeLocation);
    },
    handleStopLocatingUser() {
      this.myMap.stopLocate();
      this.userMaker.remove();

      this.treeLocation = {
        latitude: 0,
        longitude: 0,
        altitude: -9999,
        altitudeAccuracy: -9999,
        accuracy: -9999,
        bounds: null,
        heading: -9999
      };

      this.$store.commit("setTreeLocation", this.treeLocation);
    },
    locateUser() {
      // this.myMap.locate({ watch: true, setView: true });
      this.myMap.on("locationfound", this.handleLocateUser);
    },
    showTrees() {
      this.trees.forEach(item => {
        L.circle([item.latitude, item.longitude], {
          radius: 10,
          color: "red"
        })
          .bindPopup(
            `
        <div class="marker-popup" style="max-width:300px">
          <img src="${item.photo}" class="marker-popup__image" style="width:100%; min-width:200px;">
        </div>
        `
          )
          .addTo(this.treeMarkers);
      });
    }
  },
  async mounted() {
    await this.$store.dispatch("getTrees");
    this.createMap();
    this.locateUser();
    this.showTrees();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/leaflet.css";
@import "../assets/styles/fontawesome-free-5.12.1-web/css/all.min.css";

.map-container {
  width: 100%;
  height: 100%;
  z-index: 0;
  position:relative;
}
.leaflet-popup {
  width: 100%;
  max-width: 300px;
}

// .leaflet-popup-content {
//   max-width: 300px;
//   .marker-popup {
//     padding: 0.5rem;
//     &__image {
//       width: 100%;
//     }
//   }
// }
</style>
