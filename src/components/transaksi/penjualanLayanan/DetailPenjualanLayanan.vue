<template>
  <section id="detail-penjualan-layanan">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4">Detail Penjualan Layanan</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light" 
            tag="router-link"
            :to="'/cs/daftar-penjualan-layanan/'"
            rounded>
              <p class="has-text-primary">Kembali</p>
        </b-button>
      </div>
    </div>
    <hr>
    
    <p class="subtitle is-5">
      Nomor Transaksi : {{ noTransaksi }}
    </p>
    
    <div style="width:85%">
      <b-table
        :data="datas"
        :hoverable="true"
        :loading="isLoading"
        ref="table">

        <template slot-scope="props">

          <b-table-column  
              label="No." 
              width="50px"
              centered
              sortable>
            {{ props.index + 1 }}
          </b-table-column>

          <b-table-column 
              field="nama_layanan" 
              label="Nama layanan"
              :searchable="true">
            {{ props.row.nama_layanan }}
          </b-table-column>


          <b-table-column 
              field="subtotal" 
              label="Harga">
            {{ 'Rp.' + props.row.harga_layanan }}
          </b-table-column>
          
          <b-table-column 
              field="jumlah" 
              label="Jumlah"
              width="125px"
              searchable
              sortable>
            {{ props.row.jumlah }}
          </b-table-column>

          <b-table-column 
              field="subtotal" 
              label="Subtotal">
            {{ 'Rp.' + props.row.subtotal }}
          </b-table-column>

          <b-table-column label="Action" centered>
            <span>
              <b-button 
                  type="is-text" 
                  @click="openModalForm(props.row)"
                  rounded>
                    <b-icon icon="pencil" type="is-info"></b-icon>
              </b-button>
              <b-button 
                  type="is-text"  
                  @click="confirmDelete(props.row.id_detail)" 
                  rounded>
                    <b-icon icon="delete" type="is-danger"></b-icon>
              </b-button>
            </span>
          </b-table-column>
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
          <div class="has-text-centered has-text-weight-bold">
            <b-button size="is-medium" 
                type="is-light" 
                icon-left="plus" 
                @click="openModalForm('')"
                expanded>
              Tambah
            </b-button>
          </div>
        </template>

      </b-table>
    </div>

    <b-modal
        :active.sync="modalFormLayanan"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
          <div class="modal-card" style="height:500px">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ modalTitle }} Layanan</p>
            </header>
            <section class="modal-card-body">

              <b-field
                  label="Nama layanan"
                  :message="form.nama_layanan.message"
                  :type="form.nama_layanan.type">
                  <b-autocomplete
                      v-model="cari"
                      icon="magnify"
                      placeholder="Nama layanan"
                      :open-on-focus="true"
                      :data="filteredDataLayanan"
                      @select="option => { form.nama_layanan.value = option.nama_layanan; form.harga = option.harga; form.id_layanan = option.id_layanan }"
                      @input="clearError(form.nama_layanan)"
                      field="nama_layanan"
                      clearable>
                  </b-autocomplete>
              </b-field>

              <b-field
                  label="Jumlah"
                  :message="form.jumlah.message"
                  :type="form.jumlah.type">
                  <b-numberinput
                      v-model="form.jumlah.value"
                      controls-position="compact"
                      controls-rounded
                      min="1"
                      :editable="false"
                      @input="clearError(form.jumlah)">
                  </b-numberinput>
              </b-field>

              <div class="subtotal">
                <p class="heading">Subtotal :</p>
                <h4 class="title is-3">Rp {{ subtotal }}</h4>
              </div>

            </section>
            <footer class="modal-card-foot">
              <div class="footer-modal">
                <div class="btn-right">
                  <button class="button" type="button" @click="modalFormLayanan = false">Batal</button>
                  <button class="button is-primary" @click="simpan(modalTitle)">Simpan</button>
                </div>
              </div>
            </footer>
        </div>
    </b-modal>
  </section>
</template>

