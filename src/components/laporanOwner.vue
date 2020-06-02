<template>
  <section id="dashboard">
    <h3 class="title is-3">
      Surat dan Laporan
    </h3>
    <hr>

    <!-- ============================================================== -->
    <!-- ======================== PENDAPATAN ========================== -->
    <!-- ============================================================== -->
    <div class="laporan-wrapper">
      <h4 class="title is-4">Pendapatan</h4>
        <!-- Bulanan -->
        <b-button
          type="is-dark"
          class="btn-laporan has-text-left"
          size="is-medium"
          icon-left="file"
          @click="openModal('laporan', 'pendapatan', 'bulanan')"
          outlined
        >
          Pendapatan Bulanan
        </b-button>
        <!-- Tahunan -->
        <b-button
          type="is-dark"
          class="btn-laporan has-text-left"
          size="is-medium"
          icon-left="file"
          @click="openModal('laporan', 'pendapatan', 'tahunan')"
          outlined
        >
          Pendapatan Tahunan
        </b-button>
        <!-- ... -->
    </div>

    <hr class="pembatas-laporan">
    
    <!-- ============================================================== -->
    <!-- ======================== PENGADAAN =========================== -->
    <!-- ============================================================== -->
    <div class="laporan-wrapper">
      <h4 class="title is-4">Pengadaan</h4>
      <!-- Bulanan -->
        <b-button
          type="is-dark"
          class="btn-laporan has-text-left"
          size="is-medium"
          icon-left="file"
          @click="openModal('laporan', 'pengadaan', 'bulanan')"
          outlined
        >
          Pengadaan Bulanan
        </b-button>
        <!-- Tahunan -->
        <b-button
          type="is-dark"
          class="btn-laporan has-text-left"
          size="is-medium"
          icon-left="file"
          @click="openModal('laporan', 'pengadaan', 'tahunan')"
          outlined
        >
          Pengadaan Tahunan
        </b-button>
        <!-- ... -->
    </div>

    <hr class="pembatas-laporan">
    <!-- ============================================================== -->
    <!-- ========================= TERLARIS =========================== -->
    <!-- ============================================================== -->
    <div class="laporan-wrapper">
      <h4 class="title is-4">Terlaris</h4>
    </div>






    <!-- ============================================================== -->
    <!-- =========================== MODAL ============================ -->
    <!-- ============================================================== -->

    <b-modal
      :active.sync="modalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
      :on-cancel="closeModal">
        <div class="modal-card" style="height:500px">
          <header class="modal-card-head">
            <p class="modal-card-title">Bulan dan Tahun</p>
          </header>
          <section class="modal-card-body">
            <p class="title is-5">Pilih tahun</p>

            <b-field
              label="Bulan"
              :message="form.bulan.message"
              :type="form.bulan.type"
            >
              <b-dropdown
                hoverable
                aria-role="list"
                max-height="100px"
                v-model="selectedBulan"
                @input="clearError(form.bulan)"
                scrollable
                :disabled="laporan.disableBulan">
                <button class="button is-light" type="button" slot="trigger">
                  <span>{{ selectedBulan.namaBulan }}</span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item
                  v-for="(bulan, index) in bulans"
                  :key="index"
                  aria-role="listitem"
                  :value="bulan"
                >
                  {{bulan.namaBulan}}
                </b-dropdown-item>
              </b-dropdown>
            </b-field>

            <b-field
              label="Tahun"
              :message="form.tahun.message"
              :type="form.tahun.type"
              @input="clearError(form.tahun)"
            >
              <b-dropdown
                hoverable
                aria-role="list"
                max-height="100px"
                v-model="selectedTahun"
                @input="clearError(form.tahun)"
                scrollable>
                <button class="button is-light" type="button" slot="trigger">
                  <span>{{ selectedTahun }}</span>
                  <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item
                  v-for="(thn, index) in tahun"
                  :key="index"
                  aria-role="listitem"
                  :value="thn"
                >
                  {{ thn }}
                </b-dropdown-item>
              </b-dropdown>
            </b-field>

          </section>
          <footer class="modal-card-foot">
            <div class="footer-modal">
              <div class="btn-right">
                <button class="button" type="button" @click="closeModal">Batal</button>
                <button
                  class="button is-info"
                  @click="openLaporan(laporan.jenis, laporan.tipe, laporan.rentang, 'show')">
                    Show
                </button>
                <button
                  class="button is-primary"
                  @click="openLaporan(laporan.jenis, laporan.tipe, laporan.rentang, 'print')">
                    Simpan
                </button>
              </div>
            </div>
          </footer>
      </div>
    </b-modal>

  </section>
