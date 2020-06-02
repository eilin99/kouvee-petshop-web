<template>
  <div id="owner">

    <div class="columns is-fullheight">
      <div class="column is-2 has-background-grey-lighter">
        <div id="sidebar">
          
            <b-menu class="is-sidebar-menu">
              <b-menu-list label="Menu">

                <!-- Dashboard -->
                <b-menu-item
                    icon="view-dashboard"
                    label="Dashboard"
                    tag="router-link"
                    to="/owner/dashboard"
                    :active="isActive"
                    @focus="console.log('haiii')">
                </b-menu-item>

                <!-- Data Master -->
                <b-menu-item
                    icon="database">
                  <template slot="label" slot-scope="props">
                    Data Master
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                  </template>
                    <b-menu-item 
                        v-for="dataMaster in dataMasters"
                        :key="dataMaster.label"
                        :icon="dataMaster.icon" 
                        :label="dataMaster.label"
                        tag="router-link"
                        :to="dataMaster.to">
                    </b-menu-item>
                </b-menu-item>

                <!-- Laporan-laporan -->
                <b-menu-item
                    icon="book"
                    tag="router-link"
                    to="surat-dan-laporan">
                      <template slot="label">
                        Laporan
                        <b-icon
                            class="is-pulled-right">
                        </b-icon>
                      </template>
                </b-menu-item>

              </b-menu-list>

            </b-menu>
        </div>
      </div>

      <div class="column has-background-white-ter is-fullheight" style="overflow-y: scroll">
        <div id="navbar">
            <b-navbar class="has-background-white-ter">
              <template slot="brand">
                <h1 class="title title-atas title is-3">Owner</h1>
              </template>

              <template slot="end">
                <b-dropdown
                  aria-role="list"
                  position="is-bottom-left"
                >
                  <a
                    class="navbar-item"
                    slot="trigger"
                    role="button">
                    <!-- <span>Notifikasi</span> -->
                    <b-icon :type="warnaNotifikasi" icon="bell"></b-icon>
                  </a>

                  <b-dropdown-item custom aria-role="menuitem">
                    <p class="title is-6">
                      <b>{{ pesanNotifikasi }}</b>
                    </p>
                  </b-dropdown-item>

                  <hr class="dropdown-divider">

                  <b-dropdown-item 
                    v-for="(notifikasi, index) in datas"
                    :key="index"
                    :value="notifikasi" aria-role="listitem">
                    <div class="media">
                      <!-- <b-icon class="media-left" :icon="menu.icon"></b-icon> -->
                      <div class="media-content">
                        <h3>{{notifikasi.nama_produk}} ({{notifikasi.stok}} {{notifikasi.satuan}})</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>

                <b-dropdown
                    v-model="activeUser"
                    position="is-bottom-left"
                    aria-role="menu">
                    <a
                        class="navbar-item"
                        slot="trigger"
                        role="button">
                        <b-icon icon="account"></b-icon>
                        <span>Profile</span>
                    </a>

                    <b-dropdown-item custom aria-role="menuitem">
                      Halo, <b>{{ activeUser.username }}</b>
                      <br/>
                      <i>{{ activeUser.nama_pegawai }}</i>
                    </b-dropdown-item>

                    <hr class="dropdown-divider">
                    
                    <b-dropdown-item custom aria-role="menuitem">
                      <b-icon icon="worker"></b-icon>
                      {{ activeUser.jabatan }}
                    </b-dropdown-item>
                    <b-dropdown-item custom aria-role="menuitem">
                      <b-icon icon="home"></b-icon>
                      {{ activeUser.alamat }}
                    </b-dropdown-item>
                    <b-dropdown-item custom aria-role="menuitem">
                      <b-icon icon="phone"></b-icon>
                      {{ activeUser.no_telp }}
                    </b-dropdown-item>
                    <b-dropdown-item custom aria-role="menuitem">
                      <b-icon icon="calendar"></b-icon>
                      {{ activeUser.tgl_lahir }}
                    </b-dropdown-item>

                    <hr class="dropdown-divider" aria-role="menuitem">

                    <!-- <b-dropdown-item
                        value="logout"
                        aria-role="menuitem"
                        @click="ubahPassword">
                        <b-icon icon="settings"></b-icon>
                        Ubah password
                    </b-dropdown-item> -->
                    
                    <b-dropdown-item
                        value="logout"
                        aria-role="menuitem"
                        @click="logout">
                        <b-icon icon="logout"></b-icon>
                        Keluar
                    </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-navbar>
        </div>
        <div id="content">
          <div class="box">
            <router-view activeUser="activeUser" />
          </div>
        </div>

        <footer class="footer has-background-white-ter">
          <div class="content has-text-centered">
            <p class="has-text-grey-light">Made with ❤️ Kelompok 1 P3L C</p>
          </div>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    const dataMasters = [
      { 'label': "Produk", 'icon':"gift", 'to':"/owner/produk", 'title': "Data Produk" },
      { 'label': "Layanan", 'icon':"wrench", 'to':"/owner/layanan", 'title': "Data Layanan" },
      { 'label': "Pegawai", 'icon':"worker", 'to':"/owner/pegawai", 'title': "Data Pegawai" },
      { 'label': "Ukuran Hewan", 'icon':"file", 'to':"/owner/ukuran-hewan", 'title': "Data Ukuran Hewan" },
      { 'label': "Jenis Hewan", 'icon':"file", 'to':"/owner/jenis-hewan", 'title': "Data Jenis Hewan" },
      { 'label': "Supplier", 'icon':"truck", 'to':"/owner/supplier", 'title': "Data Supplier" },
    ]

    const dataTransaksis = [
      { 'label': "Penjualan Produk", 'icon':"cash", 'to':"/penjualan-produk", 'title': "Penjualan Produk" },
      { 'label': "Penjualan Layanan", 'icon':"cash", 'to':"/penjualan-layanan", 'title': "Penjualan Layanan" },
      { 'label': "Pengadaan Produk", 'icon':"truck", 'to':"/pengadaan-produk", 'title': "Pengadaan Produk" },
    ]

    return {
      datas: [],
      warnaNotifikasi: '',
      pesanNotifikasi: '',
      dataMasters,
      dataTransaksis,
      activeUser: Object,
      isActive: true,
      menuExpanded:false
    }
  },
  methods: {
    async getData() {
      var uri = this.$api_baseUrl + "produk"

      await this.$http.get(uri).then(response => {
        this.datas = response.data.value
        this.datas = this.datas.filter(produk => parseInt(produk.stok) < parseInt(produk.stok_minimum))
      })
      .catch(error => {
        this.errors = error
      })
    },
    logout() {
      this.$session.destroy()
      this.$router.push('/login')
    },
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  async mounted() {
    if (!this.$session.exists()) {
      this.$router.push('/login');
    } else {
      this.activeUser = this.$session.get('pegawai')
      await this.getData()
      if (this.datas.length > 0) {
        this.warnaNotifikasi = 'is-danger'
        this.pesanNotifikasi = 'Produk hampir habis'
      } else {
        this.warnaNotifikasi = ''
        this.pesanNotifikasi = 'Stok semua produk aman'
      }
    }
  }
}
</script>

<style scoped>
.is-fullheight.columns {
    height: calc(100vh - ( 0rem - .75rem ) );
    /* height: 100%; */
    /* overflow-y: scroll; */
}

.title-atas {
  margin: 20px 10px;
}

.is-sidebar-menu {
  margin: 10px 0 0 10px;
}

.profile-dropdown {
  width: 300px;
}
</style>