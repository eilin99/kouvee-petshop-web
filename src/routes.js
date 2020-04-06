import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Admin from './components/Admin.vue'
import Dashboard from './components/Dashboard.vue'

// Data Master
import Pegawai from './components/dataMaster/Pegawai.vue'
import formPegawai from './components/dataMaster/formPegawai.vue'
import Produk from './components/dataMaster/Produk.vue'
import formProduk from './components/dataMaster/formProduk.vue'
import Layanan from './components/dataMaster/Layanan.vue'
import formLayanan from './components/dataMaster/formLayanan.vue'

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
        path: '/Admin',
        component: Admin,
        children: [
            // ===== DASHBOARD =====
            {
                name: 'Dashboard',
                path: '/admin/dashboard',
                component: Dashboard
            },
            // ===== PEGAWAI =====
            {
                name: 'Pegawai',
                path: '/admin/pegawai',
                component: Pegawai
            },
            {
                name: 'formPegawai',
                path: '/admin/form-pegawai',
                component: formPegawai
            },
            {
                name: 'formEditPegawai',
                path: '/admin/form-pegawai/:id',
                component: formPegawai
            },
            // ===== PRODUK =====
            {
                name: 'Produk',
                path: '/admin/produk',
                component: Produk
            },
            {
                name: 'formProduk',
                path: '/admin/form-produk',
                component: formProduk
            },
            {
                name: 'formEditProduk',
                path: '/admin/form-produk/:id',
                component: formProduk
            },
            // ===== LAYANAN =====
            {
                name: 'Layanan',
                path: '/admin/layanan',
                component: Layanan
            },
            {
                name: 'formLayanan',
                path: '/admin/form-layanan',
                component: formLayanan
            },
            {
                name: 'formEditLayanan',
                path: '/admin/form-layanan/:id',
                component: formLayanan
            }
        ]
            
    }
]