<template>
  <section id="penjualan-produk">
    <h4 class="title is-4">Penjualan Produk</h4>
    <hr>
    <div class="columns is-gapless">
      <div class="column is-8">
        
        <div class="search-bar">
          <b-field>
            <b-input
                v-model="cari"
                icon="magnify"
                clearable
                rounded
                placeholder="Cari produk"
                :open-on-focus="true">
            </b-input>
          </b-field>
        </div>

        <div class="daftar-produk">
          <CardPenjualanProduk
            v-for="data in filteredProduk"
            :key="data.nama_produk"
            :data="data"
          />
        </div>
        
      </div>

      <div class="column is-4">
        <div class="daftar-beli has-background-white-ter">
          <div class="member">
            <div v-if="member.id_customer == 0">
              <b-button
                  icon-left="face"
                  size="is-large"
                  @click="isComponentModalActive = true"
                  type="is-light has-text-primary"
                  expanded>
                    Pilih member
              </b-button>
            </div>
            <div v-else style="padding: 15px;">
              <div class="level is-mobile">
                <div class="level-left">
                  <!-- <div class="level-item"> -->
                    <div>
                      <p class="title is-4">
                        <b-icon icon="face" type="is-primary"></b-icon> {{ member.nama_customer }}
                      </p>
                      <p class="subtitle is-6">
                        <b-icon icon="paw" type="is-primary"></b-icon> {{ member.nama_hewan }} ({{ member.jenis }})
                      </p>
                    </div>
                  <!-- </div> -->
                </div>
                <div class="level-right">
                  <a @click="cancelMember">
                    <b-icon icon="close" size="is-small" type="is-danger"></b-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <b-table
                :data="tempBeli"
                :paginated="true"
                :per-page="5"
                :sort-icon-size="sortIconSize"
                default-sort="tempBeli.nama_produk"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

                <template slot-scope="props">
                    <b-table-column field="no" label="No." width="40" sortable numeric>
                        {{ props.index + 1 }}
                    </b-table-column>

                    <b-table-column field="nama_produk" label="Nama Produk" sortable>
                        {{ props.row.nama_produk }}
                    </b-table-column>

                    <b-table-column field="jumlah" label="Jumlah" sortable>
                        {{ props.row.jumlah }}
                    </b-table-column>
                </template>
            </b-table>
          </div>

          <footer class="footer">
            lorem
          </footer>
        </div>
      </div>
    </div>

    <!-- Buat loading page waktu awal load sama submit data -->
    <b-loading 
        :is-full-page="true" 
        :active.sync="isLoading" 
        :can-cancel="false">
    </b-loading>

    <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
      <ModalAddMember :member="member" @konfirmasiMember="member = $event"></ModalAddMember>
    </b-modal>
  
  </section>
</template>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
.daftar-produk {
  overflow-y: scroll;
  max-height: 700px;
  display: flex;
  flex-flow: row wrap;
}
.daftar-beli {
  margin-left: 10px;
  border-radius: 10px;
  height: 100%;
  padding: 10px;
}
.member {
  border-radius: 7px;
  border: 2px solid #e0d4ff;
  margin-bottom: 10px;
}
</style>

<script>
import CardPenjualanProduk from "./CardPenjualanProduk.vue"
import ModalAddMember from "./ModalAddCustomerDanHewan.vue"

export default {
  components: {
    CardPenjualanProduk,
    ModalAddMember
  },
  data() {
    return {
      isComponentModalActive: false,
      isLoading: true,
      cari:'', // Penampung string cari
      tempBeli: [ {nama_produk: 'asdf', jumlah: 3} ], // Temp produk yg mau dibeli
      datas: [], // data produk yg tersedia
      member: { // temp kalo pelanggannya member
        id_customer: 0,
        nama_customer: '',
        id_hewan: 0,
        nama_hewan: '',
        jenis: '',
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
    cancelMember() {
      this.member.id_customer = 0,
      this.member.nama_customer = '',
      this.member.id_hewan = 0,
      this.member.nama_hewan = '',
      this.member.jenis = ''
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
    filteredProduk: function() {
      return this.datas.filter((data) => {
        return data.nama_produk.toLowerCase().match(this.cari.toLowerCase())
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