</template>

<style scoped>
.btn-laporan {
  margin-right: 10px;
}
.footer-modal {
  height: 35px;
  position: relative;
}
.btn-right {
  width: 300px;
  position: absolute;
  left: 375px;
}
.pembatas-laporan {
  width: 60%;
  margin: 30px 0;
  border: 1px solid #bbbbbb;
}
</style>

<script>
export default {
  data() {
    let bulans = [
      { namaBulan: 'Januari', noBulan: '01' },
      { namaBulan: 'Februari', noBulan: '02' },
      { namaBulan: 'Maret', noBulan: '03' },
      { namaBulan: 'April', noBulan: '04' },
      { namaBulan: 'Mei', noBulan: '05' },
      { namaBulan: 'Juni', noBulan: '06' },
      { namaBulan: 'Juli', noBulan: '07' },
      { namaBulan: 'Agustus', noBulan: '08' },
      { namaBulan: 'September', noBulan: '09' },
      { namaBulan: 'Oktober', noBulan: '10' },
      { namaBulan: 'November', noBulan: '11' },
      { namaBulan: 'Desember', noBulan: '12' }
    ]

    let tempTahun = new Date()
    tempTahun = tempTahun.getFullYear()
    let tahun = []
    tahun.push(tempTahun)
    for (let i = 1; i < 10; i++) {
      tahun.push(tempTahun-i)      
    }

    return {
      modalActive: false,
      bulans,
      tahun,
      laporan: {
        jenis: '', // jenis itu bisa laporan pengadaan, laporan pendapatan, dll
        tipe: '', // jenis itu bisa laporan pengadaan, laporan pendapatan, dll
        rentang: '', // rentang itu bisa bulanan/tahunan
        action: '', // action itu bisa show atau print
        disableBulan: false, // ini TRUE kalo mau print laporan yg TAHUNAN
      },
      selectedBulan: { namaBulan: 'Pilih bulan', noBulan: 0 },
      selectedTahun: 'Pilih tahun',
      form: {
        bulan: { message: '', type: '' },
        tahun: { message: '', type: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    openModal(jenis, tipe, rentang) {
      // scroll ke data() utk lihat penjelasan data ini
      this.laporan.jenis = jenis
      this.laporan.tipe = tipe
      this.laporan.rentang = rentang
      this.laporan.disableBulan = rentang == 'tahunan' ? true : false
      this.modalActive = true
    },
    closeModal() {
      this.laporan = {}
      this.selectedTahun = 'Pilih tahun'
      this.selectedBulan.namaBulan = 'Pilih bulan'
      this.selectedBulan.noBulan = 0
      this.clearError(this.form.bulan)
      this.clearError(this.form.tahun)
      this.modalActive = false
    },
    openLaporan(jenis, tipe, rentang, action) {
      if (this.cekData() == 0) {
        let waktu = rentang == "bulanan" ? `${this.selectedBulan.noBulan}/${this.selectedTahun}` : this.selectedTahun
        
        let link = `http://tugasbesarkami.com/api/${jenis}/${tipe}/${rentang}/${action}/${waktu}`
        console.log(link)
        
        window.open(link)
        this.closeModal()
        this.modalActive = false
      }
    },
    cekData() {
      let count = 0
      if (!this.laporan.disableBulan && this.selectedBulan.noBulan == 0) {
        count++
        this.form.bulan.message = 'Bulan belum terpilih'
        this.form.bulan.type = 'is-danger'
      }

      if (this.selectedTahun == 'Pilih tahun') {
        count++
        this.form.tahun.message = 'Tahun belum terpilih'
        this.form.tahun.type = 'is-danger'
      }

      console.log(this.selectedTahun)

      return count
    },
    clearError(form) {
      form.type = ''
      form.message = '' 
    },


    snackbar(message, type) { // Snackbar buat ngasih tau http request berhasil apa nggak
      this.$buefy.snackbar.open({
        duration: 5000, // 5 detik
        message: message, // pesannya
        type: type, // tipe dapetnya dari parameter. Dia bisa 'is-danger' kalo gagal dan 'is-success' kalo berhasil
        position: 'is-bottom-left', // posisi munculnya
        actionText: 'OK',
        queue: false,
      })
    },
  },
  mounted() {
    
  },
}
</script>
