import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Owner from './components/OwnerView.vue'
import Dashboard from './components/Dashboard.vue'

// Data Master
import Pegawai from './components/dataMaster/Pegawai.vue'
import formPegawai from './components/dataMaster/formPegawai.vue'
import Produk from './components/dataMaster/Produk.vue'
import formProduk from './components/dataMaster/formProduk.vue'

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/Owner',
        component: Owner,
        children: [
            // ===== DASHBOARD =====
            {
                name: 'Dashboard',
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
        ]
            
    }
]