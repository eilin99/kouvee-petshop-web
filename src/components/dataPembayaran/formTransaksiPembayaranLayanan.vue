<template>
  <section id="form-transaksi-pembayaran-layanan">
    <h4 class="title is-5">{{ actionTitle }} Data Pembayaran Layanan</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Tanggal Pembayaran" 
            :type="form.tgl_pembayaran.type"
            :message="form.tgl_pembayaran.message"
            horizontal>
              <b-input v-model="form.tgl_pembayaran.value"></b-input>
        </b-field>

        <b-field 
            label="Status Pembayaran" 
            :type="form.status_pembayaran.type"
            :message="form.status_pembayaran.message"
            horizontal>
              <b-input v-model="form.status_pembayaran.value"></b-input>
        </b-field>

        <b-field 
            label="ID Kasir" 
            :type="form.id_kasir.type"
            :message="form.id_kasir.message"
            horizontal>
              <b-input v-model="form.id_kasir.value"></b-input>
        </b-field>

        <b-field 
            label="diskon" 
            :type="form.diskon.type"
            :message="form.diskon.message"
            horizontal>
              <b-input v-model="form.diskon.value"
                required
                validation-message="Only number is allowed"
                pattern="[0-9]*">
              </b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/kasir/transaksi-pembayaran-layanan" 
              rounded>
                Kembali
          </b-button>
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-success" 
              @click="confirm()"
              rounded>
                Konfirmasi
          </b-button>
        </div>

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

<script>
export default {
  data() {
    return {
      isLoading: true,
      actionTitle: '',
      editId: 0, // Dibikin default 0 buat bedain dia edit data atau add data. Lebih jelasnya baca method confirm()
      dataPembayaranLayanan: new FormData(), // Buat nampung isi form
      editDataPembayaranLayanan: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        tgl_pembayaran: { value: '', type: '', message: '' },
        status_pembayaran: { value: '', type: '', message: '' },
        id_kasir: { value: '', type: '', message: '' },
        diskon: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "transaksi/detail_layanan/" + editId
      this.$http.get(uri).then(response => {
        this.editDataPembayaranLayanan = response.data.value
        this.formEditHandler(this.editDataPembayaranLayanan)
      })
    },
    formEditHandler(dataPembayaranLayanan) {
      this.form.tgl_pembayaran.value = dataPembayaranLayanan.tgl_pembayaran
      this.form.status_pembayaran.value = dataPembayaranLayanan.status_pembayaran
      this.form.id_kasir.value = dataPembayaranLayanan.id_kasir
      this.form.diskon.value = dataPembayaranLayanan.diskon
    },
    convertTgl(tglLahir) {
      var formDate = tglLahir // Mengambil FULL date dari datepicker
      var year = formDate.getFullYear()        // Mengambil tahun
      var month = formDate.getMonth() + 1      // Mengambil bulan (ditambah 1 karena getMonth() itu returnnya array)
      var date = formDate.getDate()            // Mengambil tanggal
      // Yang tanda tanya (?) itu TERNARY. Konsepnya sama dengan if-else
      // Jika month/date kurang dari 10, nanti stringnya
      // ditambah 0 di depannya. Kalo enggak, ya biasa
      month = (month < 10) ? '0' + month : month
      date = (date < 10) ? '0' + date : date
      var fixedDate = year + '-' + month + '-' + date
      return fixedDate
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu
      this.dataPembayaranLayanan.append("tgl_pembayaran", this.form.tgl_pembayaran.value)
      this.dataPembayaranLayanan.append("status_pembayaran", this.form.status_pembayaran.value)
      this.dataPembayaranLayanan.append("id_kasir", this.form.id_kasir.value)
      this.dataPembayaranLayanan.append("diskon", this.form.diskon.value)
      
      var uri = this.$api_baseUrl + "transaksi/detail_layanan/";
      this.$http.post(uri, this.dataPembayaranLayanan).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'TransaksiPembayaranLayanan' } )
        this.snackbarMsg = response.message
        this.snackbar("Data berhasil ditambahkan!", 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      });
    },
    editData(editId) {
      this.isLoading = true // Biar dia loading dulu
      this.editDataPembayaranLayanan.tgl_pembayaran = this.form.tgl_pembayaran.value
      this.editDataPembayaranLayanan.status_pembayaran = this.form.status_pembayaran.value
      this.editDataPembayaranLayanan.id_kasir = this.form.id_kasir.value
      this.editDataPembayaranLayanan.diskon = this.form.diskon.value
      var uri = this.$api_baseUrl + "transaksi/detail_layanan/" + editId;
      this.$http.put(uri, this.editDataPembayaranLayanan, this.config).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'TransaksiPembayaranLayanan' } )
        this.snackbarMsg = response.message
        this.snackbar("Data berhasil diedit!", 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        if (this.errors.message == "Request failed with status code 400") {
          this.snackbar("Edit gagal. Sepertinya inputan salah...", 'is-danger')
        } else {
          this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
        }
      });
    },
    confirm() {
      // Kalo editId masih default (0) berarti dia bakal addData.
      // Kalo nggak 0, berarti dia editData
      this.editId == 0 ? this.addData() : this.editData(this.editId)
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
  mounted() {
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.editId = this.$route.params.id // berarti ID-nya akan dimasukin ke editId
      this.actionTitle = 'Ubah'           // Title di atas jadi 'Ubah Data
      this.getData(this.editId)           // Ngambil data lama sesuai ID
    } else {                      // Ini kalo gak ada param ID di URL
      this.actionTitle = 'Tambah' // berarti dia nambah data
    }
    this.isLoading = false // Page udah ter-load dan berhenti loading
  }
}
</script>

<style>
.btn-form {
  margin-top: 10px;
  margin-left: 10px;
}
</style>

// {
//   "message":"Validation Error",
//   "value":{
//     "no_telp":["The no telp has already been taken."],
//     "jabatan":["The jabatan may only contain letters."],
//     "username":["The username has already been taken."]
//   }
// }