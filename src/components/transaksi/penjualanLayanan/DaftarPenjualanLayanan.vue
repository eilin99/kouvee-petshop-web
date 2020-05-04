<template>
  <section id="daftar-penjualan-layanan">
    <h4 class="title is-4">Daftar Penjualan Layanan</h4>
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
            field="status_layanan" 
            label="Status Layanan"
            width="50px">
          <p v-if="props.row.status_layanan == null">-</p>
          <p v-else>{{ props.row.status_layanan }}</p>
        </b-table-column>

        <b-table-column label="Action" centered>
          <span>
            <b-button 
                type="is-text" 
                tag="router-link"
                :to="'/cs/detail-penjualan-layanan/' + props.row.nomor_transaksi"
                rounded>
                  <b-icon icon="note" type="is-primary"></b-icon>
            </b-button>
            <b-button 
                type="is-text"
                @click="openModalEdit(props.row)" 
                rounded
                :disabled="props.row.status_layanan == 'Lunas' ? true : false">
                  <b-icon icon="pencil" type="is-info"></b-icon>
            </b-button>
            <b-button 
                type="is-text"  
                @click="confirmDelete(props.row.id)" 
                rounded
                :disabled="props.row.status_layanan == 'Lunas' ? true : false">
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
            to="/cs/penjualan-layanan" 
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
      <ModalAddMember tujuanModal="edit" :member="member" @ubahData="member = $event"></ModalAddMember>
    </b-modal>
  </section>
</template>

<script>
import ModalAddMember from "../ModalAddCustomerDanHewan.vue"

export default {
  components: {
    ModalAddMember
  },
  data() {
    return {
      datas: [],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      detailOpened: [],  // Buat nampung index dari detail yang kebuka di tabel
      isLoading: true,
      snackbarMsg: '',
      member: { // temp member buat kalo diedit
        id_customer: 0,
        nama_customer: '',
        id_hewan: 0,
        nama_hewan: '',
      },
      modalEdit: false,
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "transaksi/layanan"

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
    deletePenjualan(deleteId) {
      var uri = this.$api_baseUrl + "transaksi/layanan/delete/" + deleteId;
      var id_cs = { id_cs: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session
      
      this.$http.put(uri, id_cs).then(response => {
        this.getData();
        this.snackbarMsg = response
        this.snackbar('Data terhapus!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = "Terjadi kesalahan... Silahkan coba lagi"
        this.snackbar(this.snackbarMsg, 'is-danger')
      })
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
    confirmDelete(deleteId) { // Buat ngeluarin modal box konfirmasi delete
      this.$buefy.dialog.confirm({
        title: 'Hapus Data Layanan',
        message: 'Apa anda yakin ingin <b>menghapus</b> transaksi?',
        confirmText: 'Hapus',
        cancelText: 'Batal',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deletePenjualan(deleteId)
      })
    },
    editData() {
      let dataEdit = {}
      dataEdit.id_hewan = this.memberTemp.id_hewan
      dataEdit.id_cs = this.$session.get('pegawai').id_pegawai

      var uri = this.$api_baseUrl + "transaksi/layanan/" + this.member.id;
      
      this.$http.put(uri, dataEdit, this.config).then(response => {
        this.getData()
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
      this.member.id_penjualan = penjualan.id
      this.member.id_customer = penjualan.id_customer
      this.member.nama_customer = penjualan.nama_customer
      this.member.id_hewan = penjualan.id_hewan
      this.member.nama_hewan = penjualan.nama_hewan
      this.member.status_layanan = penjualan.status_layanan
      this.member.id = penjualan.id

      this.modalEdit = true
    }
  },
  mounted() {
    this.getData()
  },
}
</script>