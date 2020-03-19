<template>
  <section id="pegawai">

    <b-table
      :data="isEmpty ? [] : data"
      hoverable="true"
      :loading="isLoading" 
      mobile-cards="true"
      paginated
      per-page="5"
      ref="table"
      detailed
      detail-key="id"
      @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.data.first_name}`)"
      :show-detail-icon="showDetailIcon"
      aria-previous-label="Previous page"
      aria-next-label="Next page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="first_name" label="First Name" sortable>
          {{ props.row.first_name }}
        </b-table-column>

        <b-table-column field="last_name" label="Last Name">
          {{ props.row.last_name }}
        </b-table-column>

        <b-table-column field="date" label="Date" centered>
          <span class="tag is-success">
            {{ new Date(props.row.date).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column label="Gender">
          <span>
            <b-icon pack="fas"
              :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
            </b-icon>
            {{ props.row.gender }}
          </span>
        </b-table-column>

        <b-table-column label="Action">
          <span>
            <b-button type="is-primary" class="btn-action" rounded>
              <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
            <b-button type="is-danger" class="btn-action" rounded>
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
          <p>Tidak ada Data</p>
        </div>
      </section>
    </template>

    <template slot="footer">
      <div class="has-text-centered">
        <b-button size="is-medium" type="is-light" icon-left="plus" tag="router-link" to="/admin/form-produk" expanded>
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
    const data = [
      { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
      { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
      { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
      { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
      { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' },
      { 'id': 1, 'first_name': 'GIlber', 'last_name': 'Aurel', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
      { 'id': 2, 'first_name': 'Miroku', 'last_name': 'Bone', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
      { 'id': 3, 'first_name': 'ahaha', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
      { 'id': 4, 'first_name': 'hahaha', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
      { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
    ]

    return {
      data,
      namaData: "Data Pegawai",
      showDetailIcon: true,
      isEmpty: false,
      isLoading: false
    }
  },
  methods: {

  }
}
</script>


<style scoped>
.btn-action {
  margin-right: 10px;
}
</style>