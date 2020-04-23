<template>
  <section id="penjualan-produk">
    <h4 class="title is-4">Penjualan Produk</h4>
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
                :paginated="true"
                :per-page="5"
                default-sort="tempBeli.nama_produk"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">

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
                        :max="props.row.stok">
                    </b-numberinput>
                  </b-table-column>

                  <b-table-column field="harga" label="Subtotal" width="100px centered" sortable>
                    Rp {{ props.row.harga_jual }}
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
            <div class="pembayaran">
              
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
                  <h4 class="title is-4">Rp 50000</h4>
                </div>
              </div>
              
              <b-button type="is-primary" expanded>Selesai</b-button>
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
.pembayaran {
  padding: 10px;
  width: 95%;
  border-radius: 7px;
  border: 2px solid #e0d4ff;
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
      tempBeli: [], // Temp produk yg mau dibeli
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
    tambahProduk(produk) {
      if (this.tempBeli.length === 0) {
        produk.jumlah = 1
        this.tempBeli.push(produk)
      } else {
        if(this.cekProdukExistDaftarBeli(produk) === true) {
          window.alert('dah ada')
        } else {
          produk.jumlah = 1
          this.tempBeli.push(produk)
        }
      }
    },
    cekProdukExistDaftarBeli(produk) {
      this.tempBeli.forEach(e => {
        if(e.id_produk == produk.id_produk) {
          console.log('ada')
          return true
        }
      })
      return false
    },
    kurangiProduk(id_produk) {
      this.tempBeli = this.tempBeli.filter(p => p.id_produk != id_produk)
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
    filteredProduk() {
      return this.datas.filter((data) => {
        return data.nama_produk.toLowerCase().match(this.cari.toLowerCase())
      })
    }
  },
  mounted() {
    this.isLoading = true
    this.getData()
    this.isLoading = false // page udah ter-load dan berhenti loading
  }
}
</script>