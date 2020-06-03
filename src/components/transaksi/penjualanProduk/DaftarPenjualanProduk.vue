<template>
  <section id="daftar-penjualan-produk">
    <h4 class="title is-4">Daftar Penjualan Produk</h4>
    <hr>

    <b-table
      :data="datas"
      :hoverable="true"
      :loading="isLoading" 
      :mobile-cards="true"
      paginated
      per-page="10"
      ref="table"
      detailed
      detail-key="nomor_transaksi"
      :show-detail-icon="true"
      :opened-detailed="detailOpened"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page"
      narrowed>

      <template slot-scope="props">

        <b-table-column  
            label="No." 
            width="50px"
            centered
            sortable>
          {{ props.index + 1 }}
        </b-table-column>

        <b-table-column 
            field="nomor_transaksi" 
            label="No. transaksi" 
            width="140px"
            :searchable="true" 
            sortable>
          {{ props.row.nomor_transaksi }}
        </b-table-column>

        <b-table-column 
            field="nama_customer" 
            label="Nama pelanggan"
            width="200px"
            :searchable="true">
          <p v-if="props.row.nama_customer == null">-</p>
          <p v-else>{{ props.row.nama_customer }}</p>
        </b-table-column>

        <b-table-column 
            field="nama_hewan" 
            label="Nama hewan"
            width="150px"
            :searchable="true">
          <p v-if="props.row.nama_hewan == null">-</p>
          <p v-else>{{ props.row.nama_hewan }}</p>
        </b-table-column>

        <b-table-column 
            field="tgl_penjualan" 
            label="Tanggal"
            width="125px"
            searchable
            sortable>
          {{ props.row.tgl_penjualan }}
        </b-table-column>

        <b-table-column 
            field="total" 
            label="Total">
          {{ 'Rp.' + props.row.total }}
        </b-table-column>

        <b-table-column 
            field="status_pembayaran" 
            label="Stat"
            width="50px">
            <p v-if="props.row.status_pembayaran == 'Lunas'">
              <b-icon size="is-medium" icon="check" type="is-success"></b-icon>
            </p>
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                tag="router-link"
                :to="'/cs/detail-penjualan-produk/' + props.row.nomor_transaksi"
                rounded>
                  <b-icon icon="note" type="is-primary"></b-icon>
            </b-button>
            <b-button 
                type="is-text"
                @click="openModalEdit(props.row)" 
                rounded
                :disabled="props.row.status_pembayaran == 'Lunas' ? true : false">
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id)" 
                rounded
                :disabled="props.row.status_pembayaran == 'Lunas' ? true : false">
                  <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>CS : </strong>
                <small>{{ props.row.customer_service }}</small>
              </p>
            </div>
          </div>
      </article>
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
    <b-modal
        :active.sync="modalEdit"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal>
          <div class="modal-card" style="height:500px">
            <header class="modal-card-head">
                <p class="modal-card-title">Pelanggan & Hewan</p>
            </header>
            <section class="modal-card-body">

              <b-field label="Guest">
                <b-switch v-model="isGuest"
                  true-value="Guest"
                  false-value="">
                  {{ isGuest }}
                </b-switch>
              </b-field>

              <b-field
                  label="Pelanggan"
                  :message="formMember.nama_customer.message"
                  :type="formMember.nama_customer.type">
                  <b-autocomplete
                      v-model="cariPelanggan"
                      icon="magnify"
                      placeholder="Nama pelanggan"
                      :value="formMember.nama_customer.value"
                      :open-on-focus="true"
                      :data="filteredDataPelanggan"
                      @select="option => {formMember.nama_customer.value = option.nama_customer; formMember.id_customer = option.id_customer}"
                      @input="clearError(formMember.nama_customer)"
                      field="nama_customer"
                      clearable
                      :disabled="isGuest == 'Guest' ? true : false">
                  </b-autocomplete>
              </b-field>

              <b-field
                  label="Hewan"
                  :message="formMember.nama_hewan.message"
                  :type="formMember.nama_hewan.type">
                <b-select 
                    icon="paw"
                    :disabled="formMember.nama_customer.value == '' || isGuest == 'Guest' ? true : false"
                    placeholder="Pilih hewan"
                    v-model="formMember.id_hewan"
                    :value="formMember.nama_hewan.value"
                    @input="clearError(formMember.nama_hewan)">
                      <option 
                          v-for="hewan in filteredDataHewan"
                          :key="hewan.id_hewan"
                          :value="hewan.id_hewan"
                          @click="formMember.nama_hewan.value = hewan.nama_hewan; formMember.jenis = hewan.jenis;"
                      >
                        {{ hewan.nama_hewan }} <span>({{ hewan.jenis }})</span>
                      </option>
                </b-select>
              </b-field>

            </section>
            <footer class="modal-card-foot">
              <div class="footer-modal">
                <div class="btn-right">
                  <button class="button" type="button" @click="modalEdit = false">Batal</button>
                  <button class="button is-primary" @click="editData">Simpan</button>
                </div>
              </div>
            </footer>
        </div>
    </b-modal>
  </section>
