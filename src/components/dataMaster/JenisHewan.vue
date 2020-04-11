<template>
  <section id="jenis-hewan">

    <b-table
      :data="datas"
      :columns="columns"
      :hoverable="true"
      :loading="isLoading" 
      :mobile-cards="true"
      paginated
      per-page="5"
      ref="table"
      detailed
      detail-key="id_jenis"
      :show-detail-icon="true"
      :opened-detailed="detailOpened"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">

        <b-table-column 
            field="id_jenis" 
            label="ID" 
            :searchable="true" 
            :visible="false"
            width="50px"
            centered
            sortable>
          {{ props.row.id_jenis }}
        </b-table-column>

        <b-table-column 
            field="jenis" 
            label="Jenis Hewan" 
            :searchable="true" 
            sortable>
          {{ props.row.jenis }}
        </b-table-column>

        
        <b-table-column label="Action">
          <span>
            <b-button 
                type="is-primary" 
                class="btn-action" 
                tag="router-link"
                :to="'/owner/form-jenis-hewan/' + props.row.id_jenis"
                rounded>
                  <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
            <b-button 
                type="is-danger" 
                class="btn-action" 
                @click="confirmDelete(props.row.id_jenis)" 
                rounded>
                  <b-icon icon="delete" size="is-small"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <div class="columns">
                <div class="column">
                  <p>
                    <strong>Created At : </strong>
                    <small>{{ props.row.created_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Updated At : </strong>
                    <small>{{ props.row.updated_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Deleted At : </strong>
                    <small>{{ props.row.deleted_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Edited By : </strong>
                    <small>{{ props.row.nama_pegawai }}</small>
                  </p>
                </div>
              </div>
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
            to="/owner/form-jenis-hewan" 
            @click="addData()"
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
      detailOpened: [], // Buat nampung index dari detail yang kebuka di tabel
      isLoading: true,
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "jenishewan"

      if (!this.$session.exists()) {
        this.$router.push('/login');
      }else{
        this.$http.get(uri).then(response => {
          this.datas = response.data.value
          this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
          this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
          this.isLoading = false
        })
        .catch(error => {
          this.errors = error
          this.tableLoadingIcon = "emoticon-sad"
            this.tableMessage = 'Tidak ada Data'
            this.isLoading = false
        })
      }
    },
    // getData() {
    //   this.isLoading = true
    //   var uri = this.$api_baseUrl + "jenishewan"

    //   this.$http.get(uri).then(response => {
    //     this.datas = response.data.value
    //     this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
    //     this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
    //     this.isLoading = false
    //   })
    //   .catch(error => {
    //     this.errors = error
    //     this.tableLoadingIcon = "emoticon-sad"
    //       this.tableMessage = 'Tidak ada Data'
    //       this.isLoading = false
    //   })
    // },
    deleteData(deleteId) {
      var uri = this.$api_baseUrl + "jenishewan/delete/" + deleteId;
      var pic = { pic: this.$session.get('pegawai').id_pegawai } // PIC ngambil dari id_pegawai yg ada di session
      
      this.$http.put(uri, pic).then(response => {
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
        title: 'Hapus Data Jenis Hewan',
        message: 'Apa anda yakin ingin <b>menghapus</b> jenis hewan ini?',
        confirmText: 'Hapus',
        cancelText: 'Batal',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    }
  },
  mounted() {
    // if (!this.$session.exists()) {
    //   this.$router.push('/login');
    // } else {
    //   this.activeUser = this.$session.get('pegawai')
      this.getData()
  //   }
  },
}
</script>


<style scoped>
.btn-action {
  margin-right: 10px;
}
</style>