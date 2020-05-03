<template>
  <div class="modal-card" style="height:500px">
      <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
      </header>
      <section class="modal-card-body">

        <b-field
            label="Pelanggan"
            :message="formMember.nama_customer.message"
            :type="formMember.nama_customer.type">
            <b-autocomplete
                v-model="cariPelanggan"
                icon="magnify"
                placeholder="Nama pelanggan"
                :value="member.nama_customer"
                :open-on-focus="true"
                :data="filteredDataPelanggan"
                @select="option => {memberTemp.nama_customer = option.nama_customer; memberTemp.id_customer = option.id_customer}"
                @input="clearError(formMember.nama_customer)"
                field="nama_customer"
                clearable>
            </b-autocomplete>
        </b-field>

        <b-field
            label="Hewan"
            :message="formMember.hewan.message"
            :type="formMember.hewan.type">
          <b-select 
              icon="paw"
              :disabled="memberTemp.nama_customer == '' ? true : false"
              placeholder="Pilih hewan"
              v-model="memberTemp.id_hewan"
              :value="member.nama_hewan"
              @input="clearError(formMember.hewan)">
                <option 
                    v-for="hewan in filteredDataHewan"
                    :key="hewan.id_hewan"
                    :value="hewan.id_hewan"
                    @click="memberTemp.nama_hewan = hewan.nama_hewan; memberTemp.jenis = hewan.jenis;"
                >
                  {{ hewan.nama_hewan }} <span>({{ hewan.jenis }})</span>
                </option>
          </b-select>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <div class="footer-modal">
          <div class="btn-right">
            <button class="button" type="button" @click="$parent.close()">Batal</button>
            <button class="button is-primary" @click="submit">Simpan</button>
          </div>
        </div>
      </footer>
  </div>
</template>

<style scoped>
.footer-modal {
  height: 35px;
  position: relative;
}
.btn-right {
  width: 180px;
  position: absolute;
  left: 420px;
}
</style>

<script>
  export default {
    props: {
      member: {
        type: Object
      },
      tujuanModal: {
        type: String
      },
    },
    data() {
      return {
        modalTitle: '',
        cariPelanggan: '',
        cariHewan: '',
        memberTemp: { // temp buat nampung membernya
          id_customer: 0,
          nama_customer: '',
          id_hewan: 0,
          nama_hewan: '',
          jenis: '',
        },
        dataPelanggan: [],
        dataHewan: [],
        formMember: {
          nama_customer: { message: '', type: '' },
          hewan: { message: '', type: '' },
        },
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
      cekMember() {
        let count = 0

        if (this.memberTemp.id_customer == 0 ||
            this.memberTemp.nama_customer == '') {
              count++
              this.formMember.nama_customer.message = 'Member belum terpilih dengan benar'
              this.formMember.nama_customer.type = 'is-danger'
        }
        if (this.memberTemp.id_hewan == 0 ||
            this.memberTemp.nama_hewan == '' ||
            this.memberTemp.jenis == '') {
              count++
              this.formMember.hewan.message = 'Hewan belum terpilih'
              this.formMember.hewan.type = 'is-danger'
        }
        return count
      },
      clearError(form) {
        form.type = ''
        form.message = '' 
      },
      submit() {
        if (this.cekMember() == 0) {
          this.tujuanModal == "tambah" ? this.$emit('konfirmasiMember', this.memberTemp) : this.editData()
          this.$parent.close()
        }
      },
      formEditHandler() {
        this.memberTemp.id_customer = this.member.id_customer
        this.cariPelanggan = this.member.nama_customer
        this.memberTemp.nama_customer = this.member.nama_customer
        this.memberTemp.id_hewan = this.member.id_hewan
        this.memberTemp.nama_hewan = this.member.nama_hewan
      },
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
            .indexOf(this.memberTemp.nama_customer) >= 0
        })
      }
    },
    mounted() {
      if (this.tujuanModal == "tambah") {
        this.modalTitle = "Pelanggan & Hewan"
      } else {
        this.modalTitle = "Ubah Data Penjualan"
        this.formEditHandler()
      }
      this.getDataPelanggan()
      this.getDataHewan()
    },
  }
</script>
