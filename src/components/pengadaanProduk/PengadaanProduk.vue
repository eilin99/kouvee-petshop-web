<template>
  <section id="pengadaan-produk">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4 has-text-centered">Tambah Pengadaan Produk</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light has-text-primary"
            tag="router-link" 
            to="/owner/form-pengadaan-produk">
              Data Pengadaan Produk
        </b-button>
      </div>
    </div>
    <hr>
    <div class="columns is-gapless">
      <div class="column">
        
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

        <div class="form-produk">
          <CardPengadaanProduk
            v-for="data in filteredProduk"
            :key="data.nama_produk"
            :data="data"
            :tambahProduk="tambahProduk"
            :kurangiProduk="kurangiProduk"
          />
        </div>
    </div>

    <div class="column is-two-fifths">
        <div class="box-detail-pengadaan has-background-white-ter">
          <div class="supplier">
            <div v-if="supplier.id_supplier == 0">
              <b-button
                  icon-left="face"
                  size="is-large"
                  @click="isComponentModalActive = true"
                  type="is-light has-text-primary"
                  expanded>
                    Pilih supplier
              </b-button>
            </div>
            <div v-else style="padding: 15px;">
              <div class="level is-mobile">
                <div class="level-left">
                    <div>
                      <p class="title is-4">
                        <b-icon icon="face" type="is-primary"></b-icon> {{ supplier.nama_supplier }}
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div class="daftar-pesan">
            <b-table
                :data="tempPesan"
                sticky-header
                height="700px"
                narrowed
                default-sort="tempPesan.nama_produk"
                :checked-rows.sync="checkedRows"
                hoverable>

                <template slot-scope="props">

                  <b-table-column field="nama_produk" label="Produk"  width="190px" sortable>
                    <p style="font-size: 1.15em"><b>{{ props.row.nama_produk }}<br/></b></p>
                  </b-table-column>

                  <b-table-column field="subtotal" label="Subtotal" width="100px centered" sortable>
                    Rp {{ props.row.subtotal }}
                  </b-table-column>
                </template>

                <template slot="empty">
                  <section class="section">
                    <div class="content has-text-grey has-text-centered">
                      <p>
                        <b-icon
                          icon="shopping"
                          size="is-large">
                        </b-icon>
                      </p>
                      <p>Belum ada produk terpilih</p>
                    </div>
                  </section>
                </template>
            </b-table>
          </div>

          <footer class="box-detail-pengadaan-footer">
            <div class="total">
              
              <div class="level" style="margin-bottom: 0.5rem">
                <div class="level-left">
                  <p class="subtitle is-6">Supplier</p>
                </div>
                <div class="level-right">
                  <h4 class="title is-6">
                    <div v-if="supplier.nama_supplier == ''">
                      -
                    </div>
                    <div v-else>
                      {{ supplier.nama_supplier }}
                    </div>
                  </h4>
                </div>
              </div>
              
              <div class="level">
                <div class="level-left">
                  <p class="subtitle is-6">Total</p>
                </div>
                <div class="level-right">
                  <h4 class="title is-4">Rp {{ tempTotal }}</h4>
                </div>
              </div>
              
              <b-button type="is-primary" @click="pesan" expanded>Selesai</b-button>
            </div>
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
      <ModalAddSupplier :supplier="supplier" @konfirmasiSupplier="supplier = $event"></ModalAddSupplier>
    </b-modal>
  
  </section>
</template>


<style scoped>
.search-bar {
  margin-bottom: 20px;
}
.daftar-produk {
  overflow-y: scroll;
  height: 700px;
  min-height: 700px;
  display: flex;
  flex-flow: row wrap;
}
.box-detail-pengadaan {
  position: relative;
  margin-left: 10px;
  border-radius: 10px;
  height: 100%;
  padding:  10px;
}
.supplier {
  border-radius: 7px;
  border: 2px solid #e0d4ff;
  margin-bottom: 10px;
}
.box-detail-pengadaan-footer {
  width: 100%;
  position: absolute;
  margin-bottom: 10px;
  bottom: 0;
}
.total {
  padding: 10px;
  width: 95%;
  border-radius: 7px;
  border: 2px solid #e0d4ff;
}
</style>

<script>
import CardPengadaanProduk from './cardModal/CardPengadaanProduk.vue'
import ModalAddSupplier from './cardModal/ModalAddSupplier.vue'

