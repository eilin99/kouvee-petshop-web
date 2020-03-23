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
            class="file"
            label="Foto Produk" 
            :type="form.gambar.type"
            :message="form.gambar.message"
            horizontal>
              <b-upload v-model="form.gambar.value" @change="previewImage" accept="image/*">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Unggah gambar</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="form.gambar.value">
                {{ form.gambar.value.name }}
              </span>
              
        </b-field>
        <div class="image-preview" v-if="form.gambar.value.length > 0">
          <img class="preview" :src="form.gambar.value">
        </div>

        <b-field 
            label="Stok Minimum" 
            :type="form.stok_minimum.type"
            :message="form.stok_minimum.message"
            v-model="form.stok_minimum.value" 
            horizontal>
              <b-numberinput 
                  min="0" 
                  v-model="form.stok_minimum.value" 
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
                  min="0" 
                  v-model="form.stok.value"
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

    <!-- Buat loading page waktu awal load sama submit data -->
    <b-loading 
        :is-full-page="true" 
        :active.sync="isLoading" 
        :can-cancel="false">
    </b-loading>
  
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      imageData: '',
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
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
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
      this.form.harga_beli.value = dataProduk.harga_beli
      this.form.stok.value = dataProduk.stok
      this.form.stok_minimum.value = dataProduk.stok_minimum
      this.form.gambar.value = dataProduk.gambar
    },
    addData() {
      this.isLoading = true // Biar dia loading dulu

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
        this.isLoading = false // Biar berhenti loading
        this.router.push( { name: 'Produk' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        this.snackbar(this.errors, 'is-danger')
      })
    },
    editData(editId) {
      this.isLoading = true // Biar dia loading dulu

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
        this.isLoading = false // Biar berhenti loading
        this.router.push( { name: 'Produk' } )
        this.snackbarMsg = response.message
        this.snackbar(this.snackbarMsg, 'is-success')
      })
      .catch(error => {
        this.errors = error;
        this.isLoading = false // Biar berhenti loading
        this.snackbar(this.errors, 'is-danger')
      })
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
  watch: {
    gambar: function(o) {
      var reader = new FileReader();
      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(o[0]);
      alert();
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.editId = this.$route.params.id
      this.actionTitle = 'Ubah'
      this.getData(this.editId)
    } else {
      this.actionTitle = 'Tambah'
    }
    this.isLoading = false // page udah ter-load dan berhenti loading
  }
}
</script>

<style scoped>
  .image-preview {
    margin-left: 112.7px;
    padding: 20px;
  }
  img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
  }

</style>