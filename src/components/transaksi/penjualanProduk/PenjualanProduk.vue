<template>
  <section id="penjualan-produk">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4 has-text-centered">Tambah Penjualan Produk</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light has-text-primary"
            tag="router-link" 
            to="/cs/daftar-penjualan-produk">
              Daftar Penjualan Produk
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

        <div class="daftar-produk">
          <CardPenjualanProduk
            v-for="data in filteredProduk"
            :key="data.nama_produk"
            :data="data"
            :tambahProduk="tambahProduk"
            :kurangiProduk="kurangiProduk"
          />
        </div>
        
      </div>

      <div class="column is-two-fifths">
        <div class="box-detail-transaksi has-background-white-ter">
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
                    <div>
                      <p class="title is-4">
                        <b-icon icon="face" type="is-primary"></b-icon> {{ member.nama_customer }}
                      </p>
                      <p class="subtitle is-6">
                        <b-icon icon="paw" type="is-primary"></b-icon> {{ member.nama_hewan }} ({{ member.jenis }})
                      </p>
                    </div>
                </div>
                <div class="level-right">
                  <a @click="cancelMember">
                    <b-icon icon="close" type="is-danger"></b-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="daftar-beli">
            <b-table
                :data="tempBeli"
                sticky-header
                height="700px"
                narrowed
                default-sort="tempBeli.nama_produk"
                :checked-rows.sync="checkedRows"
                hoverable>

                <template slot-scope="props">

                  <b-table-column field="nama_produk" label="Produk"  width="190px" sortable>
                    <p style="font-size: 1.15em"><b>{{ props.row.nama_produk }}<br/></b></p>
                    <span class="title is-7">Rp {{ props.row.harga_jual }} / {{ props.row.satuan }}</span>
                  </b-table-column>

                  <b-table-column field="jumlah" width="110px" label="Jml" sortable centered>
                    <b-numberinput
                        v-model="props.row.jumlah"
                        size="is-small"
                        controls-position="compact"
                        controls-rounded
                        min="1"
                        :max="props.row.stok"
                        @input="updateSubtotal(props.row)">
                    </b-numberinput>
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

          <footer class="box-detail-transaksi-footer">
            <div class="total">
              
              <div class="level" style="margin-bottom: 0.5rem">
                <div class="level-left">
                  <p class="subtitle is-6">Member</p>
                </div>
                <div class="level-right">
                  <h4 class="title is-6">
                    <div v-if="member.nama_customer == ''">
                      -
                    </div>
                    <div v-else>
                      {{ member.nama_customer }}
                    </div>
                  </h4>
                </div>
              </div>
              
              <div class="level">
                <div class="level-left">
                  <p class="subtitle is-6">Hewan</p>
                </div>
                <div class="level-right">
                  <h4 class="title is-6">
                    <div v-if="member.nama_hewan == ''">
                        -
                    </div>
                    <div v-else>
                      {{ member.nama_hewan }} ({{ member.jenis }})
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
              
              <b-button type="is-primary" @click="beli" expanded>Selesai</b-button>
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
  height: 700px;
  min-height: 700px;
  display: flex;
  flex-flow: row wrap;
}
.box-detail-transaksi {
  position: relative;
  margin-left: 10px;
  border-radius: 10px;
  height: 100%;
  padding:  10px;
}
.member {
  border-radius: 7px;
  border: 2px solid #e0d4ff;
  margin-bottom: 10px;
}
.box-detail-transaksi-footer {
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
import CardPenjualanProduk from "../CardPenjualanProduk.vue"
import ModalAddMember from "../ModalAddCustomerDanHewan.vue"

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
      tempBeli: [], // Temp produk yg mau dibeli
      datas: [], // data produk yg tersedia
      checkedRows: [], // nampung data yg dicentang
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
    // --------------------
    // Buat list produk yang mau dibeli
    // --------------------
    tambahProduk(produk) {
      if (this.tempBeli.length === 0) {
        produk.jumlah = 1
        produk.subtotal = produk.harga_jual
        this.tempBeli.push(produk)
      } else {
        if(this.cekProdukExistDaftarBeli(produk)) {
          this.snackbar('Produk sudah dipilih', "is-info")
        } else {
          produk.jumlah = 1
          produk.subtotal = produk.harga_jual
          this.tempBeli.push(produk)
        }
      }
    },
    cekProdukExistDaftarBeli(produk) {
      for(let i=0; i<this.tempBeli.length; i++) {
        if(this.tempBeli[i].id_produk == produk.id_produk)
          return true
      }
      return false
    },
    kurangiProduk(id_produk) {
      this.tempBeli = this.tempBeli.filter(p => p.id_produk != id_produk)
    },
    updateSubtotal(item) {
      item.subtotal = item.jumlah * item.harga_jual
    },
    cancelMember() {
      this.member.id_customer = 0,
      this.member.nama_customer = '',
      this.member.id_hewan = 0,
      this.member.nama_hewan = '',
      this.member.jenis = ''
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
    async addNewPenjualan() {
      let penjualan = new FormData()

      if (this.member.id_hewan != 0) {
        penjualan.append("id_hewan", this.member.id_hewan)
      }
      penjualan.append("id_cs", this.$session.get('pegawai').id_pegawai)

      var uri = this.$api_baseUrl + "transaksi/produk";

      try {
        await this.$http.post(uri, penjualan)
      } catch (e) {
        this.errors = e
      }
    },
    async addNewDetail(produk, noTransaksi) {
      let dataProduk = new FormData()

      dataProduk.append("nomor_transaksi", noTransaksi)
      dataProduk.append("id_produk", produk.id_produk)
      dataProduk.append("jumlah", produk.jumlah)
      dataProduk.append("subtotal", produk.subtotal)

      var uri = this.$api_baseUrl + "transaksi/detail_produk";

      try {
        await this.$http.post(uri, dataProduk)
      } catch (e) {
        this.errors = e
      }
    },
    async editTotalPenjualan(noTransaksi) {
      let dataProduk = {}
      dataProduk.total = this.tempTotal
      console.log(dataProduk)

      var uri = this.$api_baseUrl + "transaksi/produk/updateTotal/" + noTransaksi;
      try {
        await this.$http.put(uri, dataProduk, this.config)
      } catch (e) {
        this.errors = e
      }
    },
    async getNoTransaksi() {
      let asyncPenjualan = await this.$http.get(this.$api_baseUrl + "transaksi/produk")
      let penjualan = asyncPenjualan.data.value
      let panjangArray = penjualan.length

      return penjualan[panjangArray-1].nomor_transaksi
    },
    async beli() {
      this.isLoading = true // Biar dia loading dulu

      await this.addNewPenjualan()

      let noTransaksi = await this.getNoTransaksi()

      this.tempBeli.forEach(item => {
        this.addNewDetail(item, noTransaksi)
      });

      await this.editTotalPenjualan(noTransaksi)

      this.isLoading = false // Biar berhenti loading  

      this.$buefy.dialog.confirm({
        title: 'Penjualan berhasil',
        message: 'Penjualan sudah tercatat!',
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
      
      this.tempBeli.forEach(e => {
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