<template>
  <div id="landing-page">

    <section id="header" class="hero is-fullheight">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item">
                  About us
                </a>
                <a class="navbar-item">
                  Review
                </a>
                <a class="navbar-item">
                  Services
                </a>
                <a class="navbar-item">
                  Products
                </a>
                <a class="navbar-item">
                  Find Us
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="slogan">
            <p class="title main-title has-text-white">
              We care for<br/>
              your furry little pets!
            </p>
          </div>
        </div>
      </div>
      
    </section>

    <section id="about-us" class="section is-medium">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="about-us-text-container">
              <p class="title section-title color-slate">
                Expert care for your furry, feathery, or scaley friend
              </p>
              <p class="subtitle color-slate">
                We know how stressful it is to leave your pets at home alone. We’re a team of experienced animal caregivers, well connected to local veterinarians. Trust to us to love them like our own, and to keep them safe and happy till you’re home.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="about-us-gambar-hewan">
              <img src="../assets/animal-1.webp" alt="">
              <img src="../assets/animal-2.webp" alt="">
              <img src="../assets/animal-3.webp" alt="">
              <img src="../assets/animal-4.webp" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="jualan" class="">
      <div class="columns is-gapless">
        <div class="column woman">
          <img src="../assets/woman.webp" alt="">
        </div>
        <div class="column beige">
          <div class="wrapper">
            <h5 class="title section-title color-slate">Services tailored to your needs</h5>
            <p class="subtitle color-slate">
              Schedule one-off or recurring home visits. An experienced member of our team will spend time with your pet, feed them, change cat litter trays, take the dog for a walk, and anything else you need.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="review" class="section is-medium">
      <div class="container">
        <p class="title section-title has-text-centered has-text-white">Pets (and their slaves) love us</p>
        <div class="review-wrapper">
          <Review
            v-for="review in Reviews"
            :key="review.name"
            :review="review"
          />
        </div>
      </div>
    </section>

    <section id="produk" class="section is-medium">
      <div class="container">
        <h2 class="title section-title has-text-centered color-slate">
          Affordable options,<br/>
          tailored to your needs
        </h2>

        <div class="ketersediaan-container">
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
              <b-select placeholder="Harga" icon="cash" @input="sortHarga">
                <option value="rendah">Rendah ke tinggi</option>
                <option value="tinggi">Tinggi ke rendah</option>
              </b-select>
            </b-field>

            <b-field>
              <b-select placeholder="Stok" icon="gift" @input="sortStok">
                <option value="sedikit">Sedikit ke banyak</option>
                <option value="banyak">Banyak ke sedikit</option>
              </b-select>
            </b-field>

          </b-field>

          <div class="produk-wrapper">
            <CardProduk
                v-for="produk in filteredProduk"
                :key="produk.nama_produk"
                :data="produk"
            />
          </div>
        </div>

      </div>
    </section>

    <footer id="footer" class="footer is-dark">
      <div class="container">
        <div class="columns">
          <div class="column">
            asdf
          </div>
          <div class="column">
            Follow Us
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
@import '../style.css';
</style>

<script>
import Review from './komponen-landing-page/CardReview.vue'
import CardProduk from './komponen-landing-page/CardProduk.vue'

export default {
  name: 'LoginForm',
  props: {
    msg: String
  },
  components: {
    Review,
    CardProduk,
  },
  data() {
    let Reviews = [
      { name: 'Lindsay M.', msg: '“Pawtastic is awesome! They are passionate about pets and employ trustworthy, dependable staff. We love them!”', image: 'lindsay' },
      { name: 'Andrew C.', msg: '“I’m a repeat customer because of their amazing care for our two cats when we travel. I can relax because I know they’re there!”', image: 'floof' },
      { name: 'Meg F.', msg: '“I use them for mid day walks and our babies are so happy with the exercise and love during the day. We see the difference!”', image: 'ginger' },
      { name: 'Jackie B.', msg: '“I just returned from two weeks away to a sociable, calm cat and no drama. Thanks for a great job, Pawtastic!”', image: 'ned' },
    ]

    return {
      Reviews,

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
    getProduk() {
      var uri = this.$api_baseUrl + "produk"

      this.$http.get(uri).then(response => {
        this.listProduk = response.data.value
      })
      .catch(error => {
        this.errors = error
      })
    },

    // ====================================================================
    // SORTING
    // ====================================================================
    sortHarga(e) {
      if (e === 'rendah') {
        this.listProduk.sort( (a, b) => parseInt(a.harga_jual) > parseInt(b.harga_jual) ? 1 : -1 )
      } else if (e === 'tinggi') {
        this.listProduk.sort( (a, b) => parseInt(a.harga_jual) < parseInt(b.harga_jual) ? 1 : -1 )
      }
    },
    sortStok(e) {
      if (e === 'sedikit') {
        this.listProduk.sort( (a, b) => parseInt(a.stok) > parseInt(b.stok) ? 1 : -1 )
      } else if (e === 'banyak') {
        this.listProduk.sort( (a, b) => parseInt(a.stok) < parseInt(b.stok) ? 1 : -1 )
      }
    },
  },
  computed: {
    filteredProduk() {
      return this.listProduk.filter((produk) => {
        return produk.nama_produk.toLowerCase().match(this.cariProduk.toLowerCase())
      })
    },
  },
  mounted() {
    this.getProduk()
  }
}
</script>