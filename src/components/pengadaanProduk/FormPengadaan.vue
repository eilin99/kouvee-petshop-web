<template>
  <section id="detail-penjualan-produk">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4">Detail Penjualan Produk</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light" 
            tag="router-link"
            :to="'/owner/pengadaan-produk/'"
            rounded>
              <p class="has-text-primary">Kembali</p>
        </b-button>
      </div>
    </div>
    <hr>
    
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">No. Pengadaan</p></div>
      <div class="column">{{ pengadaan.nomor_pengadaan }}</div>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">Nama Supplier</p></div>
      <div class="column">{{ pengadaan.nama_supplier }}</div>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">Alamat</p></div>
      <div class="column">{{ pengadaan.alamat }}</div>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">No. Telepon</p></div>
      <div class="column">{{ pengadaan.no_telp }}</div>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">Total</p></div>
      <div class="column">
        Rp {{ pengadaan.total }}
      </div>
    </div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-2"><p class="title is-6">Sudah datang</p></div>
      <div class="column">
        <b-icon
          size="is-medium"
          :icon="pengadaan.status_kedatangan == 'Sudah Datang' ? 'check' : 'close'"
          :type="pengadaan.status_kedatangan == 'Sudah Datang' ? 'is-success' : 'is-danger'">
        </b-icon>
      </div>
    </div>
    
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
              field="nama_produk" 
              label="Nama produk"
              :searchable="true">
            {{ props.row.nama_produk }}
          </b-table-column>

          <b-table-column 
              field="harga_jual" 
              label="Harga"
              width="150px"
              :searchable="true">
            {{ "Rp" + props.row.harga_beli }}
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
                  rounded
                  :disabled="pengadaan.status_kedatangan == 'Sudah Datang' ? true : false">
                    <b-icon icon="pencil" type="is-info"></b-icon>
              </b-button>
              <b-button 
                  type="is-text"  
                  @click="confirmDelete(props.row.id_detail)" 
                  rounded
                  :disabled="pengadaan.status_kedatangan == 'Sudah Datang' ? true : false">
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
                :disabled="pengadaan.status_kedatangan == 'Sudah Datang' ? true : false"
                expanded>
              Tambah
            </b-button>
          </div>
        </template>

      </b-table>
    </div>

    <b-modal
        :active.sync="modalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
          <div class="modal-card" style="height:500px">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ modalTitle }} Item Pembelian</p>
            </header>
            <section class="modal-card-body">

              <b-field
                  label="Nama produk"
                  :message="form.nama_produk.message"
                  :type="form.nama_produk.type">
                  <b-autocomplete
                      v-model="cari"
                      icon="magnify"
                      placeholder="Nama produk"
                      :open-on-focus="true"
                      :data="filteredDataProduk"
                      @select="option => { form.nama_produk.value = option.nama_produk; form.harga_beli = option.harga_beli; form.id_produk = option.id_produk }"
                      @input="clearError(form.nama_produk)"
                      field="nama_produk"
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
                <h4 class="title is-3">Rp{{ subtotal }}</h4>
              </div>

            </section>
            <footer class="modal-card-foot">
              <div class="footer-modal">
                <div class="btn-right">
                  <button class="button" type="button" @click="modalActive = false">Batal</button>
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
  left: 450px;
}
.subtotal {
  margin-top: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      // DATA SUPPLIER
      pengadaan: {
        id: '',
        nomor_pengadaan:	'',
        nama_supplier: '',
        jenis: '',
        nama_customer: '',
        tgl_penjualan: '',
        total: '',
        status_pembayaran: '',
        customer_service: '',
      },
      
      // DATA BUAT DETAIL PENGADAAN
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      isLoading: true,
      dataProduk: [],
      snackbarMsg: '',
      tempProduk: {},
      idDetailForEdit: Number,

      // DATA DI MODAL FORM
      modalActive: false,
      modalTitle: '',
      cari: '',
      form: {
        id_produk: 0,
        nama_produk: { value: '', message: '', type: '' },
        jumlah: { value: 0, message: '', type: '' },
        harga_beli: 0,
      },
    }
  },
  methods: {
    // -----------------------------------------------------------------
    // GET
    // -----------------------------------------------------------------
    async getDetail(noPengadaan) {
      this.isLoading = true
      var uri = this.$api_baseUrl + `detail_pengadaan/getByTransaction/${noPengadaan}`

       await this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
        this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
        this.isLoading = false
      })
      .catch(error => {
        this.errors = error
        this.tableLoadingIcon = "truck"  // Tampilan kalo
        this.tableMessage = 'Klik tambah untuk memesan produk'    // ga ada data
        this.isLoading = false
      })
    },
    getProduk() {
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.dataProduk = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
    async getPengadaan(id) {
      var uri = this.$api_baseUrl + `pengadaan/${id}`

      await this.$http.get(uri).then(response => {
        this.pengadaan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // -----------------------------------------------------------------
    // ADD
    // -----------------------------------------------------------------
    async addNewDetail(noPengadaan) {
      await this.addData(noPengadaan)
      this.modalActive = false
      await this.getDetail(this.pengadaan.nomor_pengadaan)
      await this.editTotalPengadaan()
    },
    async addData(noPengadaan) {
      let dataProduk = new FormData()

      dataProduk.append("nomor_pengadaan", noPengadaan)
      dataProduk.append("id_produk", this.form.id_produk)
      dataProduk.append("jumlah", this.form.jumlah.value)
      dataProduk.append("subtotal", this.subtotal)

      var uri = this.$api_baseUrl + "detail_pengadaan";

      try {
        await this.$http.post(uri, dataProduk)
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
      this.modalActive = false
      await this.getDetail(this.pengadaan.nomor_pengadaan)
      await this.editTotalPengadaan()
      this.refreshPengadaan()
    },
    async editData(idDetailForEdit) {
      let dataProduk = {}
      dataProduk.id_produk = this.form.id_produk
      dataProduk.jumlah = this.form.jumlah.value
      dataProduk.subtotal = this.subtotal

      var uri = this.$api_baseUrl + "detail_pengadaan/" + idDetailForEdit;
      try {
        await this.$http.put(uri, dataProduk, this.config)
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
    async editTotalPengadaan() {
      let data = {}
      let total = 0
      
      this.datas.forEach(element => {
        total += parseInt(element.subtotal)
        console.log(element.subtotal) 
      });

      data.total = total

      var uri = this.$api_baseUrl + "pengadaan/updateTotal/" + this.pengadaan.nomor_pengadaan;
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
        await this.getDetail(this.pengadaan.nomor_pengadaan)
        await this.editTotalPengadaan()
        this.refreshPengadaan()
        this.snackbar("Data terhapus", 'is-success')
      } catch(error) {
        this.errors = error
        this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
      }
    },
    async deleteDetail(id) {
      var uri = this.$api_baseUrl + "detail_pengadaan/" + id;

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
    openModalForm(produk) {
      if (produk === '') {
        this.modalTitle = "Tambah"

        this.form.id_produk = ''
        this.cari = ''
        this.form.nama_produk.value = ''
        this.form.jumlah.value =  ''
        this.form.harga_jual = ''
        this.form.jumlah.value = 0
      } else {
        this.modalTitle = "Ubah"

        this.idDetailForEdit = produk.id_detail
        this.form.id_produk = produk.id_produk
        this.cari = produk.nama_produk
        this.form.nama_produk.value = produk.nama_produk
        this.form.jumlah.value =  parseInt(produk.jumlah)
        this.form.harga_jual = parseInt(produk.harga_jual)
      }

      this.modalActive = true
    },
    cekData() {
      let count = 0

      if (this.form.nama_produk.value == '' || this.cari == '') {
        count++
        this.form.nama_produk.message = 'Produk belum terpilih'
        this.form.nama_produk.type = 'is-danger'
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
        tujuan == "Tambah" ? await this.addNewDetail(this.pengadaan.nomor_pengadaan) : await this.editDetail(this.idDetailForEdit)
        await this.refreshPengadaan()
        this.modalActive = false
      }
    },
    async refreshPengadaan() {
      await this.getPengadaan(this.$route.params.id)
      await this.getDetail(this.pengadaan.nomor_pengadaan) // Ngambil data detail pengadaan sesuai ID
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
    filteredDataProduk() {
      return this.dataProduk.filter((produk) => {
        return produk.nama_produk
          .toLowerCase()
          .indexOf(this.cari.toLowerCase()) >= 0
      })
    },
    subtotal() {
      return this.form.harga_beli * this.form.jumlah.value
    }
  },
  async mounted() {
    this.isLoading = true
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      await this.refreshPengadaan()
    }
    this.getProduk()
    this.isLoading = false // Page udah ter-load dan berhenti loading
  }
}
</script>