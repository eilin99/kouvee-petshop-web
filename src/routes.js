import LandingPage from './components/LandingPage.vue'
import Ketersediaan from './components/Ketersediaan.vue'
import Login from './components/Login.vue'
import Owner from './components/OwnerView.vue'
import Kasir from './components/KasirView.vue'
import CS from './components/CSView.vue'
import Dashboard from './components/Dashboard.vue'
import OwnerDashboard from './components/DashboardOwner.vue'

// Data Master
import Pegawai from './components/dataMaster/Pegawai.vue'
import formPegawai from './components/dataMaster/formPegawai.vue'
import Produk from './components/dataMaster/Produk.vue'
import formProduk from './components/dataMaster/formProduk.vue'
import Layanan from './components/dataMaster/Layanan.vue'
import formLayanan from './components/dataMaster/formLayanan.vue'
import JenisHewan from './components/dataMaster/JenisHewan.vue'
import formJenisHewan from './components/dataMaster/formJenisHewan.vue'
import Supplier from './components/dataMaster/Supplier.vue'
import formSupplier from './components/dataMaster/formSupplier.vue'
import UkuranHewan from './components/dataMaster/UkuranHewan.vue'
import formUkuranHewan from './components/dataMaster/formUkuranHewan.vue'

//Data Pembayaran
import TransaksiPembayaranProduk from './components/dataPembayaran/TransaksiPembayaranProduk.vue'
import formTransaksiPembayaranProduk from './components/dataPembayaran/formTransaksiPembayaranProduk.vue'
import TransaksiPembayaranLayanan from './components/dataPembayaran/TransaksiPembayaranLayanan.vue'
import formTransaksiPembayaranLayanan from './components/dataPembayaran/formTransaksiPembayaranLayanan.vue'
import DetailPenjualanProdukKasir from './components/dataPembayaran/DetailPenjualanProdukKasir.vue'
import DetailPenjualanLayananKasir from './components/dataPembayaran/DetailPenjualanLayananKasir.vue'

// CS
import Pelanggan from './components/dataMaster/Customer.vue'
import formPelanggan from './components/dataMaster/formCustomer.vue'
import Hewan from './components/dataMaster/Hewan.vue'
import formHewan from './components/dataMaster/formHewan.vue'

// Transaksi

import PenjualanProduk from './components/transaksi/penjualanProduk/PenjualanProduk.vue'
import DaftarPenjualanProduk from './components/transaksi/penjualanProduk/DaftarPenjualanProduk.vue'
import DetailPenjualanProduk from './components/transaksi/penjualanProduk/DetailPenjualanProduk.vue'
import PenjualanLayanan from './components/transaksi/penjualanLayanan/PenjualanLayanan.vue'
import DaftarPenjualanLayanan from './components/transaksi/penjualanLayanan/DaftarPenjualanLayanan.vue'
import DetailPenjualanLayanan from './components/transaksi/penjualanLayanan/DetailPenjualanLayanan.vue'

// Laporan
import SuratDanLaporan from './components/laporanOwner.vue'

