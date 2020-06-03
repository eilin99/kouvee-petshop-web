<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-fullwidth">
        <img :src="$api_baseUrl + 'produk/picture/' + data.gambar">
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
    <footer class="card-footer" v-show="data.stok">
      <b-button 
          class="card-footer-item"
          type="is-text"
          :disabled="data.stok == 0"
          @click="kurangiProduk(data.id_produk)">
            <span class="icon is-small has-text-danger">
              <i class="material-icons mdi">remove_shopping_cart</i>
            </span>
      </b-button>
      <b-button 
          class="card-footer-item"
          type="is-text"
          :disabled="data.stok == 0"
          @click="tambahProduk(data)">
            <span class="icon is-small has-text-info">
              <i class="material-icons mdi">add_shopping_cart</i>
            </span>
      </b-button>
  </footer>
  </div>
</template>

<style scoped>
.card {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 143px;
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
    tambahProduk: {
      type: Function
    },
    kurangiProduk: {
      type: Function
    }
  },
}
</script>