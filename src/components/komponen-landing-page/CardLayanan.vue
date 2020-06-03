<template>
  <div class="card-layanan">
    <div class="nama-layanan has-text-centered">
      <p class="title is-5">{{ data.nama_layanan }}</p>
      <p class="subtitle is-7">
        {{ data.jenis }} {{ data.ukuran }}
      </p>
    </div>
    <div class="info">
      <p class="subtitle is-6 has-text-centered">
        <b>Rp {{ data.harga }}</b>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card-layanan {
  width: 350px;
  height: 170px;
  border-radius: 10px;
  border: solid 1px #dadbe6;
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 10rem;
  position: relative;
}
.nama-layanan {
  padding: 20px;
}
.info {
  padding: 20px;
  border-radius: 0 0 10px 10px;
  position: absolute;
  background-color: #f0f1f7;
  width: 100%;
  height: 60px;
  bottom: 0;
}
.card-content {
  padding: 15px 10px;
}
.media-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  props: {
    data: {
      type: Object
    },
  },
}
</script>