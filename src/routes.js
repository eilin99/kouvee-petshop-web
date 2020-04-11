import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Owner from './components/OwnerView.vue'
import Kasir from './components/KasirView.vue'
import CS from './components/CSView.vue'
import Dashboard from './components/Dashboard.vue'

// Data Master
import Pegawai from './components/dataMaster/Pegawai.vue'
import formPegawai from './components/dataMaster/formPegawai.vue'
import Produk from './components/dataMaster/Produk.vue'
import formProduk from './components/dataMaster/formProduk.vue'
import JenisHewan from './components/dataMaster/JenisHewan.vue'
import formJenisHewan from './components/dataMaster/formJenisHewan.vue'

// import Pelanggan from './components/dataMaster/Pelanggan.vue'
// import formPelanggan from './components/dataMaster/formPelanggan.vue'
// import Hewan from './components/dataMaster/Hewan.vue'
// import formHewan from './components/dataMaster/formHewan.vue'

// Transaksi
// ......

// Laporan
// ......

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/login',
        component: Login
    },
    // Routes untuk OWNER
    {
        path: '/Owner',
        component: Owner,
        children: [
            // ===== DASHBOARD =====
            {
                name: 'OwnerDashboard',
                path: '/owner/dashboard',
                component: Dashboard
            },
            // ===== PEGAWAI =====
            {
                name: 'Pegawai',
                path: '/owner/pegawai',
                component: Pegawai
            },
            {
                name: 'formPegawai',
                path: '/owner/form-pegawai',
                component: formPegawai
            },
            {
                name: 'formEditPegawai',
                path: '/owner/form-pegawai/:id',
                component: formPegawai
            },
            // ===== PRODUK =====
            {
                name: 'Produk',
                path: '/owner/produk',
                component: Produk
            },
            {
                name: 'formProduk',
                path: '/owner/form-produk',
                component: formProduk
            },
            {
                name: 'formEditProduk',
                path: '/owner/form-produk/:id',
                component: formProduk
            },
            // ===== JENIS HEWAN =====
            {
                name: 'JenisHewan',
                path: '/owner/jenis-hewan',
                component: JenisHewan
            },
            {
                name: 'formJenisHewan',
                path: '/owner/form-jenis-hewan',
                component: formJenisHewan
            },
            {
                name: 'formEditJenisHewan',
                path: '/owner/form-jenis-hewan/:id',
                component: formJenisHewan
            },
        ]
            
    },
    // Routes untuk KASIR
    {
        path: '/Kasir',
        component: Kasir,
        children: [
            // ===== DASHBOARD =====
            {
                name: 'KasirDashboard',
                path: '/kasir/dashboard',
                component: Dashboard
            },
            
        ]
            
    },
    {
        path: '/CS',
        component: CS,
        children: [
            // ===== DASHBOARD =====
            {
                name: 'CSDashboard',
                path: '/cs/dashboard',
                component: Dashboard
            },
            // ===== PELANGGAN =====
            // {
            //     name: 'Pelanggan',
            //     path: '/cs/pelanggan',
            //     component: Pelanggan
            // },
            // {
            //     name: 'formPelanggan',
            //     path: '/cs/form-pelanggan',
            //     component: formPelanggan
            // },
            // {
            //     name: 'formEditPelanggan',
            //     path: '/cs/form-pelanggan/:id',
            //     component: formPelanggan
            // },
            // ===== HEWAN =====
            // {
            //     name: 'Hewan',
            //     path: '/cs/hewan',
            //     component: Hewan
            // },
            // {
            //     name: 'formHewan',
            //     path: '/cs/form-hewan',
            //     component: formHewan
            // },
            // {
            //     name: 'formEditHewan',
            //     path: '/cs/form-hewan/:id',
            //     component: formHewan
            // },
        ]
            
    },
]