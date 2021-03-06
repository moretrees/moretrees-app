<template>
  <div id="Home">
    <header class="header">
      <h1 class="header__title">Let's Plant More Trees</h1>
      <h2 class="header__subtitle">A project by moretrees.nyc</h2>
      <button @click="scrollTo('#who-are-we')" class="header__cta">
        Learn More
      </button>
    </header>
    <main class="main">
      <section class="section section--lawn"></section>
      <section id="who-are-we" class="section section--tree">
        <!-- <svg class="planter__icon">
          <use xlink:href="../assets/planter.svg" />
        </svg>-->
        <img class="planter__icon" src="../assets/planter.png" />
        <div class="section__content section__content--right">
          <h2 class="section__title">Who Are We</h2>
          <p class="section__text">
            <a href="/">MoreTrees</a> is a grassroots project started by two
            Brooklyn residents,
            <a href="https://www.anzollitto.com/" target="_blank" noreferrer
              >Andy Anzollitto</a
            >
            and
            <a href="https://jk-lee.com" target="_blank" noreferrer>Joey Lee</a
            >. Andy is a type designer and Joey is a creative technologist.
            Together, they have joined forces to put their design and tech
            skills to work to make New York City greener, one tree at a time.
          </p>
        </div>
      </section>
      <section class="section section--tree">
        <img
          class="tree-branch__icon tree-branch__icon--right"
          src="../assets/tree-branch--right.png"
        />
        <div class="section__content section__content--left">
          <h2 class="section__title">What We're Doing</h2>
          <p class="section__text">
            <a href="/">MoreTrees</a> is a project about mapping empty tree beds
            across New York City. Why? By mapping the empty tree beds, we can
            make a
            <a
              href="https://portal.311.nyc.gov/report-problems/"
              noreferrer
              target="_blank"
              >311 request</a
            >
            for the City to plant a tree there! Whether you're walking your dog,
            on your way to work, or just on a stroll, you can submit the
            location of an empty tree bed and we'll submit your 311 request for
            you!
          </p>
        </div>
      </section>
      <section class="section section--tree">
        <img
          class="tree-branch__icon tree-branch__icon--left"
          src="../assets/tree-branch--left.png"
        />
        <div class="section__content section__content--right">
          <h2 class="section__title">Get Involved</h2>
          <p class="section__text">You can help us by:</p>
          <ol class="section__list">
            <li>Submitting locations of empty tree beds,</li>
            <li>Maintaining existing trees where you live, and</li>
            <li>Getting involved in the NYC tree stewardship program.</li>
          </ol>
          <p class="section__text">
            If it is within your means, you may also consider donating to
            support our project or sponsoring other helpful costs like our
            server and database costs. Any contributions are welcome!
          </p>
        </div>
      </section>
      <section class="section section--tree">
        <img
          class="tree-branch__icon tree-branch__icon--right"
          src="../assets/tree-branch--right.png"
        />
        <div class="section__content section__content--left">
          <h2 class="section__title">Learn More</h2>
          <p class="section__text">
            There's so much to learn! Are you interested in learning about
            trees? The human health and environmental benefits trees provide?
            The opportunities and initiatives offered by New York City to get
            involved with environmental stewardship? If so, check out our
            learning page!
          </p>
        </div>
      </section>
      <section class="section section--tree">
        <div id="tree-map">
          <MapComponent v-bind:scrollWheelZoom="false" />
        </div>
        <!-- <header class="section__top-header">
          <div class="section__top-header--bubble">
            <h3>Made with ❤ by Andy & Joey</h3>
          </div>
          <h2>Help Plant More Trees!</h2>
        </header>-->
      </section>
    </main>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
export default {
  name: "Home",
  components: {
    MapComponent
  },
  methods: {
    scrollToBottom() {
      var $header = document.querySelector(".header");
      $header.scrollIntoView();
    },
    scrollTo(id) {
      var $el = document.querySelector(id);
      $el.scrollIntoView();
    }
  },
  mounted() {
    this.scrollToBottom();
  }
};
</script>

<style scoped lang="scss">
#Home {
  width: 100%;
  background: rgb(171, 220, 207);
  background: linear-gradient(
    0deg,
    rgba(171, 220, 207, 1) 19%,
    rgba(145, 203, 194, 1) 96%
  );
  display: flex;
  flex-direction: column-reverse;
}

#tree-map {
  // clip-path: circle(48.0% at 38% 29%);
  width: 100%;
  height: 100%;
}
.section__top-header {
  content: "";
  position: absolute;
  bottom: 0;
  right: 1rem;
  width: 340px;
  height: 340px;
  border: 2px solid #73903a;
  z-index: 9999;
  border-radius: 50%;
  background-color: #73903a;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0px black;

  &--bubble {
    position: absolute;
    top: 0;
    right: 0;
    border: 2px solid #73903a;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    transform: translate(0, -80%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #73903a;
    color: white;
    text-align: center;
    padding: 1rem;
    box-shadow: 2px 2px 0px black;
    z-index: 9998;
  }
}

.header {
  height: 90vh;
  background-color: #412517;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    color: #eee;
    font-size: 2.4rem;
    max-width: 600px;
    text-align: center;
    @media screen and (max-width: 600px) {
      max-width: 340px;
      font-size: 1.8rem;
    }
  }

  &__subtitle {
    color: #eee;
    font-size: 1.4rem;
    font-weight: 100;
    max-width: 600px;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  &__cta {
    border: 2px solid #5f642c;
    background-color: none;
    color: #5f642c;
    background: none;
    width: 200px;
    height: 3rem;
    text-decoration: none;
    margin-top: 4rem;
  }
}

.main {
  display: flex;
  flex-direction: column-reverse;
}

.section {
  height: 90vh;

  &__title {
    z-index: 100;
    max-width: 400px;
    width: 100%;
    font-size: 2.6rem;

    @media screen and (max-width: 600px) {
      max-width: 100%;
      padding: 0rem 1rem;
      color: white;
    }
  }
  &__text {
    z-index: 100;
    max-width: 400px;
    width: 100%;
    font-size: 1.2rem;

    @media screen and (max-width: 600px) {
      max-width: 100%;
      padding: 1rem;
      color: white;
    }

    ol {
      margin-left: 1.5rem;
    }
    a,
    a:link,
    a:visited {
      color: white;
      text-decoration: none;
    }
  }

  &__content {
    padding: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--left {
      align-items: flex-start;
    }
    &--right {
      align-items: flex-end;
    }

    @media screen and (max-width: 600px) {
      justify-content: flex-start;
    }
  }

  &--lawn {
    background: rgb(115, 144, 58);
    background: linear-gradient(
      180deg,
      rgba(115, 144, 58, 1) 27%,
      rgba(95, 100, 44, 1) 45%,
      rgba(65, 37, 23, 1) 82%
    );
  }

  &--tree {
    position: relative;
  }

  &--tree:before {
    content: "";
    position: absolute;
    width: 200px;
    height: 100%;
    background-color: #8a3f38;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;

    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
}
.planter__icon {
  z-index: 9000;
  width: 400px;
  height: 8rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 600px) {
    width: 100%;
  }
}
.tree-branch__icon {
  width: 520px;
  position: absolute;
  z-index: 99;

  &--left {
    left: 50%;
    top: 50%;
    transform: translate(-90%, -50%);
  }
  &--right {
    left: 50%;
    top: 50%;
    transform: translate(-10%, -50%);
  }
}
</style>
