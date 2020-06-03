<template>
  <section id="form-pengadaan-produk">
    <h4 class="title is-4">Data Pengadaan Produk</h4>
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
          <p v-if="props.row.nama_supplier == null">-</p>
          <p v-else>{{ props.row.nama_supplier }}</p>
        </b-table-column>

        <b-table-column 
            field="tgl_pengadaan" 
            label="Tanggal Pengadaan"
            width="110px"
            searchable
            sortable>
          {{ props.row.tgl_pengadaan }}
        </b-table-column>

        <b-table-column 
            field="total" 
            label="Total">
          {{ 'Rp.' + props.row.total }}
        </b-table-column>

        <b-table-column 
            field="status_cetak_surat" 
            label="Sudah Cetak"
            width="50px">
            <p v-if="props.row.status_cetak_surat == 'Sudah Cetak'">
              <b-icon size="is-medium" icon="check" type="is-success"></b-icon>
            </p>
        </b-table-column>

        <b-table-column 
            field="status_kedatangan" 
            label="Sudah Datang"
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
                :to="'/owner/detail-pengadaan-produk/' + props.row.id"
                rounded>
                  <b-icon icon="note" type="is-primary"></b-icon>
            </b-button>
            <b-button 
                type="is-text"
                @click="openModalEdit(props.row)" 
                rounded
                :disabled="props.row.status_kedatangan == 'Sudah Datang' ? true : false " >
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id)" 
                rounded
                :disabled="props.row.status_kedatangan == 'Sudah Datang'? true : false">
                  <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="level">
                <div class="level left">
                  <strong>Owner : </strong>
                  <small>{{ props.row.pic }}</small>
                </div>
                <div class="level-right" v-show="props.row.status_kedatangan == 'Belum Datang'">
                  <b-button
                      type="is-info" 
                      icon-left="check"
                      size="is-default"
                      rounded
                      @click="updateStatusKedatangan(props.row.id)">
                        Verifikasi Kedatangan
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
            tag="router-link" 
            to="/owner/pengadaan-produk" 
            expanded>
          Tambah
        </b-button>
      </div>
    </template>

    </b-table>
    <b-modal
        :active.sync="modalEdit"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
          <div class="modal-card" style="height:500px">
            <header class="modal-card-head">
                <p class="modal-card-title">Supplier</p>
            </header>
            <section class="modal-card-body">

              <b-field
                  label="Supplier"
                  :message="formSupplier.nama_supplier.message"
                  :type="formSupplier.nama_supplier.type">
                  <b-autocomplete
                      v-model="cariSupplier"
                      icon="magnify"
                      placeholder="Nama supplier"
                      :value="formSupplier.nama_supplier.value"
                      :open-on-focus="true"
                      :data="filteredDataSupplier"
                      @select="option => {formSupplier.nama_supplier.value = option.nama_supplier; formMember.id_supplier = option.id_supplier}"
                      @input="clearError(formSupplier.nama_supplier)"
                      field="nama_supplier"
                      clearable>
                  </b-autocomplete>
              </b-field>

            </section>
            <footer class="modal-card-foot">
              <div class="footer-modal">
                <div class="btn-right">
                  <button class="button" type="button" @click="modalEdit = false">Batal</button>
                  <button class="button is-primary" @click="editData">Simpan</button>
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
  left: 450px;
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

      // Modal Edit Pengadaan
      cariSupplier: '',
      dataSupplier: [],
      formSupplier: { // temp member buat kalo diedit
        id_supplier: 0,
        nama_supplier: { value: '', message: '', type: '' },
      },
      modalEdit: false,
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
    async getDataSupplier() {
      var uri = this.$api_baseUrl + "supplier"

      await this.$http.get(uri).then(response => {
        this.dataSupplier = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // -----------------------------------------------------------
    // DELETE
    // -----------------------------------------------------------
    async deleteData(deleteId) {
      await this.deletePengadaan(deleteId)
      await this.getData();
    },

    async deletePengadaan(deleteId){
      var uri = this.$api_baseUrl + "pengadaan/delete/" + deleteId;
      var id_pic = {id_pic: this.$session.get('pegawai').id_pegawai}

      await this.$http.delete(uri, id_pic).then(response => {
        this.snackbarMsg = response
        this.snackbar('Data terhapus!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = "Terjadi kesalahan... Silahkan coba lagi"
        this.snackbar(this.snackbarMsg, 'is-danger')
      })
    },
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Hapus Data Pengadaan',
        message: 'Apa anda yakin ingin <b>membatalkan</b> pemesanan?',
        confirmText: 'Ya',
        cancelText: 'Tidak',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    },
    // -----------------------------------------------------------
    // EDIT dan MODAL EDIT
    // -----------------------------------------------------------
    async updateStatusKedatangan(id) {
      let dataEdit = {}
      dataEdit.status_kedatangan = "Sudah Datang"
      dataEdit.id_pic = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "pengadaan/konfirmasi/" + id;
      
      await this.$http.put(uri, dataEdit, this.config).then(response => {
        this.snackbarMsg = response.message
        this.getData()
        this.snackbar("Pesanan sudah datang!", 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
      });
    },
    async editData() {
        if (this.cekSupplier() === 0) {
          await this.editPengadaan()
          this.modalEdit = false
          await this.getData()
        }
    },
    async editPengadaan() {
      let dataEdit = {}
      dataEdit.id_supplier = this.formSupplier.id_supplier
      dataEdit.id_cs = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "pengadaan/" + this.formSupplier.id;
      
      await this.$http.put(uri, dataEdit, this.config).then(response => {
        this.snackbarMsg = response.message
        this.snackbar("Data berhasil diedit!", 'is-success')
      })
      .catch(error => {
        this.errors = error;
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Edit gagal. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      });
    },
    openModalEdit(pengadaan) {
      this.formSupplier.id_pengadaan = pengadaan.id
      this.formSupplier.id_supplier = pengadaan.id_supplier
      this.formSupplier.nama_supplier.value = pengadaan.nama_supplier
      this.formSupplier.id = pengadaan.id

      pengadaan.nama_supplier === null ? this.cariSupplier = '' : this.cariSupplier = pengadaan.nama_supplier

      this.modalEdit = true
    },
    cekMember() {
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
      return this.dataSupplier.filter((supplier) => {
        return supplier.nama_supplier
          .toLowerCase()
          .indexOf(this.cariSupplier.toLowerCase()) >= 0
      })
    }
  },
  async mounted() {
    await this.getData()
    await this.getDataSupplier()
  },
}
</script>