export default [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/ketersediaan-produk-layanan',
        component: Ketersediaan
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
                component: OwnerDashboard
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
            // ===== LAYANAN =====
            {
                name: 'Layanan',
                path: '/owner/layanan',
                component: Layanan
            },
            {
                name: 'formLayanan',
                path: '/owner/form-layanan',
                component: formLayanan
            },
            {
                name: 'formEditLayanan',
                path: '/owner/form-layanan/:id',
                component: formLayanan
            },
            // ===== SUPPLIER =====
            {
                name: 'Supplier',
                path: '/owner/supplier',
                component: Supplier
            },
            {
                name: 'formSupplier',
                path: '/owner/form-supplier',
                component: formSupplier
            },
            {
                name: 'formEditSupplier',
                path: '/owner/form-supplier/:id',
                component: formSupplier
            },
            // ===== UKURAN HEWAN =====
            {
                name: 'UkuranHewan',
                path: '/owner/ukuran-hewan',
                component: UkuranHewan
            },
            {
                name: 'formUkuranHewan',
                path: '/owner/form-ukuran-hewan',
                component: formUkuranHewan
            },
            {
                name: 'formEditUkuranHewan',
                path: '/owner/form-ukuran-hewan/:id',
                component: formUkuranHewan
            },
            // ===== SURAT DAN LAPORAN =====
            {
                name: 'SuratDanLaporan',
                path: '/owner/surat-dan-laporan',
                component: SuratDanLaporan
            }
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
            // ===== TRANSAKSI PEMBAYARAN PRODUK =====
            {
                name: 'TransaksiPembayaranProduk',
                path: '/kasir/transaksi-pembayaran-produk',
                component: TransaksiPembayaranProduk
            },
            {
                name: 'formTransaksiPembayaranProduk',
                path: '/kasir/pembayaran-produk/:id',
                component: formTransaksiPembayaranProduk
            },
            {
                name: 'DetailPenjualanProdukKasir',
                path: '/kasir/detail-penjualan-produk/:id',
                component: DetailPenjualanProduk
            },
            {
                name: 'DetailPenjualanProdukKasir',
                path: '/kasir/detail-penjualan-produk-Kasir/:id',
                component: DetailPenjualanProdukKasir
            },

            // ===== TRANSAKSI PEMBAYARAN LAYANAN =====
            {
                name: 'TransaksiPembayaranLayanan',
                path: '/kasir/transaksi-pembayaran-layanan',
                component: TransaksiPembayaranLayanan
            },
            {
                name: 'formEditTransaksiPembayaranLayanan',
                path: '/kasir/pembayaran-Layanan/:id',
                component: formTransaksiPembayaranLayanan
            },
            {
                name: 'DetailPenjualanLayananKasir',
                path: '/kasir/detail-penjualan-layanan/:id',
                component: DetailPenjualanLayanan
            },
            {
                name: 'DetailPenjualanLayananKasir',
                path: '/kasir/detail-penjualan-layanan-Kasir/:id',
                component: DetailPenjualanLayananKasir
            },
            
        ]
            
    },
    // Routes untuk CS
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
            {
                name: 'Pelanggan',
                path: '/cs/pelanggan',
                component: Pelanggan
            },
            {
                name: 'formPelanggan',
                path: '/cs/form-pelanggan',
                component: formPelanggan
            },
            {
                name: 'formEditPelanggan',
                path: '/cs/form-pelanggan/:id',
                component: formPelanggan
            },
            // ===== HEWAN =====
            {
               name: 'Hewan',
               path: '/cs/hewan',
               component: Hewan
            },
            {
                name: 'formHewan',
                path: '/cs/form-hewan',
                component: formHewan
            },
            {
                name: 'formEditHewan',
                path: '/cs/form-hewan/:id',
                component: formHewan
            },
            // ===== PENJUALAN PRODUK =====
            {
                name: 'PenjualanProduk',
                path: '/cs/penjualan-produk',
                component: PenjualanProduk
            },
            {
                name: 'DaftarPenjualanProduk',
                path: '/cs/daftar-penjualan-produk',
                component: DaftarPenjualanProduk
            },
            {
                name: 'DetailPenjualanProduk',
                path: '/cs/detail-penjualan-produk/:id',
                component: DetailPenjualanProduk
            },
            // ===== PENJUALAN LAYANAN =====
            {
                name: 'PenjualanLayanan',
                path: '/cs/penjualan-layanan',
                component: PenjualanLayanan
            },
            {
                name: 'DaftarPenjualanLayanan',
                path: '/cs/daftar-penjualan-layanan',
                component: DaftarPenjualanLayanan
            },
            {
                name: 'DetailPenjualanLayanan',
                path: '/cs/detail-penjualan-layanan/:id',
                component: DetailPenjualanLayanan
            },
        ] 
    },
]