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
              <b-input v-model="form.nama_customer.value"></b-input>
        </b-field>

        <b-field 
            label="Alamat" 
            :type="form.alamat.type"
            :message="form.alamat.message"
            horizontal>
              <b-input v-model="form.alamat.value"></b-input>
        </b-field>

       <b-field 
            label="Tangal Lahir" 
            :type="form.tangal_lahir.type"
            :message="form.tangal_lahir.message"
            horizontal>
              <b-input v-model="form.no_telp.value"></b-input>
        </b-field>
        
         <b-field 
            label="Nomor Telepon" 
            :type="form.no_telp.type"
            :message="form.no_telp.message"
            horizontal>
              <b-input v-model="form.no_telp.value"></b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/owner/customer" 
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
      dataCustomer: new FormData(), // Buat nampung isi form
      editDataCustomer: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        nama_customer: { value: '', type: '', message: '' },
        alamat: { value: '', type: '', message: '' },
        tangal_lahir : { value: '', type: '', message: '' },
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
      this.form.no_telp.value = dataCustomer.no_telp
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu

      this.dataCustomer.append("nama_customer", this.form.nama_customer.value)
      this.dataCustomer.append("alamat", this.form.alamat.value)
      this.dataCustomer.append("tangal_lahir", this.form.tangal_lahir.value)
      this.dataCustomer.append("no_telp", this.form.no_telp.value)
      this.dataCustomer.append("pic", this.$session.get('pegawai').id_pegawai)
      
      var uri = this.$api_baseUrl + "customer";

      this.$http.post(uri, this.dataCustomer).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'Customer' } )
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

      this.editDataCustomer.nama_customer = this.form.nama_customer.value
      this.editDataCustomer.alamat = this.form.alamat.value
      this.editDataCustomer.tangal_lahir = this.form.tangal_lahir.value
      this.editDataCustomer.no_telp = this.form.no_telp.value
      this.editDataCustomer.pic = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "customer/" + editId;

      this.$http.put(uri, this.editDataCustomer, this.config).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: 'Customer' } )
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