<style scoped>
.footer-modal {
  height: 35px;
  position: relative;
}
.btn-right {
  width: 180px;
  position: absolute;
  left: 420px;
}
.subtotal {
  margin-top: 50px;
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
      dataLayanan: [],
      modalFormLayanan: false,
      snackbarMsg: '',
      tempLayanan: {},
      noTransaksi: Number,
      idDetailForEdit: Number,

      // DATA DI MODAL FORM
      modalTitle: '',
      cari: '',
      form: {
        id_layanan: 0,
        nama_layanan: { value: '', message: '', type: '' },
        jumlah: { value: 0, message: '', type: '' },
        harga: 0,
        maxJumlah: 0,
      },
    }
  },
  methods: {
    // -----------------------------------------------------------------
    // GET
    // -----------------------------------------------------------------
    async getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/detail_layanan/getByTransaction/" + this.noTransaksi

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
    getLayanan() {
      var uri = this.$api_baseUrl + "layanan"

      this.$http.get(uri).then(response => {
        this.dataLayanan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // -----------------------------------------------------------------
    // ADD
    // -----------------------------------------------------------------
    async addNewDetail(noTransaksi) {
      await this.addData(noTransaksi)
      await this.getData()
      await this.editTotalPenjualan()
      this.modalFormLayanan = false
    },
    async addData(noTransaksi) {
      let dataLayanan = new FormData()

      dataLayanan.append("nomor_transaksi", noTransaksi)
      dataLayanan.append("id_layanan", this.form.id_layanan)
      dataLayanan.append("jumlah", this.form.jumlah.value)
      dataLayanan.append("subtotal", this.subtotal)

      var uri = this.$api_baseUrl + "transaksi/detail_layanan";

      try {
        await this.$http.post(uri, dataLayanan)
        this.snackbar("Barang berhasil ditambahkan", 'is-success')
      } catch (e) {
        this.errors = e
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      }
    },

    // -----------------------------------------------------------------
    // EDIT
    // -----------------------------------------------------------------
    async editDetail(idDetailForEdit) {
      await this.editData(idDetailForEdit)
      this.modalTitle = false
      await this.getData()
      await this.editTotalPenjualan()
    },
    async editData(idDetailForEdit) {
      let dataLayanan = {}
      dataLayanan.id_layanan = this.form.id_layanan
      dataLayanan.jumlah = this.form.jumlah.value
      dataLayanan.subtotal = this.subtotal

      var uri = this.$api_baseUrl + "transaksi/detail_layanan/" + idDetailForEdit;
      try {
        await this.$http.put(uri, dataLayanan, this.config)
        this.snackbar("Barang berhasil diubah", 'is-success')
      } catch (e) {
        this.errors = e
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      }
    },
    async editTotalPenjualan() {
      let data = {}
      let total = 0
      
      this.datas.forEach(element => {
        total += parseInt(element.subtotal)
      });

      data.total = total

      var uri = this.$api_baseUrl + "transaksi/layanan/updateTotal/" + this.noTransaksi;
      try {
        await this.$http.put(uri, data, this.config)
      } catch (e) {
        this.errors = e
      }
    },

    // -----------------------------------------------------------------
    // DELETE
    // -----------------------------------------------------------------
    async deleteData(id) {
      try {
        await this.deleteDetail(id)
        await this.getData()
        await this.editTotalPenjualan()
        this.snackbar("Data terhapus", 'is-success')
      } catch(error) {
        this.errors = error
        this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
      }
    },
    async deleteDetail(id) {
      var uri = this.$api_baseUrl + "transaksi/detail_layanan/" + id;

      try {
        await this.$http.delete(uri)
      } catch (error) {
        this.errors = error
      }
    },
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Batal Pembelian Item',
        message: 'Apa anda yakin ingin <b>membatalkan</b> pembelian barang?',
        confirmText: 'Ya',
        cancelText: 'Tidak',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    },


    // -----------------------------------------------------------------
    // LAIN - LAIN
    // -----------------------------------------------------------------
    openModalForm(layanan) {
      if (layanan === '') {
        this.modalTitle = "Tambah"

        this.form.id_layanan = ''
        this.cari = ''
        this.form.nama_layanan.value = ''
        this.form.jumlah.value =  ''
        this.form.harga = 0
        this.form.jumlah.value = 1
      } else {
        this.modalTitle = "Ubah"

        this.idDetailForEdit = layanan.id_detail
        this.form.id_layanan = layanan.id_layanan
        this.cari = layanan.nama_layanan
        this.form.nama_layanan.value =layanan.nama_layanan
        this.form.jumlah.value =  parseInt(layanan.jumlah)
        this.form.harga = parseInt(layanan.harga_layanan)
      }

      this.modalFormLayanan = true
    },
    cekData() {
      let count = 0

      if (this.form.nama_layanan.value == '' || this.cari == '') {
        count++
        this.form.nama_layanan.message = 'Layanan belum terpilih'
        this.form.nama_layanan.type = 'is-danger'
      } else if (this.form.jumlah.value == 0) {
        count++
        this.form.jumlah.message = 'Jumlah tidak boleh 0'
        this.form.jumlah.type = 'is-danger'
      }
      return count
    },
    clearError(form) {
      form.type = ''
      form.message = '' 
    },
    async simpan(tujuan) {
      if (this.cekData() == 0) {
        tujuan == "Tambah" ? await this.addNewDetail(this.noTransaksi) : await this.editDetail(this.idDetailForEdit)
        this.modalFormLayanan = false
      }
    },
    snackbar(snackbarMessage, type) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: snackbarMessage,
        type: type,
        position: 'is-bottom-left',
        actionText: 'OK',
        queue: false,
      })
    },
  },
  computed: {
    filteredDataLayanan() {
      return this.dataLayanan.filter((layanan) => {
        return layanan.nama_layanan
          .toLowerCase()
          .indexOf(this.cari.toLowerCase()) >= 0
      })
    },
    subtotal() {
      return this.form.harga * this.form.jumlah.value
    }
  },
  mounted() {
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.noTransaksi = this.$route.params.id // berarti ID-nya akan dimasukin ke noTransaksi
      this.getData(this.noTransaksi)           // Ngambil data lama sesuai ID
    }
    this.getLayanan()
    this.isLoading = false // Page udah ter-load dan berhenti loading
  }
}
</script>