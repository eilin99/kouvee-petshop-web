<template>
  <section id="form-customer">
    <h4 class="title is-5">{{ actionTitle }} Data Customer</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Lengkap" 
            :type="form.nama_customer.type"
            :message="form.nama_customer.message"
            horizontal>
              <b-input @input="clearError(form.nama_customer)" v-model="form.nama_customer.value"></b-input>
        </b-field>

        <b-field 
            label="Alamat" 
            :type="form.alamat.type"
            :message="form.alamat.message"
            horizontal>
              <b-input @input="clearError(form.alamat)" v-model="form.alamat.value"></b-input>
        </b-field>

       <b-field 
            label="Tanggal Lahir" 
            :type="form.tgl_lahir.type"
            :message="form.tgl_lahir.message"
            horizontal>
          <b-datepicker
              ref="datepicker"
              expanded
              placeholder="Pilih Tanggal Lahir"
              v-model="form.tgl_lahir.value"
              @input="clearError(form.tgl_lahir)">
          </b-datepicker>
          <b-button
              @click="$refs.datepicker.toggle()"
              type="is-primary">
              <b-icon icon="calendar" size="is-small"></b-icon>
          </b-button>
        </b-field>
        
         <b-field 
            label="Nomor Telepon" 
            :type="form.no_telp.type"
            :message="form.no_telp.message"
            horizontal>
              <b-input @input="clearError(form.no_telp)" v-model="form.no_telp.value"></b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/cs/pelanggan" 
              rounded>
                Kembali
          </b-button>
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-success" 
              @click="confirm()"
              rounded>
                Simpan
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
      dataCustomer: new FormData(), // Buat nampung isi form
      editDataCustomer: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        nama_customer: { value: '', type: '', message: '' },
        alamat: { value: '', type: '', message: '' },
        tgl_lahir : { value: '', type: '', message: '' },
        no_telp: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "customer/" + editId

      this.$http.get(uri).then(response => {
        this.editDataCustomer = response.data.value
        this.formEditHandler(this.editDataCustomer)
      })
    },
    formEditHandler(dataCustomer) {
      this.form.nama_customer.value = dataCustomer.nama_customer
      this.form.alamat.value = dataCustomer.alamat
      this.form.tgl_lahir.value = new Date(dataCustomer.tgl_lahir)
      this.form.no_telp.value = dataCustomer.no_telp
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
    clearError(form) {
      console.log(form)
      form.type = ''
      form.message = '' 
    },
    cekData() {
      let count = 0
      let regex = new RegExp(/^\d+$/)

      if(this.form.nama_customer.value === "") {
        this.form.nama_customer.type = 'is-danger'
        this.form.nama_customer.message = "Nama tidak boleh kosong!"
        count++
      }
      if(this.form.alamat.value === "") {
        this.form.alamat.type = 'is-danger'
        this.form.alamat.message = "Alamat tidak boleh kosong!"
        count++
      } 
      if(this.form.tgl_lahir.value === "") {
        this.form.tgl_lahir.type = 'is-danger'
        this.form.tgl_lahir.message = "Tanggal lahir tidak boleh kosong!"
        count++
      }
      if(this.form.no_telp.value === "" || !regex.test(this.form.no_telp.value)) {
        this.form.no_telp.type = 'is-danger'
        this.form.no_telp.message = "Nomor telepon tidak valid!"
        count++
      }

      if(count > 0)
        return false
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu
      
      if(this.cekData() === false){
        this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.dataCustomer.append("nama_customer", this.form.nama_customer.value)
        this.dataCustomer.append("alamat", this.form.alamat.value)
        this.dataCustomer.append("tgl_lahir", this.convertTgl(this.form.tgl_lahir.value))
        this.dataCustomer.append("no_telp", this.form.no_telp.value)
        this.dataCustomer.append("pic", this.$session.get('pegawai').id_pegawai)
        
        var uri = this.$api_baseUrl + "customer";

        this.$http.post(uri, this.dataCustomer).then(response => {
          this.$router.push( { name: 'Pelanggan' } )
          this.snackbarMsg = response.message
          this.snackbar("Data berhasil ditambahkan!", 'is-success')
        })
        .catch(error => {
          this.errors = error;
          if (this.errors.message == "Request failed with status code 400") {
            this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
          } else {
            this.snackbar("Terjadi kesalahan. Silahkan coba lagi", 'is-danger')
          }
        });
      }
      this.isLoading = false // Biar berhenti loading
    },
    editData(editId) {
      this.isLoading = true // Biar dia loading dulu

      if(this.cekData() == false) {
        this.snackbar("Edit gagal. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.editDataCustomer.nama_customer = this.form.nama_customer.value
        this.editDataCustomer.alamat = this.form.alamat.value
        this.editDataCustomer.tgl_lahir = this.convertTgl(this.form.tgl_lahir.value)
        this.editDataCustomer.no_telp = this.form.no_telp.value
        this.editDataCustomer.pic = this.$session.get('pegawai').id_pegawai

        var uri = this.$api_baseUrl + "customer/" + editId;

        this.$http.put(uri, this.editDataCustomer, this.config).then(response => {
          this.$router.push( { name: 'Pelanggan' } )
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
      }

      this.isLoading = false // Biar berhenti loading
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