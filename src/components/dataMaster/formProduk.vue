<template>
  <section id="form-pegawai">
    <h4 class="title is-5">Tambah Data Produk</h4>
    <hr>
    <div class="columns">
      <div class="column is-8">
        <b-field label="Nama Produk" horizontal>
          <b-input v-model="namaProduk"></b-input>
        </b-field>

        <b-field label="Foto Produk" horizontal>
          <b-upload v-model="dropFile"
              drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                        icon="upload"
                        size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
          </b-upload>
        </b-field>

        <b-field label="Stok Minimal" horizontal>
          <b-numberinput controls-position="compact"
              controls-rounded>
          </b-numberinput>
        </b-field>

        <b-field label="Stok" horizontal>
          <b-numberinput controls-position="compact"
              controls-rounded>
          </b-numberinput>
        </b-field>

        <b-field label="Harga" expanded horizontal>
          <b-field>
            <b-select placeholder="Rp" disabled>
            </b-select>
            <b-input type="number" placeholder="0,00" expanded></b-input>
          </b-field>
        </b-field>

        <b-field label="Satuan" horizontal>
          <b-input v-model="satuan"></b-input>
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
          <b-button size="is-medium" class="btn-form is-dark" type="" tag="router-link" to="/admin/produk" rounded>
            Batal
          </b-button>
          <b-button size="is-medium" class="btn-form is-success" type="" tag="router-link" to="/admin/produk" rounded>
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
      name: 'John Silver'
    }
  }
}
</script>
