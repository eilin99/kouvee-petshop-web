<template>
  <section id="detail-penjualan-produk">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4">Detail Penjualan Produk</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light" 
            tag="router-link"
            :to="'/cs/daftar-penjualan-produk/'"
            rounded>
              <p class="has-text-primary">Kembali</p>
        </b-button>
      </div>
    </div>
    <hr>
    
    <p class="subtitle is-5">
      Nomor Transaksi : {{ datas[0].nomor_transaksi }}
    </p>
    
    <b-table
      :data="datas"
      :columns="columns"
      :hoverable="true"
      :loading="isLoading" 
      :mobile-cards="true"
      paginated
      per-page="10"
      ref="table"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">

        <b-table-column  
            label="No." 
            width="50px"
            centered
            sortable>
          {{ props.index + 1 }}
        </b-table-column>

        <b-table-column 
            field="nama_produk" 
            label="Nama produk"
            :searchable="true">
          {{ props.row.nama_produk }}
        </b-table-column>

        <b-table-column 
            field="harga_jual" 
            label="Harga"
            width="150px"
            :searchable="true">
          {{ "Rp" + props.row.harga_jual }}
        </b-table-column>

        <b-table-column 
            field="jumlah" 
            label="Jumlah"
            width="125px"
            searchable
            sortable>
          {{ props.row.jumlah }}
        </b-table-column>

        <b-table-column 
            field="subtotal" 
            label="Subtotal">
          {{ 'Rp.' + props.row.subtotal }}
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                rounded>
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id_produk)" 
                rounded>
                  <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                :icon="tableLoadingIcon"
                size="is-large">
              </b-icon>
            </p>
            <p>{{ tableMessage }}</p>
          </div>
        </section>
      </template>

      <template slot="footer">
        <div class="has-text-centered">
          <b-button size="is-medium" 
              type="is-light" 
              icon-left="plus" 
              tag="router-link" 
              to="/cs/penjualan-produk" 
              expanded>
            Tambah
          </b-button>
        </div>
      </template>

    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      isLoading: true,
      actionTitle: '',
      detailId: 0, // Dibikin default 0 buat bedain dia edit data atau add data. Lebih jelasnya baca method confirm()
      dataUkuranHewan: new FormData(), // Buat nampung isi form
      editDataUkuranHewan: {}, // Buat nampung data yg mau diedit kalo ada
      form: {
        ukuran: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/detail_produk/getByTransaction/" + this.detailId

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
        this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
        this.isLoading = false
      })
      .catch(error => {
        this.errors = error
        this.tableLoadingIcon = "emoticon-sad"  // Tampilan kalo
        this.tableMessage = 'Tidak ada data'    // ga ada data
        this.isLoading = false
      })
    },
    formEditHandler(dataUkuranHewan) {
      this.form.ukuran.value = dataUkuranHewan.ukuran
    },
    clearError(form) {
      console.log(form)
      form.type = ''
      form.message = '' 
    },
    cekData() {
      let count = 0

      if(this.form.ukuran.value === "") {
        this.form.ukuran.type = 'is-danger'
        this.form.ukuran.message = "Ukuran hewan tidak boleh kosong!"
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
        this.dataUkuranHewan.append("ukuran", this.form.ukuran.value)
        this.dataUkuranHewan.append("pic", this.$session.get('pegawai').id_pegawai)
        
        var uri = this.$api_baseUrl + "ukuranhewan";

        this.$http.post(uri, this.dataUkuranHewan).then(response => {
          this.$router.push( { name: 'UkuranHewan' } )
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
    editData(detailId) {
      this.isLoading = true // Biar dia loading dulu

      if(this.cekData() == false) {
        this.snackbar("Gagal tambah data. Sepertinya inputan salah...", 'is-danger')
      } else {
        this.editDataUkuranHewan.ukuran = this.form.ukuran.value
        this.editDataUkuranHewan.pic = this.$session.get('pegawai').id_pegawai

        var uri = this.$api_baseUrl + "ukuranhewan/" + detailId;

        this.$http.put(uri, this.editDataUkuranHewan, this.config).then(response => {
          this.$router.push( { name: 'UkuranHewan' } )
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
      this.detailId = this.$route.params.id // berarti ID-nya akan dimasukin ke detailId
      this.actionTitle = 'Ubah'           // Title di atas jadi 'Ubah Data
      this.getData(this.detailId)           // Ngambil data lama sesuai ID
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