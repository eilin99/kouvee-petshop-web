<template>
  <div id="cs">

    <div class="columns is-fullheight">
      <div class="column is-2 has-background-grey-lighter">
        <div id="sidebar">
          <template>
            <b-menu class="is-sidebar-menu">
              <b-menu-list label="Menu">

                <!-- Dashboard -->
                <b-menu-item
                    icon="view-dashboard"
                    label="Dashboard"
                    tag="router-link"
                    to="/cs/dashboard"
                    :active="isActive"
                    @click="namaData = 'Dashboard'">
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
                        :to="dataMaster.to"
                        @click="namaData = dataMaster.title;">
                    </b-menu-item>
                </b-menu-item>

                <!-- Data Transaksi -->
                <b-menu-item
                    icon="cash-multiple">
                  <template slot="label" slot-scope="props">
                    Transaksi
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                  </template>
                    <b-menu-item
                        v-for="dataTransaksi in dataTransaksis"
                        :key="dataTransaksi.label"
                        :icon="dataTransaksi.icon"
                        :label="dataTransaksi.label"
                        tag="router-link"
                        :to="dataTransaksi.to">
                    </b-menu-item>

                </b-menu-item>

                <!-- Laporan-laporan -->
                <b-menu-item
                    icon="book">
                  <template slot="label" slot-scope="props">
                    Laporan
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                  </template>
                    <b-menu-item
                        v-for="laporan in laporans"
                        :key="laporan.label"
                        :icon="laporan.icon"
                        :label="laporan.label"
                        tag="router-link"
                        :to="laporan.to">
                    </b-menu-item>

                </b-menu-item>

              </b-menu-list>
              <b-menu-list>
                <b-menu-item
                  label="Landing Page"
                  icon="link"
                  tag="router-link"
                  target="_blank"
                  to="/expo">
                </b-menu-item>
              </b-menu-list>

              <!-- <b-menu-list label="Actions">
                <b-menu-item label="Logout"></b-menu-item>
              </b-menu-list> -->
            </b-menu>
          </template>
        </div>
      </div>

      <div class="column has-background-white-ter is-fullheight" style="overflow-y: scroll">
        <div id="navbar">
          <template>
            <b-navbar class="has-background-white-ter">
              <template slot="brand">
                <h1 class="title-nama-data title is-3">Customer Service</h1>
              </template>

              <template slot="end">

                <b-dropdown
                    v-model="activeUser"
                    position="is-bottom-left"
                    aria-role="menu">
                    <a
                        class="navbar-item"
                        slot="trigger"
                        role="button">
                        <span>Profile</span>
                        <b-icon icon="account"></b-icon>
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

                    <b-dropdown-item
                        value="logout"
                        aria-role="menuitem"
                        @click="logout">
                        <b-icon icon="settings"></b-icon>
                        Pengaturan
                    </b-dropdown-item>
                    
                    <b-dropdown-item
                        value="logout"
                        aria-role="menuitem"
                        @click="logout">
                        <b-icon icon="logout"></b-icon>
                        Keluar
                    </b-dropdown-item>
                </b-dropdown>                

                <!-- <b-navbar-item tag="div">
                  <a class="buttonis-danger"
                      tag="router-link"
                      to="/login">
                      Log out
                  </a>
                </b-navbar-item> -->
              </template>
            </b-navbar>
          </template>
        </div>
        <div id="content">
          <div class="box">
            <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nemo, soluta numquam doloribus id unde harum facere natus libero officiis, explicabo ipsam rem odio minima dolorem aperiam omnis ea vel.</p> -->
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
      { 'label': "Pelanggan", 'icon':"face", 'to':"/cs/pelanggan", 'title': "Data Pelanggan" },
      { 'label': "Hewan", 'icon':"paw", 'to':"/cs/hewan", 'title': "Data Hewan" },
    ]

    const dataTransaksis = [
      { 'label': "Penjualan Produk", 'icon':"cash", 'to':"/cs/penjualan-produk", 'title': "Penjualan Produk" },
      { 'label': "Penjualan Layanan", 'icon':"cash", 'to':"/cs/penjualan-layanan", 'title': "Penjualan Layanan" },
      { 'label': "Pengadaan Produk", 'icon':"truck", 'to':"/cs/pengadaan-produk", 'title': "Pengadaan Produk" },
    ]

    return {
      namaData: 'Data Pegawai',
      dataMasters,
      dataTransaksis,
      activeUser: Object,
      isActive: true
    }
  },
  methods: {
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
  mounted() {
    this.activeUser = this.$session.get('pegawai')
  }
}
</script>

<style scoped>
.is-fullheight.columns {
    height: calc(100vh - ( 0rem - .75rem ) );
    /* height: 100%; */
    /* overflow-y: scroll; */
}

.title-nama-data {
  margin: 20px 10px;
}

.is-sidebar-menu {
  margin: 10px 0 0 10px;
}

.profile-dropdown {
  width: 300px;
}
</style>