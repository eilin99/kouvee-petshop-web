<template>
  <section id="penjualan-layanan">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4 has-text-centered">Tambah Penjualan Layanan</h4>
      </div>
      <div class="level-right">
        <b-button 
            type="is-light has-text-primary"
            tag="router-link" 
            to="/cs/daftar-penjualan-layanan">
              Daftar Penjualan Layanan
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
                placeholder="Cari layanan"
                :open-on-focus="true">
            </b-input>
          </b-field>
        </div>

        <div class="daftar-layanan">
          <CardPenjualanLayanan
            v-for="data in filteredLayanan"
            :key="data.nama_layanan"
            :data="data"
            :tambahLayanan="tambahLayanan"
            :kurangiLayanan="kurangiLayanan"
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
                default-sort="tempBeli.nama_layanan"
                :checked-rows.sync="checkedRows"
                hoverable>

                <template slot-scope="props">

                  <b-table-column field="nama_layanan" label="Layanan"  width="190px" sortable>
                    <p style="font-size: 1.15em"><b>{{ props.row.nama_layanan }}<br/></b></p>
                  </b-table-column>

                  <b-table-column field="ukuran" label="Ukuran" width="100px centered" sortable>
                    {{ props.row.ukuran }}
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
                      <p>Belum ada layanan terpilih</p>
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
.daftar-layanan {
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
import CardPenjualanLayanan from "../CardPenjualanLayanan.vue"
import ModalAddMember from "../ModalAddCustomerDanHewan.vue"

export default {
  components: {
    CardPenjualanLayanan,
    ModalAddMember
  },
  data() {
    return {
      isComponentModalActive: false,
      isLoading: true,
      cari:'', // Penampung string cari
      tempBeli: [], // Temp layanan yg mau dibeli
      datas: [], // data layanan yg tersedia
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
    // Buat list layanan yang mau dibeli
    // --------------------
    tambahLayanan(layanan) {
      if (this.tempBeli.length === 0) {
        layanan.jumlah = 1
        layanan.subtotal = layanan.harga
        this.tempBeli.push(layanan)
      } else {
        if(this.cekLayananExistDaftarBeli(layanan)) {
          this.snackbar('Layanan sudah dipilih', "is-info")
        } else {
          layanan.jumlah = 1
          layanan.subtotal = layanan.harga
          this.tempBeli.push(layanan)
        }
      }
    },
    cekLayananExistDaftarBeli(layanan) {
      for(let i=0; i<this.tempBeli.length; i++) {
        if(this.tempBeli[i].id_layanan == layanan.id_layanan)
          return true
      }
      return false
    },
    kurangiLayanan(id_layanan) {
      this.tempBeli = this.tempBeli.filter(p => p.id_layanan != id_layanan)
    },
    updateSubtotal(item) {
      item.subtotal = item.jumlah * item.harga
    },
    cancelMember() {
      this.member.id_customer = 0,
      this.member.nama_customer = '',
      this.member.id_hewan = 0,
      this.member.nama_hewan = '',
      this.member.jenis = ''
    },
    getLayanan() {
      var uri = this.$api_baseUrl + "layanan"

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

      var uri = this.$api_baseUrl + "transaksi/layanan";

      try {
        await this.$http.post(uri, penjualan)
      } catch (e) {
        this.errors = e
      }
    },
    async addNewDetail(layanan, noTransaksi) {
      let dataLayanan = new FormData()

      dataLayanan.append("nomor_transaksi", noTransaksi)
      dataLayanan.append("id_layanan", layanan.id_layanan)
      dataLayanan.append("jumlah", layanan.jumlah)
      dataLayanan.append("subtotal", layanan.subtotal)

      var uri = this.$api_baseUrl + "transaksi/detail_layanan";

      try {
        await this.$http.post(uri, dataLayanan)
      } catch (e) {
        this.errors = e
      }
    },
    async editTotalPenjualan(noTransaksi) {
      let dataLayanan = {}
      dataLayanan.total = this.tempTotal
      console.log(dataLayanan)

      var uri = this.$api_baseUrl + "transaksi/layanan/updateTotal/" + noTransaksi;
      try {
        await this.$http.put(uri, dataLayanan, this.config)
      } catch (e) {
        this.errors = e
      }
    },
    async getNoTransaksi() {
      let asyncPenjualan = await this.$http.get(this.$api_baseUrl + "transaksi/layanan")
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
    filteredLayanan() {
      return this.datas.filter((data) => {
        return data.nama_layanan.toLowerCase().match(this.cari.toLowerCase())
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
    this.getLayanan()
    this.isLoading = false // page udah ter-load dan berhenti loading
  }
}
</script>