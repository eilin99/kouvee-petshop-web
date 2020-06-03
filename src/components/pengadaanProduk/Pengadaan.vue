<template>
  <section id="pengadaan-produk">
    <h4 class="title is-4">Daftar Pengadaan Produk</h4>
    <hr>

    <b-table
      :data="datas"
      :hoverable="true"
      :loading="isLoading" 
      :mobile-cards="true"
      paginated
      per-page="10"
      ref="table"
      detailed
      detail-key="id"
      :show-detail-icon="true"
      :opened-detailed="detailOpened"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >

      <template slot-scope="props">

        <b-table-column  
          label="No." 
          width="50px"
          centered
          sortable>
            {{ props.index + 1 }}
        </b-table-column>

        <b-table-column 
          field="nomor_pengadaan" 
          label="No. pengadaan" 
          width="140px"
          :searchable="true" 
          sortable>
            {{ props.row.nomor_pengadaan }}
        </b-table-column>

        <b-table-column 
          field="nama_supplier" 
          label="Nama supplier"
          width="170px"
          :searchable="true">
            {{ props.row.nama_supplier }}
        </b-table-column>

        <b-table-column 
          field="tgl_pengadaan" 
          label="Tanggal"
          width="100px"
          :searchable="true">
            {{ props.row.tgl_pengadaan }}
        </b-table-column>

        <b-table-column 
          field="total" 
          label="Total">
            {{ 'Rp' + props.row.total }}
        </b-table-column>

        <b-table-column 
            field="status_cetak_surat" 
            label="Cetak"
            width="50px">
            <p v-if="props.row.status_cetak_surat == 'Sudah Cetak'">
              <b-icon size="is-medium" icon="check" type="is-success"></b-icon>
            </p>
        </b-table-column>

        <b-table-column 
            field="status_kedatangan" 
            label="Datang"
            width="50px">
            <p v-if="props.row.status_kedatangan == 'Sudah Datang'">
              <b-icon size="is-medium" icon="check" type="is-success"></b-icon>
            </p>
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                tag="router-link"
                :to="'/owner/form-pengadaan-produk/' + props.row.id"
                rounded>
                  <b-icon icon="note" type="is-primary"></b-icon>
            </b-button>

            <b-dropdown aria-role="list" position="is-bottom-left">
              <b-button
                type="is-text"
                slot="trigger"
                rounded
              >
                <template>
                  <span class="material-icons has-text-info">
                    picture_as_pdf
                  </span>
                </template>
              </b-button>

              <b-dropdown-item
                value="menu"
                aria-role="listitem"
                @click="openLaporan('show', props.row.id)"
              >
                Show
              </b-dropdown-item>
              <b-dropdown-item
                value="menu"
                aria-role="listitem"
                @click="openLaporan('print', props.row.id)"
              >
                Simpan
              </b-dropdown-item>
            </b-dropdown>

            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id)" 
                rounded
                :disabled="props.row.status_kedatangan == 'Sudah Datang' ? true : false">
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
                  <strong>No. Telp Supplier :<br></strong>
                  <small>{{ props.row.no_telp }}</small>
                </div>
                <div class="column">
                  <strong>Alamat supplier :<br></strong>
                  <small>{{ props.row.alamat }}</small>
                </div>
                <div class="column">
                  <strong>Owner :<br></strong>
                  <small>{{ props.row.owner }}</small>
                </div>
                <div
                  v-show="props.row.status_kedatangan == 'Sudah Datang' ? false : true" 
                  class="column is-3"
                >
                  <b-button
                    type="is-success"
                    icon-left="check"
                    rounded
                    style="margin-left: 60px"
                    @click="konfirmasiKedatangan(props.row.id)"
                  >
                    Barang diterima
                  </b-button>
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
            @click="openModal"
            expanded>
          Tambah
        </b-button>
      </div>
    </template>

    </b-table>

    <b-modal
        :active.sync="modalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
          <div class="modal-card" style="height:500px">
            <header class="modal-card-head">
                <p class="modal-card-title">Tambah Pengadaan</p>
            </header>
            <section class="modal-card-body">

              <b-field
                  label="Nama Supplier"
                  :message="formSupplier.nama_supplier.message"
                  :type="formSupplier.nama_supplier.type">
                  <b-autocomplete
                      v-model="cariSupplier"
                      icon="magnify"
                      placeholder="Supplier"
                      :open-on-focus="true"
                      :data="filteredDataSupplier"
                      @select="option => { formSupplier.nama_supplier.value = option.nama_supplier; formSupplier.id_supplier = option.id_supplier }"
                      @input="clearError(formSupplier.nama_supplier)"
                      field="nama_supplier"
                      clearable>
                  </b-autocomplete>
              </b-field>

            </section>
            <footer class="modal-card-foot">
              <div class="footer-modal">
                <div class="btn-right">
                  <button class="button" type="button" @click="modalActive = false">Batal</button>
                  <button class="button is-primary" @click="addData()">Lanjutkan</button>
                </div>
              </div>
            </footer>
        </div>
    </b-modal>
  </section>
