<template>
  <div class="modal-card" style="height:500px">
      <header class="modal-card-head">
          <p class="modal-card-title">Pelanggan & Hewan</p>
      </header>
      <section class="modal-card-body">

        <b-field label="Pelanggan">
            <b-autocomplete
                v-model="cariPelanggan"
                icon="magnify"
                placeholder="Nama pelanggan"
                :open-on-focus="true"
                :data="filteredDataPelanggan"
                @select="option => {pelangganSelected = option.nama_customer; idPelanggan = option.id_customer}"
                field="nama_customer"
                clearable>
            </b-autocomplete>
        </b-field>

        <b-field label="Hewan">
          <b-select 
              icon="paw"
              :disabled="pelangganSelected == '' ? true : false"
              placeholder="Pilih hewan"
              v-model="hewanSelected">
                <option 
                    v-for="hewan in filteredDataHewan"
                    :key="hewan.id_hewan"
                    :value="hewan.id_hewan"
                >
                  {{ hewan.nama_hewan }} <span>({{ hewan.jenis }})</span>
                </option>
          </b-select>
        </b-field>

      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Batal</button>
          <button class="button is-primary">Konfirmasi</button>
      </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cariPelanggan: '',
        cariHewan: '',
        pelangganSelected: '',
        idPelanggan: 0,
        hewanSelected: '',
        dataPelanggan: [],
        dataHewan: [],
        isImageModalActive: false,
        isCardModalActive: false
      }
    },
    methods: {
      getDataPelanggan() {
        this.isLoading = true
        var uri = this.$api_baseUrl + "customer"

        this.$http.get(uri).then(response => {
          this.dataPelanggan = response.data.value
        })
        .catch(error => {
          this.errors = error
        })
      },
      getDataHewan() {
        this.isLoading = true
        var uri = this.$api_baseUrl + "hewan"

        this.$http.get(uri).then(response => {
          this.dataHewan = response.data.value
        })
        .catch(error => {
          this.errors = error
        })
      },
      changeHewanSelected(e) {
        console.log(e)
        // console.log(nama_hewan)
        // console.log(jenis)
        // this.hewanSelected = nama_hewan + ' (' + jenis + ')'
      }
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
            .indexOf(this.pelangganSelected) >= 0
        })
      }
    },
    mounted() {
      this.getDataPelanggan()
      this.getDataHewan()
    },
  }
</script>
