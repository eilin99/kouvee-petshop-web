<template>
  <section id="produk">

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
      detail-key="nama_produk"
      :show-detail-icon="true"
      :opened-detailed="detailOpened"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">

        <b-table-column 
            field="nama_produk" 
            label="Nama Produk" 
            :searchable="true" 
            sortable>
          {{ props.row.nama_produk }}
        </b-table-column>

        <b-table-column 
            field="satuan" 
            label="Satuan"
            width="50px"
            :searchable="true">
          {{ props.row.satuan }}
        </b-table-column>

        <b-table-column 
            field="stok_minimum" 
            label="Stok min."
            width="70px">
          {{ props.row.stok_minimum }}
        </b-table-column>

        <b-table-column 
            field="stok" 
            label="Stok"
            width="70px"
            sortable>
              <div v-if="parseInt(props.row.stok) < parseInt(props.row.stok_minimum)">
                <b-tag type="is-danger" size="is-medium" rounded>
                  {{ props.row.stok }}
                  </b-tag>
              </div>
              <div v-else>
                {{ props.row.stok }}
              </div>
        </b-table-column>

        <b-table-column 
            field="harga_beli" 
            label="Harga beli"
            sortable>
          {{ 'Rp.' + props.row.harga_beli }}
        </b-table-column>

        <b-table-column 
            field="harga_jual" 
            label="Harga jual"
            sortable>
          {{ 'Rp.' + props.row.harga_jual }}
        </b-table-column>

        <b-table-column label="Action">
          <span>
            <b-button 
                type="is-primary" 
                class="btn-action" 
                tag="router-link"
                :to="'/admin/form-produk/' + props.row.produk"
                rounded>
                  <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
            <b-button 
                type="is-danger" 
                class="btn-action" 
                @click="confirmDelete(props.row.id_produk)" 
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
                  <figure class="media-left">
                    <p class="image is-128x128">
                      <img :src="props.row.gambar">
                    </p>
                  </figure>
                </div>
                <div class="column">
                  <p>
                    <strong>Created At : </strong><br/>
                    <small>{{ props.row.created_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Updated At : </strong><br/>
                    <small>{{ props.row.created_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>Deleted At : </strong><br/>
                    <small>{{ props.row.deleted_at }}</small>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <strong>PIC : </strong><br/>
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
            to="/admin/form-produk" 
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
      datas: [ ],
      tableLoadingIcon: 'clock',
      tableMessage: 'Memuat Data',
      detailOpened: [],
      isLoading: true,
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.tableLoadingIcon = "emoticon-sad"            // Buat kalo user search
        this.tableMessage = 'Tidak ada data yang sesuai'  // Tapi ga ada data sesuai
        this.isLoading = false
        console.log(this.datas)
      })
      .catch(error => {
        this.errors = error
        this.tableLoadingIcon = "emoticon-sad"  // Tampilan kalo
        this.tableMessage = 'Tidak ada data'    // ga ada data
        this.isLoading = false
      })
    },
    deleteData(deleteId) {
      var uri = this.$api_baseUrl + "produk/delete/" + deleteId;
      var pic = { pic: 3 }
      this.$http.post(uri, pic).then(response => {
        this.getData();
        this.snackbarMsg = response
        this.snackbar('Data terhapus!', 'is-success')
      })
      .catch(error => {
        this.errors = error
        this.snackbarMsg = this.errors
        this.snackbar(this.snackbarMsg, 'is-danger')
        console.log('error : ' + this.errors)
      })
    },
    snackbar(message, type) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: message,
        type: type,
        position: 'is-bottom-left',
        actionText: 'OK',
        queue: false,
      })
    },
    confirmDelete(deleteId) {
      this.$buefy.dialog.confirm({
        title: 'Hapus Data Produk',
        message: 'Apa anda yakin ingin <b>menghapus</b> produk?',
        confirmText: 'Hapus',
        cancelText: 'Batal',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(deleteId)
      })
    }
  },
  mounted() {
    this.getData()
  },
}
</script>


<style scoped>
.btn-action {
  margin-right: 10px;
}
</style>