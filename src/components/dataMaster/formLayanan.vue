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

        <!-- <b-field label="Jenis Hewan" horizontal>
          <b-select v-model="form.jenis.value" placeholder="Pilih jenis hewan">
            <option v-for="(itemSelection, indexSelection) in item.select.options" 
                :key="indexOpt"
                :value="selectOption">
                {{ selectOption }} - {{ selectOption == item.select.selected }}
            </option> -->
            <!-- <option value="Kasir">Kasir</option>
            <option value="CS">CS</option> -->
          <!-- </b-select>
        </b-field> -->

        <b-field 
            label="Harga" 
            :type="form.harga.type"
            :message="form.harga.message"
            horizontal>
              <b-input v-model="form.harga.value"></b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/admin/layanan" 
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
      selection_jenis: [],
      selection_ukuran: [],
    }
  },
  methods: {
    setDropdownJenis(){
      var uri = this.$api_baseUrl + "jenishewan"

      this.$http.get(uri).then(response => {
        this.jenis_hewan = response.data.value
        for(var i=0; i<this.jenis_hewan.length; i++){
          this.selection_jenis[i] = this.jenis_hewan[i].jenis
        }
      })
    },
    setDropdownUkuran(){
      var uri = this.$api_baseUrl + "ukuranhewan"

      this.$http.get(uri).then(response => {
        this.ukuran_hewan = response.data.value
        for(var i=0; i<this.ukuran_hewan.length; i++){
          this.selection_ukuran[i] = this.ukuran_hewan[i].ukuran
        }
      })
    },
    getData(editId) {
      var uri = this.$api_baseUrl + "pegawai/" + editId

      this.$http.get(uri).then(response => {
        this.editDataPegawai = response.data.value
        this.formEditHandler(this.editDataPegawai)
      })
    },
    // formEditHandler(dataPegawai) {
      // this.form.nama_pegawai.value = dataPegawai.nama_pegawai
      // this.form.alamat.value = dataPegawai.alamat
      // this.form.no_telp.value = dataPegawai.no_telp
      // this.form.tgl_lahir.value = new Date(dataPegawai.tgl_lahir)
      // this.form.jabatan.value = dataPegawai.jabatan
      // this.form.username.value = dataPegawai.username
      // this.form.password.message = 'Data tidak dapat diubah'
    // },
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

      this.dataPegawai.append("nama_pegawai", this.form.nama_pegawai.value)
      this.dataPegawai.append("alamat", this.form.alamat.value)
      this.dataPegawai.append("tgl_lahir", this.convertTgl(this.form.tgl_lahir.value))
      this.dataPegawai.append("no_telp", this.form.no_telp.value)
      this.dataPegawai.append("jabatan", this.form.jabatan.value)
      this.dataPegawai.append("username", this.form.username.value)
      this.dataPegawai.append("password", this.form.password.value)
      this.dataPegawai.append("pic", this.$session.get('pegawai').id_pegawai)
      
      var uri = this.$api_baseUrl + "pegawai";

      this.$http.post(uri, this.dataPegawai).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.router.push( { to: 'admin/pegawai' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        this.snackbar(this.errors, 'is-danger')
      });
    },
    editData(editId) {
      this.isLoading = true // Biar dia loading dulu

      this.editDataPegawai.nama_pegawai = this.form.nama_pegawai.value
      this.editDataPegawai.alamat = this.form.alamat.value
      this.editDataPegawai.tgl_lahir = this.convertTgl(this.form.tgl_lahir.value)
      this.editDataPegawai.no_telp = this.form.no_telp.value
      this.editDataPegawai.jabatan = this.form.jabatan.value
      this.editDataPegawai.username = this.form.username.value
      this.editDataPegawai.pic = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "pegawai/" + editId;

      this.$http.put(uri, this.editDataPegawai, this.config).then(response => {
        this.isLoading = false // Biar berhenti loading
        this.router.push( { to: 'admin/pegawai' } )
        this.snackbarMsg = response.message
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
    this.setDropdownJenis()
    this.setDropdownUkuran()
    // this.getJenis()
    if(this.$route.params.id) {           // Kalo di URL ada angka ID-nya,
      this.editId = this.$route.params.id // berarti ID-nya akan dimasukin ke editId
      this.actionTitle = 'Ubah'           // Title di atas jadi 'Ubah Data
      this.getData(this.editId)           // Ngambil data lama sesuai ID
      this.form.password.message = 'Tidak dapat mengubah password pegawai' // Nampilin pesan kalo edit pass itu gabisa isi inputan password
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

// {
//   "message":"Validation Error",
//   "value":{
//     "no_telp":["The no telp has already been taken."],
//     "jabatan":["The jabatan may only contain letters."],
//     "username":["The username has already been taken."]
//   }
// }