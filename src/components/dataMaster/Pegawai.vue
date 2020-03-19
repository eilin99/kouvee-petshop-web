<template>
  <section id="pegawai">

    <b-table
      :data="datas"
      hoverable="true"
      :loading="isLoading" 
      mobile-cards="true"
      paginated
      per-page="10"
      ref="table"
      detailed
      detail-key="id"
      :show-detail-icon="showDetailIcon"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">

        <b-table-column field="namaLengkap" label="Nama Lengkap" sortable>
          {{ props.row.nama_pegawai }}
        </b-table-column>

        <b-table-column field="alamat" label="Alamat">
          {{ props.row.alamat }}
        </b-table-column>

        <b-table-column field="tglLahir" label="Tgl Lahir" centered>
          <span class="tag is-success">
            {{ new Date(props.row.tgl_lahir).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="noTelp" label="No. Telp" centered>
          <span>
            {{ props.row.no_telp }}
          </span>
        </b-table-column>

        <b-table-column field="Jabatan" label="Jabatan" centered>
          <span>
            {{ props.row.jabatan }}
          </span>
        </b-table-column>

        <b-table-column label="Action">
          <span>
            <b-button 
                type="is-primary" 
                class="btn-action" 
                @click="editData(props.row.id_pegawai)" 
                to="/admin/form-pegawai"
                rounded>
                  <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
            <b-button 
                type="is-danger" 
                class="btn-action" 
                @click="deleteData(props.row.id_pegawai)" 
                rounded>
                  <b-icon icon="delete" size="is-small"></b-icon>
            </b-button>
          </span>
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="/static/img/placeholder-128x128.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ props.row.first_name }} {{ props.row.last_name }}</strong>
                <small>@{{ props.row.first_name }}</small>
                <small>31m</small>
                <br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
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
              icon="emoticon-sad"
              size="is-large">
            </b-icon>
          </p>
          <p>Belum ada Data</p>
        </div>
      </section>
    </template>

    <template slot="footer">
      <div class="has-text-centered">
        <b-button size="is-medium" 
            type="is-light" 
            icon-left="plus" 
            tag="router-link" 
            to="/admin/form-pegawai" 
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
      namaData: "Data Pegawai",
      showDetailIcon: true,
      isEmpty: false,
      isLoading: true,
      snackbarMsg: '',
    }
  },
  methods: {
    getData() {
      this.isLoading = true
      var uri = this.$api_baseUrl + "pegawai"

      this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.isLoading = false
      })
    },
    deleteData(deleteId) {
      var uri = this.$api_baseUrl + "pegawai/delete/" + deleteId;
      var pic = { pic: 1 }
      this.$http.put(uri, pic).then(response => {
        this.snackbarMsg = response.data.message
        this.getData();
        this.snackbar(this.snackbarMsg, 'is-success')
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