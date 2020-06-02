<template>
  <div id="ketersediaan">

    <section id="header" class="section is-small">
      <div class="container">
        <h2 class="title section-title has-text-right has-text-white">
          Produk dan Layanan
          <br/>
          <b-button
              class="btn-kembali subtitle is-6 paragraph"
              tag="a"
              href="/">
                <b-icon icon="arrow-left" size="is-small"></b-icon>
                Kembali
          </b-button>
        </h2>
      </div>
    </section>

    <section class="section is-medium">
      <div class="container">

        <b-tabs position="is-centered" class="block" type="is-toggle-rounded">
          <b-tab-item>
            <template slot="header">
              <b-icon icon="cart"></b-icon>
              <span>Produk</span>
            </template>

            <!-- Data Produk -->
            <div class="ketersediaan-container">
              <h3 class="title section-title color-slate has-text-centered">Produk</h3>
              
              <b-field grouped>
                
                <b-field expanded>
                  <b-input
                      v-model="cariProduk"
                      icon="magnify"
                      clearable
                      rounded
                      placeholder="Cari produk"
                      :open-on-focus="true">
                  </b-input>
                </b-field>

                <b-field>
                  <b-select placeholder="Harga" icon="coin" @input="sortHargaProduk">
                    <option value="rendah">Rendah ke tinggi</option>
                    <option value="tinggi">Tinggi ke rendah</option>
                  </b-select>
                </b-field>

                <b-field>
                  <b-select placeholder="Stok" icon="cart" @input="sortStokProduk">
                    <option value="sedikit">Sedikit ke banyak</option>
                    <option value="banyak">Banyak ke sedikit</option>
                  </b-select>
                </b-field>

              </b-field>

              <div class="produk-wrapper">
                <CardProduk
                    v-for="produk in filteredProduk"
                    :key="produk.id_produk"
                    :data="produk"
                />
              </div>
            </div>
            
          </b-tab-item>
          <b-tab-item>
            <template slot="header">
              <b-icon icon="wrench"></b-icon>
              <span>Layanan</span>
            </template>

            <!-- Data Layanan -->
            <div class="ketersediaan-container">
              <h3 class="title section-title color-slate has-text-centered">Layanan</h3>

              <b-field grouped>
                
                <b-field expanded>
                  <b-input
                      v-model="cariLayanan"
                      icon="magnify"
                      clearable
                      rounded
                      placeholder="Cari Layanan"
                      :open-on-focus="true">
                  </b-input>
                </b-field>

                <b-field>
                  <b-select placeholder="Harga" icon="cash" @input="sortHargaLayanan">
                    <option value="rendah">Rendah ke tinggi</option>
                    <option value="tinggi">Tinggi ke rendah</option>
                  </b-select>
                </b-field>

              </b-field>

              <div class="produk-wrapper">
                <CardLayanan
                    v-for="layanan in filteredLayanan"
                    :key="layanan.id_layanan"
                    :data="layanan"
                />
              </div>
            </div>
          </b-tab-item>
        </b-tabs>

      </div>
    </section>

    <footer id="footer" class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h2 class="title is-4 section-title has-text-white">
              Kunjungi kami
            </h2>
            <a href="https://maps.google.com/maps?q=universitas%20atma%20jaya%20yog&t=&z=13&ie=UTF8&iwloc=&output=embed" class="subtitle paragraph has-text-white">
              <b-icon icon="store"></b-icon>
              Jl. Babarsari No.43, Janti, Sleman, DIY 
            </a>
            <p class="subtitle paragraph has-text-white" style="margin-top: 20px">
              <b-icon icon="clock"></b-icon>
              Senin-Minggu (09.00 - 20.00)
            </p>
          </div>
          <div class="column has-text-centered">
            <h2 class="title is-4 section-title has-text-white has-text-centered">
              Hubungi kami
            </h2>
            <div>
              <p class="subtitle paragraph has-text-white">
                <b-icon icon="phone"></b-icon>
                0274-123456
              </p>
              <p class="subtitle paragraph has-text-white">
                <b-icon icon="phone"></b-icon>
                089123456789
              </p>
            </div>
          </div>
          <div class="column has-text-right">
            <h2 class="title is-4 section-title has-text-white has-text-right">
              Follow kami
            </h2>
            <div class="socmed-wrapper">
              <a>
                <b-icon class="socmed has-text-white" icon="instagram" size="is-medium"></b-icon>
              </a>
              <a>
                <b-icon class="socmed has-text-white" icon="facebook" size="is-medium"></b-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="made-with-love">
      <p class="subtitle is-6 paragraph has-text-centered has-text-grey-lighter">
        Made with 💖 Kelompok 1 P3L Kelas C 2020
      </p>
    </div>

    <b-loading
        :is-full-page="true"
        :active.sync="isLoading">
          <b-icon
              pack="fas"
              icon="loading"
              size="is-large"
              custom-class="fa-spin">
          </b-icon>
    </b-loading>

  </div>
