<template>
  <section id="form-produk">
    <h4 class="title is-5">{{ actionTitle}} Data Produk</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field 
            label="Nama Produk" 
            :type="form.nama_produk.type"
            :message="form.nama_produk.message"
            horizontal>
              <b-input v-model="form.nama_produk.value"></b-input>
        </b-field>

        <b-field 
            label="Satuan" 
            :type="form.satuan.type"
            :message="form.satuan.message"
            horizontal>
              <b-input v-model="form.satuan.value"></b-input>
        </b-field>

        <b-field 
            label="Foto Produk" 
            :type="form.gambar.type"
            :message="form.gambar.message"
            v-model="form.gambar.value"
            horizontal>
          <b-upload drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Seret gambar untuk mengunggah</p>
                </div>
              </section>
          </b-upload>
        </b-field>

        <b-field 
            label="Stok Minimum" 
            :type="form.stok_minimum.type"
            :message="form.stok_minimum.message"
            v-model="form.stok_minimum.value" 
            horizontal>
              <b-numberinput 
                  controls-position="compact"
                  controls-rounded>
              </b-numberinput>
        </b-field>

        <b-field 
            label="Stok" 
            :type="form.stok.type"
            :message="form.stok.message"
            v-model="form.stok.value"
            horizontal>
              <b-numberinput 
                  controls-position="compact"
                  controls-rounded>
              </b-numberinput>
        </b-field>

        <b-field 
            label="Harga Beli"
            :type="form.harga_beli.type"
            :message="form.harga_beli.message"
            expanded 
            horizontal
            numeric>
              <b-field>
                <b-select placeholder="Rp" disabled>
                </b-select>
                <b-input v-model="form.harga_beli.value" type="number" placeholder="0,00" expanded></b-input>
              </b-field>
        </b-field>

        <b-field 
            label="Harga Jual"
            :type="form.harga_jual.type"
            :message="form.harga_jual.message"
            expanded 
            horizontal
            numeric>
              <b-field>
                <b-select placeholder="Rp" disabled>
                </b-select>
                <b-input v-model="form.harga_jual.value" type="number" placeholder="0,00" expanded></b-input>
              </b-field>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles"
              :key="index"
              class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
          </span>
        </div>

        <div class="has-text-right">
          <b-button 
              size="is-medium" 
              class="btn-form" 
              type="is-dark" 
              tag="router-link" 
              to="/admin/produk" 
              rounded>
                Batal
          </b-button>
          <b-button 
              size="is-medium" 
              class="btn-form" 
              type="is-success" 
              @click="confirm()"
              rounded>
                Konfirmasi
          </b-button>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      actionTitle: '',
      editId: 0,
      dataProduk: new FormData(),
      editDataProduk: {},
      form: {
        nama_produk: { value: '', type: '', message: '' },
        satuan: { value: '', type: '', message: '' },
        harga_jual: { value: '', type: '', message: '' },
        harga_beli: { value: '', type: '', message: '' },
        stok: { value: '0', type: '', message: '' },
        stok_minimum: { value: '0', type: '', message: '' },
        gambar: { value: '', type: '', message: '' },
      },
      snackbarMsg: '',
    }
  },
  methods: {
    getData(editId) {
      var uri = this.$api_baseUrl + "produk/" + editId

      this.$http.get(uri).then(response => {
        this.editDataProduk = response.data.value
        this.formEditHandler(this.editDataProduk)
      })
    },
    formEditHandler(dataProduk) {

      this.form.nama_produk.value = dataProduk.nama_produk
      this.form.satuan.value = dataProduk.satuan
      this.form.harga_jual.value = dataProduk.harga_jual
      this.form.harga_beli.value = dataProduk.stok_minimum
      this.form.stok.value = dataProduk.stok
      this.form.stok_minimum.value = dataProduk.stok_minimum
      this.form.gambar.message = dataProduk.gambar
    },
    addData() {
      console.log('adding')
      this.dataProduk.append("nama_produk", this.form.nama_produk.value)
      this.dataProduk.append("satuan", this.form.satuan.value)
      this.dataProduk.append("harga_jual", this.form.harga_jual.value)
      this.dataProduk.append("harga_beli", this.form.harga_beli.value)
      this.dataProduk.append("stok", this.form.stok.value)
      this.dataProduk.append("stok_minimum", this.form.stok_minimum.value)
      this.dataProduk.append("gambar", this.form.gambar.value)
      this.dataProduk.append("pic", 1)
      
      var uri = this.$api_baseUrl + "produk";

      this.$http.post(uri, this.dataProduk).then(response => {
        this.router.push( { name: 'Produk' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.snackbar(this.errors, 'is-danger')
      });
    },
    editData(editId) {
      this.editDataProduk.nama_produk = this.form.nama_produk.value
      this.editDataProduk.satuan = this.form.satuan.value
      this.editDataProduk.harga_jual = this.form.harga_jual.value
      this.editDataProduk.harga_beli = this.form.harga_beli.value
      this.editDataProduk.stok = this.form.stok.value
      this.editDataProduk.stok_minimum = this.form.stok_minimum.value
      this.editDataProduk.gambar = this.form.gambar.value
      this.editDataProduk.pic = 3

      var uri = this.$api_baseUrl + "produk/" + editId;

      this.$http.post(uri, this.editDataProduk, this.config).then(response => {
        this.router.push( { name: 'Produk' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
      console.log(this.editDataProduk)

        this.errors = error;
        this.snackbar(this.errors, 'is-danger')
      });
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
  mounted() {
    if(this.$route.params.id) {
      this.editId = this.$route.params.id
      this.actionTitle = 'Ubah'
      this.getData(this.editId)
    } else {
      this.actionTitle = 'Tambah'
    }
  }
}
</script>
