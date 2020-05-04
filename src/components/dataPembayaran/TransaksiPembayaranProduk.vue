<template>
  <section id="transaksi-pembayaran-produk">

    <b-table
      :data="datas"
      :hoverable="true"
      :loading="isLoading" 
      :mobile-cards="true"
      paginated
      per-page="10"
      ref="table"
      detailed
      detail-key="nomor_transaksi"
      :show-detail-icon="true"
      :opened-detailed="detailOpened"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">

        <b-table-column 
            field="id" 
            label="No." 
            width="50px"
            centered
            sortable>
          {{ props.index + 1 }}
        </b-table-column>

        <b-table-column 
            field="nomor_transaksi" 
            label="Nomor Transaksi" 
            width="150px"
            :searchable="true" 
            sortable>
          {{ props.row.nomor_transaksi }}
        </b-table-column>

        <b-table-column 
            field="tgl_penjualan" 
            label="tanggal penjualan"
            width="70px">
          {{ props.row.tgl_penjualan }}
        </b-table-column>

        <b-table-column 
            field="total" 
            label="total"
            sortable>
          {{ 'Rp.' + props.row.total }}
        </b-table-column>

        <b-table-column 
            field="status_pembayaran" 
            label="status pembayaran"
            width="70px">
          {{ props.row.status_pembayaran }}
        </b-table-column>

        <b-table-column 
            field="tgl_pembayaran" 
            label="tanggal pembayaran"
            sortable>
          {{ props.row.tgl_pembayaran }}
        </b-table-column>

        <b-table-column 
            field="diskon" 
            label="diskon"
            sortable>
          {{ 'Rp.' + props.row.diskon }}
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                tag="router-link"
                :to="'/kasir/form-transaksi-pembayaran-produk/' + props.row.nomor_transaksi"
                rounded>
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id)" 
                rounded>
                  <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <p>
                    <strong>Customer Service : </strong>
                    <small>{{ props.row.customer_service }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Kasir : </strong>
                    <small>{{ props.row.kasir }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </article>
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

    <template slot="footer">
      <div class="has-text-centered">
        <b-button size="is-medium" 
            type="is-light" 
            icon-left="plus" 
            tag="router-link" 
            to="/kasir/form-transaksi-pembayaran-produk" 
            @click="addData()"
            expanded>
          Bayar
        </b-button>
      </div>
    </template>

    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      detailOpened: [],  // Buat nampung index dari detail yang kebuka di tabel
      isLoading: true,
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/pembayaran_produk"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
        this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
        this.isLoading = false
      })
      .catch(error => {
        this.errors = error
        this.tableLoadingIcon = "emoticon-sad"  // Tampilan kalo
        this.tableMessage = 'Tidak ada data'    // ga ada data
        this.isLoading = false
      })
    },
    deleteData(deleteId) {
      var pic = { id_kasir: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session

      var uri = this.$api_baseUrl + "transaksi/produk/" + deleteId;
      
      this.$http.put(uri, pic).then(response => {
        this.getData();
        this.snackbarMsg = response
        this.snackbar('Data terhapus!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = "Terjadi kesalahan... Silahkan coba lagi"
        this.snackbar(this.snackbarMsg, 'is-danger')
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
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Hapus Data Produk',
        message: 'Apa anda yakin ingin <b>menghapus</b> pembayaran produk?',
        confirmText: 'Hapus',
        cancelText: 'Batal',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    }
  },
  mounted() {
    this.getData()
  },
}
</script>