</template>

<style scoped>
.footer-modal {
  height: 35px;
  position: relative;
}
.btn-right {
  width: 180px;
  position: absolute;
  left: 450px;
}
</style>

<script>

export default {
  data() {
    return {
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      detailOpened: [],  // Buat nampung index dari detail yang kebuka di tabel
      isLoading: true,
      snackbarMsg: '',

      // Modal Edit Penjualan
      cariPelanggan: '',
      dataPelanggan: [],
      dataHewan: [],
      formMember: { // temp member buat kalo diedit
        id_customer: 0,
        nama_customer: { value: '', message: '', type: '' },
        id_hewan: 0,
        nama_hewan: { value: '', message: '', type: '' },
      },
      modalEdit: false,
      isGuest: '',
    }
  },
  methods: {
    // -----------------------------------------------------------
    // GET
    // -----------------------------------------------------------
    async getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/produk"

      await this.$http.get(uri).then(response => {
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
    async getDataPelanggan() {
      var uri = this.$api_baseUrl + "customer"

      await this.$http.get(uri).then(response => {
        this.dataPelanggan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
    async getDataHewan() {
      var uri = this.$api_baseUrl + "hewan"

      await this.$http.get(uri).then(response => {
        this.dataHewan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // -----------------------------------------------------------
    // DELETE
    // -----------------------------------------------------------
    async deleteData(deleteId) {
      await this.deletePenjualan(deleteId)
      await this.getData();
    },
    async deletePenjualan(deleteId) {
      var uri = this.$api_baseUrl + "transaksi/produk/delete/" + deleteId;
      var id_cs = { id_cs: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session
      
      await this.$http.put(uri, id_cs).then(response => {
        this.snackbarMsg = response
        this.snackbar('Data terhapus!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = "Terjadi kesalahan... Silahkan coba lagi"
        this.snackbar(this.snackbarMsg, 'is-danger')
      })
    },
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Hapus Data Produk',
        message: 'Apa anda yakin ingin <b>menghapus</b> transaksi?',
        confirmText: 'Hapus',
        cancelText: 'Batal',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    },

    // -----------------------------------------------------------
    // EDIT dan MODAL EDIT
    // -----------------------------------------------------------
    async editData() {
      if (this.isGuest == "Guest") {
        this.formMember.id_hewan = null
        await this.editPenjualan()
        this.modalEdit = false
        await this.getData()
      } else {
        if (this.cekMember() === 0) {
          await this.editPenjualan()
          this.modalEdit = false
          await this.getData()
        }
      }
    },
    async editPenjualan() {
      let dataEdit = {}
      dataEdit.id_hewan = this.formMember.id_hewan
      dataEdit.id_cs = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "transaksi/produk/" + this.formMember.id;
      
      await this.$http.put(uri, dataEdit, this.config).then(response => {
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
    },
    openModalEdit(penjualan) {
      this.formMember.id_penjualan = penjualan.id
      this.formMember.id_customer = penjualan.id_customer
      this.formMember.nama_customer.value = penjualan.nama_customer
      this.formMember.id_hewan = penjualan.id_hewan
      this.formMember.nama_hewan.value = penjualan.nama_hewan
      this.formMember.id = penjualan.id

      penjualan.nama_customer === null ? this.cariPelanggan = '' : this.cariPelanggan = penjualan.nama_customer

      this.modalEdit = true
    },
    cekMember() {
      let count = 0

      if (this.formMember.id_customer == 0 ||
          this.cariPelanggan == '') {
            count++
            this.formMember.nama_customer.message = 'Member belum terpilih dengan benar'
            this.formMember.nama_customer.type = 'is-danger'
      }
      if (this.formMember.id_hewan == 0 ||
          this.formMember.nama_hewan == '' ||
          this.formMember.jenis == '') {
            count++
            this.formMember.hewan.message = 'Hewan belum terpilih'
            this.formMember.hewan.type = 'is-danger'
      }
      return count
    },
    clearError(form) {
      form.type = ''
      form.message = '' 
    },

    // -----------------------------------------------------------
    // LAIN - LAIN
    // -----------------------------------------------------------
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
  computed: {
    filteredDataPelanggan() {
      return this.dataPelanggan.filter((pelanggan) => {
        return pelanggan.nama_customer
          .toLowerCase()
          .indexOf(this.cariPelanggan.toLowerCase()) >= 0
      })
    },
    filteredDataHewan() {
      return this.dataHewan.filter((hewan) => {
        return hewan.nama_customer
          .indexOf(this.formMember.nama_customer.value) >= 0
      })
    }
  },
  async mounted() {
    await this.getData()
    await this.getDataPelanggan()
    await this.getDataHewan()
  },
}
</script>