export default {
  state: {
    myMap: null,
    treeLocation: {
      latitude: 0,
      longitude: 0,
      altitude: -9999,
      altitudeAccuracy: -9999,
      accuracy: -9999,
      bounds: null,
      heading: -9999
    }
  },
  getters: {},
  mutations: {
    setTreeLocation(state, newTreeLocation) {
      state.treeLocation = newTreeLocation;
    },
    setTreeLatitude(state, latitude) {
      state.treeLocation.latitude = latitude;
    },
    setTreeLongitude(state, longitude) {
      state.treeLocation.longitude = longitude;
    }
  },
  actions: {
    setTreeLocation(context, data) {
      context.commit('setTreeLocation', data);
    },
    setTreeLatitude(context, latitude) {
      context.commit('setTreeLatitude', latitude);
    },
    setTreeLongitude(context, longitude) {
      context.commit('setTreeLongitude', longitude);
    }
  }
};
