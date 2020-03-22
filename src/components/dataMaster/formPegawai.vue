<template>
  <section id="form-pegawai">
    <h4 class="title is-5">{{ actionTitle }} Data Pegawai</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Lengkap" 
            :type="form.nama_pegawai.type"
            :message="form.nama_pegawai.message"
            horizontal>
              <b-input v-model="form.nama_pegawai.value"></b-input>
        </b-field>

        <b-field 
            label="Alamat" 
            :type="form.alamat.type"
            :message="form.alamat.message"
            horizontal>
              <b-input v-model="form.alamat.value"></b-input>
        </b-field>

        <b-field 
            label="Nomor Telepon" 
            :type="form.no_telp.type"
            :message="form.no_telp.message"
            horizontal>
              <b-input v-model="form.no_telp.value"></b-input>
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
              v-model="form.tgl_lahir.value">
          </b-datepicker>
          <b-button
              @click="$refs.datepicker.toggle()"
              type="is-primary">
              <b-icon icon="calendar" size="is-small"></b-icon>
          </b-button>
        </b-field>

        <b-field label="Jabatan" horizontal>
          <b-select v-model="form.jabatan.value" placeholder="Pilih jabatan">
            <option value="Kasir">Kasir</option>
            <option value="CS">CS</option>
          </b-select>
        </b-field>

        <hr>

        <b-field 
            label="Username"
            :type="form.username.type"
            :message="form.username.message"
            horizontal>
              <b-input v-model="form.username.value" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password" :message="form.password.message" horizontal>
          <b-input id="password"
              type="password"
              v-model="form.password.value"
              password-reveal
              disabled>
          </b-input>
        </b-field>

        <div class="has-text-right">
          <b-button size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/admin/pegawai" 
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      actionTitle: '',
      editId: 0,
      dataPegawai: new FormData(),
      editDataPegawai: {},
      form: {
        nama_pegawai: { value: '', type: '', message: '' },
        alamat: { value: '', type: '', message: '' },
        no_telp: { value: '', type: '', message: '' },
        tgl_lahir: { value: '', type: '', message: '' },
        jabatan: { value: '', type: '', message: '' },
        username: { value: '', type: '', message: '' },
        password: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "pegawai/" + editId

      this.$http.get(uri).then(response => {
        this.editDataPegawai = response.data.value
        this.formEditHandler(this.editDataPegawai)
      })
    },
    formEditHandler(dataPegawai) {

      this.form.nama_pegawai.value = dataPegawai.nama_pegawai
      this.form.alamat.value = dataPegawai.alamat
      this.form.no_telp.value = dataPegawai.no_telp
      this.form.tgl_lahir.value = new Date(dataPegawai.tgl_lahir)
      this.form.jabatan.value = dataPegawai.jabatan
      this.form.username.value = dataPegawai.username
      this.form.password.message = 'Data tidak dapat diubah'
      // this.form.password.type = 'disabled'
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
      console.log('adding')
      this.dataPegawai.append("nama_pegawai", this.form.nama_pegawai.value)
      this.dataPegawai.append("alamat", this.form.alamat.value)
      this.dataPegawai.append("tgl_lahir", this.convertTgl(this.form.tgl_lahir.value))
      this.dataPegawai.append("no_telp", this.form.no_telp.value)
      this.dataPegawai.append("jabatan", this.form.jabatan.value)
      this.dataPegawai.append("username", this.form.username.value)
      this.dataPegawai.append("password", this.form.password.value)
      this.dataPegawai.append("pic", 1)
      
      var uri = this.$api_baseUrl + "pegawai";

      this.$http.post(uri, this.dataPegawai).then(response => {
        this.router.push( { name: 'Pegawai' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.snackbar(this.errors, 'is-danger')
      });
    },
    editData(editId) {
      this.editDataPegawai.nama_pegawai = this.form.nama_pegawai.value
      this.editDataPegawai.alamat = this.form.alamat.value
      this.editDataPegawai.tgl_lahir = this.convertTgl(this.form.tgl_lahir.value)
      this.editDataPegawai.no_telp = this.form.no_telp.value
      this.editDataPegawai.jabatan = this.form.jabatan.value
      this.editDataPegawai.username = this.form.username.value
      this.editDataPegawai.pic = 3

      var uri = this.$api_baseUrl + "pegawai/" + editId;

      this.$http.put(uri, this.editDataPegawai, this.config).then(response => {
        this.router.push( { name: 'Pegawai' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
      console.log(this.editDataPegawai)

        this.errors = error;
        this.snackbar(this.errors, 'is-danger')
      });
    },
    confirm() {
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
    if(this.$route.params.id) {
      this.editId = this.$route.params.id
      this.actionTitle = 'Ubah'
      this.getData(this.editId)
      this.form.password.message = 'Tidak dapat mengubah password pegawai'
    } else {
      this.actionTitle = 'Tambah'
      document.getElementById('password').disabled = false;
    }
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