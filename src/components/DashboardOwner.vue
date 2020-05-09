<template>
  <section id="dashboard">
    <h3 class="title is-3">
      Dashboard
    </h3>
    <hr>
    <div></div>

    <div class="tabel-stok-tipis">
      <h4 class="title is-4">Produk Hampir Habis</h4>
      <b-table
        :data="datas"
        :columns="columns"
        :hoverable="true"
        :loading="isLoading" 
        :mobile-cards="true"
        paginated
        per-page="10"
        ref="table"
        aria-previous-label="Previous page"
        aria-next-label="Next page"
        aria-page-label="Page"
        aria-current-label="Current page"
        narrowed>

        <template slot-scope="props">

          <b-table-column 
              field="id_produk" 
              label="No." 
              width="50px"
              centered
              sortable>
            {{ props.index + 1 }}
          </b-table-column>

          <b-table-column 
              field="nama_produk" 
              label="Nama Produk" 
              :searchable="true" 
              sortable>
            {{ props.row.nama_produk }}
          </b-table-column>

          <b-table-column 
              field="satuan" 
              label="Satuan"
              width="50px"
              :searchable="true">
            {{ props.row.satuan }}
          </b-table-column>

          <b-table-column 
              field="stok_minimum" 
              label="Stok min."
              width="70px"
              centered>
            {{ props.row.stok_minimum }}
          </b-table-column>

          <b-table-column 
              field="stok" 
              label="Stok"
              width="70px"
              centered>
                <div v-if="parseInt(props.row.stok) < parseInt(props.row.stok_minimum)">
                  <b-tag type="is-danger" size="is-medium" rounded>
                    {{ props.row.stok }}
                    </b-tag>
                </div>
                <div v-else>
                  {{ props.row.stok }}
                </div>
          </b-table-column>
<!-- 
          <b-table-column 
              field="harga_beli" 
              label="Harga beli"
              sortable>
            {{ 'Rp.' + props.row.harga_beli }}
          </b-table-column>

          <b-table-column 
              field="harga_jual" 
              label="Harga jual"
              sortable>
            {{ 'Rp.' + props.row.harga_jual }}
          </b-table-column> -->

        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  :icon="tableLoadingIcon"
                  size="is-large">
                </b-icon>
              </p>
              <p>{{ tableMessage }}</p>
            </div>
          </section>
        </template>

      </b-table>
    </div>

  </section>
</template>

<style scoped>
.tabel-stok-tipis {
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      isLoading: true,
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.datas = this.datas.filter(produk => parseInt(produk.stok) < parseInt(produk.stok_minimum))
        this.tableLoadingIcon = "magnify"            // Buat kalo user search
        this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
        this.isLoading = false
      })
      .catch(error => {
        this.errors = error
        this.tableLoadingIcon = "emoticon-happy"  // Tampilan kalo
        this.tableMessage = 'Semua stok produk aman'    // ga ada data
        this.isLoading = false
      })
    },
    snackbar(message, type) { // Snackbar buat ngasih tau http request berhasil apa nggak
      this.$buefy.snackbar.open({
        duration: 5000, // 5 detik
        message: message, // pesannya
        type: type, // tipe dapetnya dari parameter. Dia bisa 'is-danger' kalo gagal dan 'is-success' kalo berhasil
        position: 'is-bottom-left', // posisi munculnya
        actionText: 'OK',
        queue: false,
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>
