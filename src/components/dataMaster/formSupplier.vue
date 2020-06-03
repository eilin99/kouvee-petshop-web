<template>
  <section id="form-supplier">
    <h4 class="title is-5">{{ actionTitle }} Data Supplier</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Lengkap" 
            :type="form.nama_supplier.type"
            :message="form.nama_supplier.message"
            horizontal>
              <b-input @input="clearError(form.nama_supplier)" v-model="form.nama_supplier.value"></b-input>
        </b-field>

        <b-field 
            label="Alamat" 
            :type="form.alamat.type"
            :message="form.alamat.message"
            horizontal>
              <b-input @input="clearError(form.alamat)" v-model="form.alamat.value"></b-input>
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
              to="/owner/supplier" 
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
      dataSupplier: new FormData(), // Buat nampung isi form
      editDataSupplier: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        nama_supplier: { value: '', type: '', message: '' },
        alamat: { value: '', type: '', message: '' },
        no_telp: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "supplier/" + editId

      this.$http.get(uri).then(response => {
        this.editDataSupplier = response.data.value
        this.formEditHandler(this.editDataSupplier)
      })
    },
    formEditHandler(dataSupplier) {
      this.form.nama_supplier.value = dataSupplier.nama_supplier
      this.form.alamat.value = dataSupplier.alamat
      this.form.no_telp.value = dataSupplier.no_telp
    },
    clearError(form) {
      console.log(form)
      form.type = ''
      form.message = '' 
    },
    cekData() {
      let count = 0
      let regex = new RegExp(/^\d+$/)

      if(this.form.nama_supplier.value === "") {
        this.form.nama_supplier.type = 'is-danger'
        this.form.nama_supplier.message = "Nama supplier tidak boleh kosong!"
        count++
      }
      if(this.form.alamat.value === "") {
        this.form.alamat.type = 'is-danger'
        this.form.alamat.message = "Alamat tidak boleh kosong!"
        count++
      } 

      if(this.form.no_telp.value === "") {
        this.form.no_telp.type = 'is-danger'
        this.form.no_telp.message = "Nomor telepon tidak boleh kosong!"
        count++
      } else if(!regex.test(this.form.no_telp.value) || this.form.no_telp.value < 1) {
        this.form.no_telp.type = 'is-danger'
        this.form.no_telp.message = "Nomor telepon tidak valid!"
        count++
      } 

      if(count > 0)
        return false
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu

      if(this.cekData() == false) {
        this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.dataSupplier.append("nama_supplier", this.form.nama_supplier.value)
        this.dataSupplier.append("alamat", this.form.alamat.value)
        this.dataSupplier.append("no_telp", this.form.no_telp.value)
        this.dataSupplier.append("pic", this.$session.get('pegawai').id_pegawai)
        
        var uri = this.$api_baseUrl + "supplier";

        this.$http.post(uri, this.dataSupplier).then(response => {
          this.$router.push( { name: 'Supplier' } )
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
        this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.editDataSupplier.nama_supplier = this.form.nama_supplier.value
        this.editDataSupplier.alamat = this.form.alamat.value
        this.editDataSupplier.no_telp = this.form.no_telp.value
        this.editDataSupplier.pic = this.$session.get('pegawai').id_pegawai

        var uri = this.$api_baseUrl + "supplier/" + editId;

        this.$http.put(uri, this.editDataSupplier, this.config).then(response => {
          this.$router.push( { name: 'Supplier' } )
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