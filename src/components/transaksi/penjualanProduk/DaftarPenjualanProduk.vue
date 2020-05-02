<template>
  <section id="daftar-penjualan-produk">
    <h4 class="title is-4">Daftar Penjualan Produk</h4>
    <hr>

    <b-table
      :data="datas"
      :columns="columns"
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
      aria-current-label="Current page"
      narrowed>

      <template slot-scope="props">

        <b-table-column  
            label="No." 
            width="50px"
            centered
            sortable>
          {{ props.index + 1 }}
        </b-table-column>

        <b-table-column 
            field="nomor_transaksi" 
            label="No. transaksi" 
            width="150px"
            :searchable="true" 
            sortable>
          {{ props.row.nomor_transaksi }}
        </b-table-column>

        <b-table-column 
            field="nama_customer" 
            label="Nama pelanggan"
            :searchable="true">
          <p v-if="props.row.nama_customer == null">-</p>
          <p v-else>{{ props.row.nama_customer }}</p>
        </b-table-column>

        <b-table-column 
            field="nama_hewan" 
            label="Nama hewan"
            width="150px"
            :searchable="true">
          <p v-if="props.row.nama_hewan == null">-</p>
          <p v-else>{{ props.row.nama_hewan }}</p>
        </b-table-column>

        <b-table-column 
            field="tgl_penjualan" 
            label="Tanggal"
            width="125px"
            searchable
            sortable>
          {{ props.row.tgl_penjualan }}
        </b-table-column>

        <b-table-column 
            field="total" 
            label="Total">
          {{ 'Rp.' + props.row.total }}
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                tag="router-link"
                :to="'/cs/detail-penjualan-produk/' + props.row.nomor_transaksi"
                rounded>
                  <b-icon icon="note" type="is-primary"></b-icon>
            </b-button>
            <b-button 
                type="is-text" 
                rounded>
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id_produk)" 
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
              <p>
                <strong>CS : </strong>
                <small>{{ props.row.customer_service }}</small>
              </p>
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
            to="/cs/penjualan-produk" 
            expanded>
          Tambah
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
      var uri = this.$api_baseUrl + "transaksi/produk"

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
      var uri = this.$api_baseUrl + "transaksi/produk/delete/{" + deleteId;
      var pic = { pic: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session
      
      this.$http.post(uri, pic).then(response => {
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
        message: 'Apa anda yakin ingin <b>menghapus</b> transaksi?',
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