export default {
  components: {
    CardPengadaanProduk,
    ModalAddSupplier
  },
  data() {
    return {
      isComponentModalActive: false,
      isLoading: true,
      cari:'', // Penampung string cari
      tempPesan: [], // Temp layanan yg mau dibeli
      datas: [], // data layanan yg tersedia
      checkedRows: [], // nampung data yg dicentang
      supplier: { // temp kalo pelanggannya member
        id_supplier: 0,
        nama_supplier: '',
      },
      snackbarMsg: '',
    }
  },
  methods: {
    // --------------------
    // Buat list layanan yang mau dibeli
    // --------------------
    tambahProduk(produk) {
      if (this.tempPesan.length === 0) {
        produk.jumlah = 1
        produk.subtotal = produk.harga
        this.tempPesan.push(produk)
      } else {
        if(this.cekProdukExistDaftarPesan(produk)) {
          this.snackbar('Produk sudah dipilih', "is-info")
        } else {
          produk.jumlah = 1
          produk.subtotal = produk.harga
          this.tempPesan.push(produk)
        }
      }
    },
    cekProdukExistDaftarPesan(produk) {
      for(let i=0; i<this.tempProduk.length; i++) {
        if(this.tempProduk[i].id_produk == produk.id_produk)
          return true
      }
      return false
    },
    kurangiProduk(id_produk) {
      this.tempPesan = this.tempPesan.filter(p => p.id_produk != id_produk)
    },
    updateSubtotal(item) {
      item.subtotal = item.jumlah * item.harga
    },
    getProduk() {
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // --------------------
    // Tambah-tambah data
    // --------------------
    async addNewPengadaan() {
      let pengadaan = new FormData()

      if (this.supplier.id_supplier != 0) {
        pengadaan.append("id_supplier", this.supplier.id_supplier)
      }
      pengadaan.append("id_pic", this.$session.get('pegawai').id_pegawai)

      var uri = this.$api_baseUrl + "pengadaan";

      try {
        await this.$http.post(uri, pengadaan)
      } catch (e) {
        this.errors = e
      }
    },
    async addNewDetail(produk, nomor_pengadaan) {
      let dataProduk = new FormData()

      dataProduk.append("nomor_pengadaan", nomor_pengadaan)
      dataProduk.append("id_produk", produk.id_produk)
      dataProduk.append("jumlah", produk.jumlah)
      dataProduk.append("subtotal", produk.subtotal)

      var uri = this.$api_baseUrl + "detail_pengadaan";

      try {
        await this.$http.post(uri, dataProduk)
      } catch (e) {
        this.errors = e
      }
    },
    async editTotalPengadaan(id) {
      let dataProduk = {}
      dataProduk.total = this.tempTotal
      console.log(dataProduk)

      var uri = this.$api_baseUrl + "pengadaan/updateTotal/" + id;
      try {
        await this.$http.put(uri, dataProduk, this.config)
      } catch (e) {
        this.errors = e
      }
    },
    async getNoPengadaan() {
      let asyncPengadaan = await this.$http.get(this.$api_baseUrl + "pengadaan")
      let pengadaan = asyncPengadaan.data.value
      let panjangArray = pengadaan.length

      return pengadaan[panjangArray-1].nomor_pengadaan
    },
    async pesan() {
      this.isLoading = true // Biar dia loading dulu

      await this.addNewPengadaan()

      let noPengadaan = await this.getNoPengadaan()

      this.tempPesan.forEach(item => {
        this.addNewDetail(item, noPengadaan)
      });

      await this.editTotalPengadaan(noPengadaan)

      this.isLoading = false // Biar berhenti loading  

      this.$buefy.dialog.confirm({
        title: 'Pengadaan berhasil',
        message: 'Pengadaan sudah tercatat!',
        confirmText: 'OK',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.$buefy.toast.open('Yayy!')
      })
    },

    // --------------------
    // Lain-lain
    // --------------------
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
    filteredProduk() {
      return this.datas.filter((data) => {
        return data.nama_produk.toLowerCase().match(this.cari.toLowerCase())
      })
    },
    tempTotal() {
      var temp = 0
      
      this.tempPesan.forEach(e => {
        temp += parseFloat(e.subtotal)
      });

      return temp
    }
  },
  mounted() {
    this.isLoading = true
    this.getProduk()
    this.isLoading = false // page udah ter-load dan berhenti loading
  }
}
</script>