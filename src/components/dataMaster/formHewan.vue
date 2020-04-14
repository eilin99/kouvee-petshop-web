<template>
  <section id="form-hewan">
    <h4 class="title is-5">{{ actionTitle }} Data Hewan</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Hewan" 
            :type="form.nama_hewan.type"
            :message="form.nama_hewan.message"
            horizontal>
              <b-input @input="clearError(form.nama_hewan)" v-model="form.nama_hewan.value"></b-input>
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
              @input="clearError(form.tgl_lahir)" >
          </b-datepicker>
          <b-button
              @click="$refs.datepicker.toggle()"
              type="is-primary">
              <b-icon icon="calendar" size="is-small"></b-icon>
          </b-button>
        </b-field>

        <b-field 
            label="Jenis Hewan"
            :type="form.jenis.type"
            :message="form.jenis.message"
            horizontal>
          <b-select v-model="form.jenis.value" @input="clearError(form.jenis)"  placeholder="Pilih jenis hewan">
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
          <b-select v-model="form.ukuran.value" @input="clearError(form.ukuran)" placeholder="Pilih ukuran hewan">
            <option v-for="(item) in ukuran_hewan" 
                :key="item.id_ukuran"
                :value="item.id_ukuran">
                {{ item.ukuran }}
            </option>
          </b-select>
        </b-field>

        <b-field 
            label="Customer"
            :type="form.customer.type"
            :message="form.customer.message"
            horizontal>
          <b-select v-model="form.customer.value" @input="clearError(form.customer)" placeholder="Pilih customer">
            <option v-for="(item) in customer" 
                :key="item.id_customer"
                :value="item.id_customer">
                {{ item.nama_customer }}
            </option>
          </b-select>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/cs/hewan" 
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
      dataHewan: new FormData(), // Buat nampung isi form
      editDataHewan: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        nama_hewan: { value: '', type: '', message: '' },
        tgl_lahir: { value: '', type: '', message: '' },
        jenis: { value: '', type: '', message: '' },
        ukuran: { value: '', type: '', message: '' },
        customer: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
      jenis_hewan: [],
      ukuran_hewan: [],
      customer: [],
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
    getCustomer(){
      var uri = this.$api_baseUrl + "customer"

      this.$http.get(uri).then(response => {
        this.customer = response.data.value
      })
    },
    getData(editId) {
      var uri = this.$api_baseUrl + "hewan/" + editId

      this.$http.get(uri).then(response => {
        this.editDataHewan = response.data.value
        this.formEditHandler(this.editDataHewan)
      })
    },
    formEditHandler(dataHewan) {
      this.form.nama_hewan.value = dataHewan.nama_hewan
      this.form.tgl_lahir.value = new Date(dataHewan.tgl_lahir)
      this.form.jenis.value = dataHewan.id_jenis
      this.form.ukuran.value = dataHewan.id_ukuran
      this.form.customer.value = dataHewan.id_customer
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

      if(this.form.nama_hewan.value === "") {
        this.form.nama_hewan.type = 'is-danger'
        this.form.nama_hewan.message = "Nama tidak valid!"
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
      if(this.form.tgl_lahir.value === "") {
        this.form.tgl_lahir.type = 'is-danger'
        this.form.tgl_lahir.message = "Tanggal lahir tidak boleh kosong!"
        count++
      }
      if(this.form.customer.value === "") {
        this.form.customer.type = 'is-danger'
        this.form.customer.message = "Customer telepon tidak boleh kosong!"
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
        this.dataHewan.append("nama_hewan", this.form.nama_hewan.value)
        this.dataHewan.append("tgl_lahir", this.convertTgl(this.form.tgl_lahir.value))
        this.dataHewan.append("id_jenis", this.form.jenis.value)
        this.dataHewan.append("id_ukuran", this.form.ukuran.value)
        this.dataHewan.append("id_customer", this.form.customer.value)
        this.dataHewan.append("pic", this.$session.get('pegawai').id_pegawai)
        
        var uri = this.$api_baseUrl + "hewan";

        this.$http.post(uri, this.dataHewan).then(response => {
          this.$router.push( { name: "Hewan" } )
          this.snackbarMsg = response.data.message
          this.snackbar("Data berhasil ditambahkan!", 'is-success')
        })
        .catch(error => {
          this.errors = error;
          console.log(this.errors)
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
        this.editDataHewan.nama_hewan = this.form.nama_hewan.value
        this.editDataHewan.tgl_lahir = this.convertTgl(this.form.tgl_lahir.value)
        this.editDataHewan.id_jenis = this.form.jenis.value
        this.editDataHewan.id_ukuran = this.form.ukuran.value
        this.editDataHewan.id_customer = this.form.customer.value
        this.editDataHewan.pic = this.$session.get('pegawai').id_pegawai

        var uri = this.$api_baseUrl + "hewan/" + editId;

        this.$http.put(uri, this.editDataHewan).then(response => {
          this.$router.push( { name: "Hewan" } )
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
    this.getCustomer()
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