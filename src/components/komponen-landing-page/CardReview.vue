<template>
  <div class="review">
    <div class="columns is-gapless is-mobile">
      <div class="column is-5">
        <img
            class="image"
            :src="require(`../../assets/${review.image}.webp`)"
            :alt="review.image"
        />
      </div>
      <div class="column">
        <h6 class="title">{{ review.name }}</h6>
        <p class="subtitle">
          {{ review.msg }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review {
  width: 500px;
  height: 224px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 32px;
  margin: 30px auto;
}
</style>

<script>
export default {
  name: 'LandingPage-Review',
  props: {
    msg: String,
    review: Object,
  },
  data() {
    return {

    }
  },
  methods: {
    
  },
  mounted() {
    console.log(this.review.image)
  }
}
</script>