<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">{{ data.nama_layanan }}</p>
          <p class="subtitle is-6">{{ data.ukuran }}</p>
          <p class="subtitle is-6">Rp {{ data.harga }}</p>
        </div>
      </div>
    </div>
    <b-button 
          class="card-footer-item"
          type="is-text"
          @click="tambahLayanan(data)">
            <span class="icon is-small has-text-info">
              <i class="material-icons mdi">add_shopping_cart</i>
            </span>
      </b-button>
      <b-button 
          class="card-footer-item"
          type="is-text"
          @click="kurangiLayanan(data.id_layanan)">
            <span class="icon is-small has-text-danger">
              <i class="material-icons mdi">remove_shopping_cart</i>
            </span>
      </b-button>
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
    tambahLayanan: {
      type: Function
    },
    kurangiLayanan: {
      type: Function
    }
  },
}
</script>