</template>

<style scoped>
@import '../style.css';

.btn-kembali {
  border: none !important;
  background: none !important;
  color: #fff;
  font-size: 23px;
  padding: 0;
  opacity: 0.5;
  transition: 0.3s;
  font-weight: bolder;
}
.btn-kembali:hover {
  opacity: 1;
}
</style>

<script>
import CardProduk from './komponen-landing-page/CardProduk.vue'
import CardLayanan from './komponen-landing-page/CardLayanan.vue'

export default {
  name: 'Ketersediaan',
  components: {
    CardProduk,
    CardLayanan,
  },
  data() {
    return {
      isLoading: true,
      count: 1,
      // data
      cariProduk: '',
      cariLayanan: '',
      listProduk: [],
      listLayanan: [],
    }
  },
  methods: {
    // ====================================================================
    // GET
    // ====================================================================
    async getProduk() {
      var uri = this.$api_baseUrl + "produk"

      await this.$http.get(uri).then(response => {
        this.listProduk = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },
    async getLayanan() {
      var uri = this.$api_baseUrl + "layanan"

      await this.$http.get(uri).then(response => {
        this.listLayanan = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // ====================================================================
    // SORTING
    // ====================================================================
    sortHargaProduk(e) {
      if (e === 'rendah') {
        this.listProduk.sort( (a, b) => parseInt(a.harga_jual) > parseInt(b.harga_jual) ? 1 : -1 )
      } else if (e === 'tinggi') {
        this.listProduk.sort( (a, b) => parseInt(a.harga_jual) < parseInt(b.harga_jual) ? 1 : -1 )
      }
    },
    sortStokProduk(e) {
      if (e === 'sedikit') {
        this.listProduk.sort( (a, b) => parseInt(a.stok) > parseInt(b.stok) ? 1 : -1 )
      } else if (e === 'banyak') {
        this.listProduk.sort( (a, b) => parseInt(a.stok) < parseInt(b.stok) ? 1 : -1 )
      }
    },

    // layanan
    sortHargaLayanan(e) {
      if (e === 'rendah') {
        this.listLayanan.sort( (a, b) => parseInt(a.harga) > parseInt(b.harga) ? 1 : -1 )
      } else if (e === 'tinggi') {
        this.listLayanan.sort( (a, b) => parseInt(a.harga) < parseInt(b.harga) ? 1 : -1 )
      }
    },
  },
  computed: {
    filteredProduk() {
      return this.listProduk.filter((produk) => {
        return produk.nama_produk.toLowerCase().match(this.cariProduk.toLowerCase())
      })
    },
    filteredLayanan() {
      return this.listLayanan.filter((layanan) => {
        return layanan.nama_layanan.toLowerCase().match(this.cariLayanan.toLowerCase())
      })
    },
  },
  async mounted() {
    this.isLoading = true
    await this.getProduk()
    await this.getLayanan()
    this.isLoading = false
    setTimeout(() => {
      this.count++;
    }, 3 * 1000)
  }
}
</script>