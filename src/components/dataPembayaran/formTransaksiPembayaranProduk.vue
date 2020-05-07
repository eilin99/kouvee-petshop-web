<template>
  <section id="form-transaksi-pembayaran-produk">
    <h4 class="title is-4">Pembayaran Produk</h4>
    <hr>
    <div style="width: 70%">

      <div class="columns is-gapless is-mobile">
        <div class="column is-3"><p class="title is-6">No. Transaksi</p></div>
        <div class="column">{{ form.nomor_transaksi }}</div>
      </div>
      <div class="columns is-gapless is-mobile">
        <div class="column is-3"><p class="title is-6">Nama Pelanggan</p></div>
        <div v-if="form.nama_customer == null" class="column">-</div>
        <div v-else class="column">{{ form.nama_customer }}</div>
      </div>
      <div class="columns is-gapless is-mobile">
        <div class="column is-3"><p class="title is-6">Hewan</p></div>
        <div v-if="form.nama_hewan == null" class="column">-</div>
        <div v-else class="column">{{ form.nama_hewan }}</div>
      </div>

      <b-table
        :data="detailTransaksi"
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

      <div class="level" style="margin-top: 50px">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <h4 class="title is-4">Total : Rp{{ form.total }}</h4>
          </div>
        </div>
      </div>

      <div class="field-pembayaran">
        <b-field 
            label="Jumlah Bayar" 
            :type="form.bayar.type"
            :message="form.bayar.message"
            horizontal>
              <b-input 
                  v-model="form.bayar.value" 
                  @input="clearError(form.bayar)"
                  required></b-input>
        </b-field>

        <b-field 
            label="Diskon" 
            :type="form.diskon.type"
            :message="form.diskon.message"
            horizontal>
              <b-input 
                  v-model="form.diskon.value"
                  @input="clearError(form.diskon)"
                  :disabled="isGuest"
                  required>
              </b-input>
        </b-field>
      </div>

      <div class="has-text-right">
        <b-button size="is-medium" 
            class="btn-form" 
            type="is-dark" 
            tag="router-link" 
            to="/kasir/transaksi-pembayaran-produk" 
            rounded>
              Kembali
        </b-button>
        <b-button size="is-medium" 
            class="btn-form" 
            type="is-success" 
            @click="bayar(idTransaksi)"
            rounded>
              Bayar
        </b-button>
      </div>

    </div>
    
    <!-- Buat loading page waktu awal load sama submit data -->
    <b-loading 
        :is-full-page="true" 
        :active.sync="isLoading" 
        :can-cancel="false">
    </b-loading>

  </section>
</template>

