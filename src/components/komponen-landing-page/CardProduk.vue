<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-fullwidth">
        <img class="gambar-produk" :src="$api_baseUrl + 'produk/picture/' + data.gambar">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">{{ data.nama_produk }}</p>
          <p class="subtitle is-6">Rp {{ data.harga_jual }}</p>
        </div>
      </div>
      <div class="content">
        <p class="subtitle is-7">
          Stok : 
          <span v-if="data.stok == 0" class="subtitle is-7 has-text-danger">
            <b>Kosong</b>
          </span>
          <span v-else class="subtitle is-7" >
            <b>{{ data.stok }} {{ data.satuan }}</b>
          </span>
        </p>
      </div>
    </div>
    <!-- <footer class="card-footer" v-show="data.stok">
      
    </footer> -->
  </div>
</template>

<style scoped>
.card {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 10rem;
  box-shadow: none;
  border: solid 1px #dadbe6;
  border-radius: 10px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}
.gambar-produk {
  width: 100%;
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