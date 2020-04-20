<template>
  <section id="penjualan-produk">
    <h4 class="title is-4">Penjualan Produk</h4>
    <hr>
    <div class="columns">
      <div class="daftar-produk column is-8">
        <!-- <b-field label="Find a name">
            <b-autocomplete
                v-model="data.nama_produk"
                placeholder="Cari nama produk"
                :keep-first="true"
                :open-on-focus="true"
                :data="filteredDataObj"
                field="data.nama_produk"
                @select="option => selected = option">
            </b-autocomplete>
        </b-field> -->
        
        <CardPenjualanProduk
          v-for="data in datas"
          :key="data.nama_produk"
          :data="data"
        />
      </div>

      <div class="daftar-beli column is-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique harum sint, necessitatibus, perferendis obcaecati error placeat dolor accusantium quidem tempore ut quod culpa quasi assumenda praesentium numquam veniam temporibus. Quasi.
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

<style scoped>
.daftar-produk {
  overflow-y: scroll;
  max-height: 700px;
  display: flex;
  flex-flow: row wrap;
}
</style>

<script>
import CardPenjualanProduk from "./CardPenjualanProduk.vue"

export default {
  components: {
    CardPenjualanProduk
  },
  data() {
    return {
      isLoading: true,
      gambarProduk:'',
      // editId: 0, // Dibikin default 0 buat bedain dia edit data atau add data. Lebih jelasnya baca method confirm()
      // dataPenjualan: new FormData(), // Buat nampung isi form
      datas: [],
      form: {
        nama_produk: { value: '', type: '', message: '' },
        satuan: { value: '', type: '', message: '' },
        harga_jual: { value: '', type: '', message: '' },
        harga_beli: { value: '', type: '', message: '' },
        stok: { value: 0, type: '', message: '' },
        stok_minimum: { value: 0, type: '', message: '' },
        gambar: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    beli() {
      window.alert("beli")
    },
    batalBeli() {
      window.alert("batal beli")
    },
    getData() {
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
    clearError(form) {
      console.log(form)
      form.type = ''
      form.message = '' 
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu

      if(this.cekData() == false) {
        this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.dataProduk.append("nama_produk", this.form.nama_produk.value)
        this.dataProduk.append("satuan", this.form.satuan.value)
        this.dataProduk.append("harga_jual", this.form.harga_jual.value)
        this.dataProduk.append("harga_beli", this.form.harga_beli.value)
        this.dataProduk.append("stok", this.form.stok.value)
        this.dataProduk.append("stok_minimum", this.form.stok_minimum.value)
        this.dataProduk.append("gambar", this.form.gambar.value)
        this.dataProduk.append("pic", this.$session.get('pegawai').id_pegawai)

        var uri = this.$api_baseUrl + "produk";

        this.$http.post(uri, this.dataProduk).then(response => {
          this.$router.push( { name: 'Produk' } )
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
        })
      }
      this.isLoading = false // Biar berhenti loading
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
  computed: {
    filteredDataObj() {
      return this.data.filter((option) => {
        return option.user.first_name
          .toString()
          .toLowerCase()
          .indexOf(this.data.nama_produk.toLowerCase()) >= 0
      })
    }
  },
  mounted() {
    this.isLoading = true
    this.getData()
    console.log(this.datas)
    this.isLoading = false // page udah ter-load dan berhenti loading
  }
}
</script>