</template>

<style scoped>
.level {
  padding: 0 !important;
  height: 60px;
}
.footer-modal {
  height: 35px;
  position: relative;
}
.btn-right {
  width: 180px;
  position: absolute;
  left: 430px;
}
</style>

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

      // Modal add new pengadaan 
      modalActive: false,
      cariSupplier: '',
      supplier: [],
      formSupplier: { // temp member buat kalo diedit
        id_supplier: 0,
        nama_supplier: { value: '', message: '', type: '' },
      },
    }
  },
  methods: {
    // -----------------------------------------------------------
    // GET
    // -----------------------------------------------------------
    async getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "pengadaan"

      await this.$http.get(uri).then(response => {
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

    async getSupplier() {
      var uri = this.$api_baseUrl + "supplier"

      await this.$http.get(uri).then(response => {
        this.supplier = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // -----------------------------------------------------------
    // POST
    // -----------------------------------------------------------
    async addData() {
      if (this.cekSupplier() == 0) {
        await this.postPengadaan()

        let idPengadaan = await this.getNoPengadaan()

        this.$router.push( { name: 'formPengadaanProduk', params: { id: idPengadaan } } )
        // this.$router.push( { name: 'Pelanggan' } )
      }
    },
    async postPengadaan() {
      let data = new FormData()

      data.append("id_supplier", this.formSupplier.id_supplier)
      data.append("pic", this.$session.get('pegawai').id_pegawai)

      var uri = this.$api_baseUrl + "pengadaan";

      await this.$http.post(uri, data).then(response => {
        console.log(response.message)
      })
      .catch(error => {
        this.errors = error;
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      });
    },
    async getNoPengadaan() {
      let allPengadaan = await this.$http.get(this.$api_baseUrl + "pengadaan")
      let pengadaan = allPengadaan.data.value
      let panjangArray = pengadaan.length

      return pengadaan[panjangArray-1].id
    },
    openModal() {
      this.formSupplier.id_supplier = 0
      this.formSupplier.nama_supplier.value = ''

      this.cariPelanggan = ''

      this.modalActive = true
    },
    cekSupplier() {
      let count = 0

      if (this.formSupplier.id_supplier == 0 ||
          this.cariSupplier == '') {
            count++
            this.formSupplier.nama_supplier.message = 'Supplier belum terpilih dengan benar'
            this.formSupplier.nama_supplier.type = 'is-danger'
      }
      return count
    },
    clearError(form) {
      form.type = ''
      form.message = '' 
    },

    // -----------------------------------------------------------
    // DELETE
    // -----------------------------------------------------------
    async deleteData(deleteId) {
      await this.deletePengadaan(deleteId)
      await this.getData();
    },
    async deletePengadaan(deleteId) {
      var uri = this.$api_baseUrl + "pengadaan/delete/" + deleteId;
      var pic = { pic: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session
      
      await this.$http.put(uri, pic).then(response => {
        this.snackbarMsg = response
        this.snackbar('Berhasil dibatalkan!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = "Terjadi kesalahan... Silahkan coba lagi"
        this.snackbar(this.snackbarMsg, 'is-danger')
      })
    },
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Batalkan Pengadaan',
        message: 'Apa anda yakin ingin <b>membatalkan</b> pengadaan?',
        confirmText: 'Ya',
        cancelText: 'Tidak',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    },

    // -----------------------------------------------------------
    // KONFIRMASI PENGADAAN
    // -----------------------------------------------------------
    async konfirmasiKedatangan(id) {
      let dataEdit = {}
      // dataEdit.status_layanan = "Selesai"
      dataEdit.id_cs = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "pengadaan/konfirmasi/" + id;
      
      await this.$http.put(uri, dataEdit, this.config).then(response => {
        this.snackbarMsg = response.message
        this.getData()
        this.snackbar("Pengadaan terkonfirmasi!", 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
      });
    },

    // -----------------------------------------------------------
    // LAPORAN
    // -----------------------------------------------------------
    openLaporan(action, idLaporan) {
      let link = `http://tugasbesarkami.com/api/pengadaan/surat/${action}/${idLaporan}`
      
      window.open(link)
    },

    // -----------------------------------------------------------
    // LAIN - LAIN
    // -----------------------------------------------------------
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
  computed: {
    filteredDataSupplier() {
      return this.supplier.filter((sup) => {
        return sup.nama_supplier
          .toLowerCase()
          .indexOf(this.cariSupplier.toLowerCase()) >= 0
      })
    },
  },
  async mounted() {
    await this.getSupplier()
    await this.getData()
  },
}
</script>