<style>
.field-pembayaran {
  margin: 50px 0;
}
.btn-form {
  margin-top: 10px;
  margin-left: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      isLoading: true,
      idTransaksi: 0, // Dibikin default 0 buat bedain dia edit data atau add data. Lebih jelasnya baca method confirm()
      dataTransaksi: {},
      detailTransaksi: [],
      isGuest: false,
      form: {
        id: 0,
        nomor_transaksi: '',
        nama_hewan: '',
        nama_customer: '',
        tgl_penjualan: '',
        total: '',
        bayar: { value: '', type: '', message: '' },
        diskon: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
      tempProduk: {},
    }
  },
  methods: {
    // ----------------------------------------------------------------
    // GET
    // ----------------------------------------------------------------
    async getData(idTransaksi) {
      var uri = this.$api_baseUrl + "transaksi/pembayaran_produk/" + idTransaksi

      await this.$http.get(uri).then(response => {
        this.dataTransaksi = response.data.value
      }).catch(e => {
        this.errors = e
      })
    },
    async getDetailTransaksi() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/detail_produk/getByTransaction/" + this.dataTransaksi.nomor_transaksi

       await this.$http.get(uri).then(response => {
        this.detailTransaksi = response.data.value
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

    // ----------------------------------------------------------------
    // EDIT
    // ----------------------------------------------------------------
    async bayar(idTransaksi) {
      this.isLoading = true // Biar dia loading dulu
      if (this.cekData() === 0) {
        let kembalian = this.cekKembalian()

        if (kembalian !== false) {
          await this.editData(idTransaksi)
          
          this.detailTransaksi.forEach(async (detail) =>  {
            await this.kurangiStok(detail.id_produk, detail.jumlah)
          });

          this.$buefy.dialog.confirm({
            title: 'Pembayaran Berhasil!',
            message: 'Pembayaran berhasil dilakukan! Kembalian Rp ' + kembalian,
            confirmText: 'OK',
            type: 'is-success',
            hasIcon: true,
            onConfirm: () => this.$router.push( { name: 'TransaksiPembayaranProduk' } )
          })
        }
      }
      this.isLoading = false
    },
    async editData(idTransaksi) {
      let pembayaran = {}
      pembayaran.id_kasir = this.$session.get('pegawai').id_pegawai
      pembayaran.diskon = this.isGuest === true ? 0 : this.form.diskon.value

      var uri = this.$api_baseUrl + "transaksi/pembayaran_produk/" + idTransaksi;

      await this.$http.put(uri, pembayaran, this.config).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.snackbarMsg = response.message
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Pembayaran gagal. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      });
    },
    async kurangiStok(id_produk, jumlahBeli) {
      var uri = this.$api_baseUrl + "produk/" + id_produk

      await this.$http.get(uri).then(response => {
        this.tempProduk = response.data.value
        this.updateStok(id_produk, this.tempProduk.stok, jumlahBeli)
      })
      .catch(error => {
        this.errors = error
      })
    },
    async updateStok(id_produk, stok, jumlahBeli) {
      let data = {}
      console.log("id : "+id_produk)
      console.log("stok : "+stok)
      console.log("jumlah beli : "+ jumlahBeli)

      data.stok = stok - jumlahBeli

      var uri = this.$api_baseUrl + "produk/restok/" + id_produk;
      try {
        await this.$http.post(uri, data)
      } catch (e) {
        this.errors = e
      }
    },

    // ----------------------------------------------------------------
    // LAIN - LAIN
    // ----------------------------------------------------------------
    formHandler(dataTransaksi) {
      this.form.id = dataTransaksi.id
      this.form.nomor_transaksi = dataTransaksi.nomor_transaksi
      this.form.nama_hewan = dataTransaksi.nama_hewan
      this.form.nama_customer = dataTransaksi.nama_customer
      this.form.tgl_penjualan = dataTransaksi.tgl_penjualan
      this.form.total = dataTransaksi.total
      this.isGuest = dataTransaksi.nama_hewan === null ? true : false
    },
    clearError(form) {
      form.type = ''
      form.message = '' 
    },
    cekData() {
      let count = 0
      let regex = new RegExp(/^\d+$/)

      if (this.form.bayar.value === '' || this.form.bayar.value == 0) {
        this.form.bayar.type = 'is-danger'
        this.form.bayar.message = "Nominal pembayaran harus diisi!"
        count++
      }else if (!regex.test(this.form.bayar.value)) {
        this.form.bayar.type = 'is-danger'
        this.form.bayar.message = "Nominal pembayaran harus angka!"
        count++
      }

      if (!this.isGuest) {
        if (this.form.diskon.value === '' || this.form.diskon.value == 0) {
          this.form.diskon.type = 'is-danger'
          this.form.diskon.message = "Diskon harus diisi!"
          count++
        } else if (!regex.test(this.form.diskon.value)) {
          this.form.diskon.type = 'is-danger'
          this.form.diskon.message = "Diskon harus angka!"
          count++
        } else if (Number(this.form.diskon.value) > Number(this.form.total)) {
          this.form.diskon.type = 'is-danger'
          this.form.diskon.message = "Diskon tidak boleh lebih besar dari total!"
          count++
        }
      }

      return count
    },
    cekKembalian() {
      let diskon = this.isGuest === false ? Number(this.form.diskon.value) : 0
      let jumlahBayar = Number(this.form.total) - diskon
      let uang = Number(this.form.bayar.value)

      if (uang < jumlahBayar) {
        this.form.bayar.type = 'is-danger'
        this.form.bayar.message = "Jumlah uang kurang"

        return false
      } else {
        let kembalian = uang - jumlahBayar
        return kembalian
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
  async mounted() {
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.idTransaksi = this.$route.params.id // berarti ID-nya akan dimasukin ke idTransaksi
      await this.getData(this.idTransaksi)           // Ngambil data lama sesuai ID
      await this.getDetailTransaksi()
      this.formHandler(this.dataTransaksi)
    }
    this.isLoading = false // Page udah ter-load dan berhenti loading
  }
}
</script>