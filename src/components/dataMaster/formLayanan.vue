<template>
  <section id="form-layanan">
    <h4 class="title is-5">{{ actionTitle }} Data Layanan</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Layanan" 
            :type="form.nama_layanan.type"
            :message="form.nama_layanan.message"
            horizontal>
              <b-input @input="clearError(form.nama_layanan)" v-model="form.nama_layanan.value"></b-input>
        </b-field>

        <b-field 
            label="Jenis Hewan"
            :type="form.jenis.type"
            :message="form.jenis.message"
            horizontal>
          <b-select @input="clearError(form.jenis)" v-model="form.jenis.value" placeholder="Pilih jenis hewan">
            <option v-for="(item) in jenis_hewan" 
                :key="item.id_jenis"
                :value="item.id_jenis">
                {{ item.jenis }}
            </option>
          </b-select>
        </b-field>

        <b-field 
            label="Ukuran Hewan"
            :type="form.ukuran.type"
            :message="form.ukuran.message"
            horizontal>
          <b-select @input="clearError(form.ukuran)" v-model="form.ukuran.value" placeholder="Pilih ukuran hewan">
            <option v-for="(item) in ukuran_hewan" 
                :key="item.id_ukuran"
                :value="item.id_ukuran">
                {{ item.ukuran }}
            </option>
          </b-select>
        </b-field>

        <b-field 
            label="Harga" 
            :type="form.harga.type"
            :message="form.harga.message"
            horizontal>
              <b-input v-model="form.harga.value"
                @input="clearError(form.harga)"
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
              to="/owner/layanan" 
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
      dataLayanan: new FormData(), // Buat nampung isi form
      editDataLayanan: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        nama_layanan: { value: '', type: '', message: '' },
        jenis: { value: '', type: '', message: '' },
        ukuran: { value: '', type: '', message: '' },
        harga: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
      jenis_hewan: [],
      ukuran_hewan: [],
    }
  },
  methods: {
    getJenis(){
      var uri = this.$api_baseUrl + "jenishewan"

      this.$http.get(uri).then(response => {
        this.jenis_hewan = response.data.value
      })
    },
    getUkuran(){
      var uri = this.$api_baseUrl + "ukuranhewan"

      this.$http.get(uri).then(response => {
        this.ukuran_hewan = response.data.value
      })
    },
    getData(editId) {
      var uri = this.$api_baseUrl + "layanan/" + editId

      this.$http.get(uri).then(response => {
        this.editDataLayanan = response.data.value
        this.formEditHandler(this.editDataLayanan)
      })
    },
    formEditHandler(dataLayanan) {
      this.form.nama_layanan.value = dataLayanan.nama_layanan
      this.form.jenis.value = dataLayanan.id_jenis
      this.form.ukuran.value = dataLayanan.id_ukuran
      this.form.harga.value = dataLayanan.harga
    },
    clearError(form) {
      console.log(form)
      form.type = ''
      form.message = '' 
    },
    cekData() {
      let count = 0
      let regex = new RegExp(/^\d+$/)

      if(this.form.nama_layanan.value === "") {
        this.form.nama_layanan.type = 'is-danger'
        this.form.nama_layanan.message = "Nama tidak boleh kosong!"
        count++
      }
      if(this.form.jenis.value === "") {
        this.form.jenis.type = 'is-danger'
        this.form.jenis.message = "Jenis tidak boleh kosong!"
        count++
      } 
      if(this.form.ukuran.value === "") {
        this.form.ukuran.type = 'is-danger'
        this.form.ukuran.message = "Ukuran tidak boleh kosong!"
        count++
      } 
      if(this.form.harga.value === "") {
        this.form.harga.type = 'is-danger'
        this.form.harga.message = "Harga tidak boleh kosong!"
        count++
      } else if(!regex.test(this.form.harga.value) || this.form.harga.value < 1) {
        this.form.harga.type = 'is-danger'
        this.form.harga.message = "Harga tidak valid!"
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
        this.dataLayanan.append("nama_layanan", this.form.nama_layanan.value)
        this.dataLayanan.append("id_jenis", this.form.jenis.value)
        this.dataLayanan.append("id_ukuran", this.form.ukuran.value)
        this.dataLayanan.append("harga", this.form.harga.value)
        this.dataLayanan.append("pic", this.$session.get('pegawai').id_pegawai)
        
        var uri = this.$api_baseUrl + "layanan";

        this.$http.post(uri, this.dataLayanan).then(response => {
          this.$router.push( { name: "Layanan" } )
          this.snackbarMsg = response.data.message
          this.snackbar("Data berhasil ditambahkan!", 'is-success')
        })
        .catch(error => {
          this.errors = error;
          console.log(this.errors)
          if (this.errors.message == "Request failed with status code 400") {
            this.snackbar("Edit gagal. Sepertinya inputan salah...", 'is-danger')
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
        this.editDataLayanan.nama_layanan = this.form.nama_layanan.value
        this.editDataLayanan.id_jenis = this.form.jenis.value
        this.editDataLayanan.id_ukuran = this.form.ukuran.value
        this.editDataLayanan.harga = this.form.harga.value
        this.editDataLayanan.pic = this.$session.get('pegawai').id_pegawai

        var uri = this.$api_baseUrl + "layanan/" + editId;

        this.$http.put(uri, this.editDataLayanan).then(response => {
          this.$router.push( { name: "Layanan" } )
          this.snackbarMsg = response.data.message
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
    this.getJenis()
    this.getUkuran()
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.editId = this.$route.params.id // berarti ID-nya akan dimasukin ke editId
      this.actionTitle = 'Ubah'           // Title di atas jadi 'Ubah Data
      this.getData(this.editId)           // Ngambil data lama sesuai ID
    } else {                      // Ini kalo gak ada param ID di URL
      this.actionTitle = 'Tambah' // berarti dia nambah data
      // document.getElementById('password').disabled = false; // Terus bagian input passwordnya bisa diisi
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