<template>
  <div id="Submit">
    <div id="map-container">
      <MapComponent v-bind:scrollWheelZoom="true" />
    </div>
    <!-- <header class="header">
      <img src="#" class="image__preview" />
    </header>-->
    <main class="main">
      <p class="description">Hey, I found an empty tree bed!</p>
      <form class="tree-form" @submit.prevent="handleSubmit">
        <div class="tree-form__row">
          <label for="photo" class="tree-form__row-label">Step 1: Upload or Snap a photo</label>
          <input
            @change="handleFileSelection"
            type="file"
            name="photo"
            class="tree-form__input-file"
          />
        </div>
        <div class="tree-form__row">
          <label for="address" class="tree-form__row-label">Step 2: Approx. Address</label>
          <input
            v-model="address"
            type="text"
            name="address"
            class="tree-form__input-text"
            placeholder="4th ave and 9th st."
          />
          <section class="tree-form__section">
            <label for="latitude" class="tree-form__row-label">lat.</label>
            <label for="longitude" class="tree-form__row-label">lon.</label>
            <input
              v-model="latitude"
              type="text"
              name="latitude"
              class="tree-form__input-text"
              placeholder="e.g. 46.1"
            />
            <input
              v-model="longitude"
              type="text"
              name="longitude"
              class="tree-form__input-text"
              placeholder="e.g. -71.1"
            />
          </section>
          <button @click.prevent="resetCoordinates" class="coordinates-reset">reset</button>
        </div>
        <div class="tree-form__row">
          <label for="address" class="tree-form__row-label">Step 3: Submit</label>
          <input type="submit" value="submit" class="tree-form__input-submit" />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent";
export default {
  name: "Submit",
  data() {
    return {
      photo: null,
      address: null
    };
  },
  computed: {
    latitude: {
      get: function() {
        if (this.$store.state.geo.treeLocation !== null) {
          return this.$store.state.geo.treeLocation.latitude;
        }
        return 0;
      },
      set: function(newValue) {
        this.$store.dispatch("setTreeLatitude", newValue);
      }
    },
    longitude: {
      get: function() {
        if (this.$store.state.geo.treeLocation !== null) {
          return this.$store.state.geo.treeLocation.longitude;
        }
        return 0;
      },
      set: function(newValue) {
        this.$store.dispatch("setTreeLongitude", newValue);
      }
    }
  },
  components: {
    MapComponent
  },
  methods: {
    handleFileSelection(evt) {
      const selectedImage = evt.target.files[0];
      this.photo = selectedImage;
    },
    handleSubmit() {
      const newData = {
        photo: this.photo,
        address: this.address,
        latitude: this.longitude,
        longitude: this.latitude
      };
      this.$store.dispatch("addTree", newData);
    },
    resetCoordinates() {
      this.$store.dispatch("setTreeLocation", { longitude: 0, latitude: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
#Submit {
  width: 100%;
  height: calc(100vh - 2rem);
  position: relative;
  display: flex;
  flex-direction: column;
}

#map-container {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-basis: 50%;
}

.main {
  // position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  flex-grow: 2;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 1rem;
  z-index: 1000;
}
.description {
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.header {
  position: relative;
}

.image__preview {
  display: none;
}

.tree-form {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  &__section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  &__row {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;

    &-label {
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
    }
  }
  &__row:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &__input-text {
    width: 100%;
    height: 2rem;
    border-radius: 4px;
    outline: none;
    border: none;
    background-color: #eee;
    color: black;
    padding: 0 0.5rem;
  }
  &__input-submit {
    height: 2rem;
    border-radius: 4px;
    background-color: #b7e49f;
    border: none;
    outline: none;
    color: black;
  }
}
</style>
