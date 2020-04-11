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
              <b-input v-model="form.nama_layanan.value"></b-input>
        </b-field>

        <b-field 
            label="Jenis Hewan"
            :type="form.jenis.type"
            :message="form.jenis.message"
            horizontal>
          <b-select v-model="form.jenis.value" placeholder="Pilih jenis hewan">
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
          <b-select v-model="form.ukuran.value" placeholder="Pilih ukuran hewan">
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
    addData() {
      this.isLoading = true // Biar dia loading dulu

      this.dataLayanan.append("nama_layanan", this.form.nama_layanan.value)
      this.dataLayanan.append("id_jenis", this.form.jenis.value)
      this.dataLayanan.append("id_ukuran", this.form.ukuran.value)
      this.dataLayanan.append("harga", this.form.harga.value)
      this.dataLayanan.append("pic", this.$session.get('pegawai').id_pegawai)
      
      var uri = this.$api_baseUrl + "layanan";

      this.$http.post(uri, this.dataLayanan).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: "Layanan" } )
        this.snackbarMsg = response.data.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        console.log(this.errors)
        this.isLoading = false // Biar berhenti loading
        this.snackbar(this.errors, 'is-danger')
      });
    },
    editData(editId) {
      this.isLoading = true // Biar dia loading dulu

      this.editDataLayanan.nama_layanan = this.form.nama_layanan.value
      this.editDataLayanan.id_jenis = this.form.jenis.value
      this.editDataLayanan.id_ukuran = this.form.ukuran.value
      this.editDataLayanan.harga = this.form.harga.value
      this.editDataLayanan.pic = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "layanan/" + editId;

      this.$http.put(uri, this.editDataLayanan).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.$router.push( { name: "Layanan" } )
        this.snackbarMsg = response.data.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        this.snackbar(this.errors, 'is-danger')
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