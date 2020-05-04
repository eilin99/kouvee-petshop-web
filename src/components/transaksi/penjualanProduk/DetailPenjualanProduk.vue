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
            :to="'/cs/daftar-penjualan-produk/'"
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
            {{ "Rp" + props.row.harga_jual }}
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
        :active.sync="modalFormProduk"
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
                      @select="option => { form.nama_produk.value = option.nama_produk; form.harga_jual = option.harga_jual; form.maxJumlah = option.stok; form.id_produk = option.id_produk }"
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
                      :max="form.maxJumlah"
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
                  <button class="button" type="button" @click="modalFormProduk = false">Batal</button>
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
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      isLoading: true,
      dataProduk: [],
      modalFormProduk: false,
      snackbarMsg: '',
      tempProduk: {},
      noTransaksi: Number,
      idDetailForEdit: Number,

      // DATA DI MODAL FORM
      modalTitle: '',
      cari: '',
      form: {
        id_produk: 0,
        nama_produk: { value: '', message: '', type: '' },
        jumlah: { value: 0, message: '', type: '' },
        harga_jual: 0,
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
      var uri = this.$api_baseUrl + "transaksi/detail_produk/getByTransaction/" + this.noTransaksi

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
    getProduk() {
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.dataProduk = response.data.value
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
    },
    async addData(noTransaksi) {
      let dataProduk = new FormData()

      dataProduk.append("nomor_transaksi", noTransaksi)
      dataProduk.append("id_produk", this.form.id_produk)
      dataProduk.append("jumlah", this.form.jumlah.value)
      dataProduk.append("subtotal", this.subtotal)

      var uri = this.$api_baseUrl + "transaksi/detail_produk";

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
      await this.getData()
      await this.editTotalPenjualan()
    },
    async editData(idDetailForEdit) {
      let dataProduk = {}
      dataProduk.id_produk = this.form.id_produk
      dataProduk.jumlah = this.form.jumlah.value
      dataProduk.subtotal = this.subtotal

      var uri = this.$api_baseUrl + "transaksi/detail_produk/" + idDetailForEdit;
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
    async editTotalPenjualan() {
      let data = {}
      let total = 0
      
      this.datas.forEach(element => {
        total += parseInt(element.subtotal)
        console.log(element.subtotal) 
      });

      data.total = total

      var uri = this.$api_baseUrl + "transaksi/produk/updateTotal/" + this.noTransaksi;
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
      var uri = this.$api_baseUrl + "transaksi/detail_produk/" + id;

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
        this.form.maxJumlah = 0
      } else {
        this.modalTitle = "Ubah"

        this.idDetailForEdit = produk.id_detail
        this.form.id_produk = produk.id_produk
        this.cari = produk.nama_produk
        this.form.nama_produk.value = produk.nama_produk
        this.form.jumlah.value =  parseInt(produk.jumlah)
        this.form.harga_jual = parseInt(produk.harga_jual)
        this.form.maxJumlah = 10
      }

      this.modalFormProduk = true
    },
    cekData() {
      let count = 0

      if (this.form.nama_produk.value == '' || this.cari == '') {
        count++
        this.form.nama_produk.message = 'Produk belum terpilih'
        this.form.nama_produk.type = 'is-danger'
      }
      if (this.form.maxJumlah == 0) {
        count++
        this.form.jumlah.message = 'Stok kosong'
        this.form.jumlah.type = 'is-danger'
      } else if (this.form.jumlah.value == 0) {
        count++
        this.form.jumlah.message = 'Jumlah tidak boleh 0'
        this.form.jumlah.type = 'is-danger'
      } else if (this.form.jumlah.value > this.form.maxJumlah) {
        count++
        this.form.jumlah.message = 'Jumlah melebihi stok yang tersedia'
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
        this.modalFormProduk = false
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
    filteredDataProduk() {
      return this.dataProduk.filter((produk) => {
        return produk.nama_produk
          .toLowerCase()
          .indexOf(this.cari.toLowerCase()) >= 0
      })
    },
    subtotal() {
      return this.form.harga_jual * this.form.jumlah.value
    }
  },
  mounted() {
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.noTransaksi = this.$route.params.id // berarti ID-nya akan dimasukin ke noTransaksi
      this.getData(this.noTransaksi)           // Ngambil data lama sesuai ID
    }
    this.getProduk()
    this.isLoading = false // Page udah ter-load dan berhenti loading
  }
}
</script>