<template>
  <section id="form-ukuran-hewan">
    <h4 class="title is-5">{{ actionTitle }} Data Ukuran Hewan</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Ukuran Hewan" 
            :type="form.ukuran.type"
            :message="form.ukuran.message"
            horizontal>
              <b-input v-model="form.ukuran.value"></b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/owner/ukuran-hewan" 
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
      dataUkuranHewan: new FormData(), // Buat nampung isi form
      editDataUkuranHewan: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        ukuran: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "ukuranhewan/" + editId

      this.$http.get(uri).then(response => {
        this.editDataUkuranHewan = response.data.value
        this.formEditHandler(this.editDataUkuranHewan)
      })
    },
    formEditHandler(dataUkuranHewan) {
      this.form.ukuran.value = dataUkuranHewan.ukuran
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

      this.dataUkuranHewan.append("ukuran", this.form.ukuran.value)
      this.dataUkuranHewan.append("pic", this.$session.get('pegawai').id_pegawai)
      
      var uri = this.$api_baseUrl + "ukuranhewan";

      this.$http.post(uri, this.dataUkuranHewan).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'UkuranHewan' } )
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

      this.editDataUkuranHewan.ukuran = this.form.ukuran.value
      this.editDataUkuranHewan.pic = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "ukuranhewan/" + editId;

      this.$http.put(uri, this.editDataUkuranHewan, this.config).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'UkuranHewan' } )
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