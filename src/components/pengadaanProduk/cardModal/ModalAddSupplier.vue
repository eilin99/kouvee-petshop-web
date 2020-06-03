<template>
  <div class="modal-card" style="height:500px">
      <header class="modal-card-head">
          <p class="modal-card-title">Supplier</p>
      </header>
      <section class="modal-card-body">

        <b-field
            label="Supplier"
            :message="formSupplier.nama_supplier.message"
            :type="formSupplier.nama_supplier.type">
            <b-autocomplete
                v-model="cariSupplier"
                icon="magnify"
                placeholder="Nama supplier"
                :value="supplier.nama_supplier"
                :open-on-focus="true"
                :data="filteredDataSupplier"
                @select="option => {supplierTemp.nama_supplier = option.nama_supplier; supplierTemp.id_supplier = option.id_supplier}"
                @input="clearError(formSupplier.nama_supplier)"
                field="nama_supplier"
                clearable>
            </b-autocomplete>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <div class="footer-modal">
          <div class="btn-right">
            <button class="button" type="button" @click="$parent.close()">Batal</button>
            <button class="button is-primary" @click="konfirmasiSupplier">Konfirmasi</button>
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
      supplier: {
        type: Object
      }
    },
    data() {
      return {
        cariSupplier: '',
        supplierTemp: { // temp kalo pelanggannya member
          id_supplier: 0,
          nama_supplier: '',
          },
        dataSupplier: [],
        formSupplier: {
          nama_supplier: { message: '', type: '' },
        },
      }
    },
    methods: {
      getDataSupplier() {
        this.isLoading = true
        var uri = this.$api_baseUrl + "supplier"

        this.$http.get(uri).then(response => {
          this.dataSupplier = response.data.value
        })
        .catch(error => {
          this.errors = error
        })
      },
      cekSupplier() {
        let count = 0

        if (this.supplierTemp.id_supplier == 0 ||
            this.supplierTemp.nama_supplier == '') {
              count++
              this.formSupplier.nama_supplier.message = 'Supplier belum terpilih dengan benar'
              this.formSupplier.nama_supplier.type = 'is-danger'
        }
        return count
      },
      clearError(form) {
        form.type = ''
        form.message = '' 
      },
      konfirmasiSupplier() {
        if (this.cekSupplier() == 0) {
          this.$emit('konfirmasiSupplier', this.supplierTemp)
          this.$parent.close()
        }
      }
    },
    computed: {
      filteredDataSupplier() {
        return this.dataSupplier.filter((supplier) => {
          return supplier.nama_supplier
            .toLowerCase()
            .indexOf(this.cariSupplier.toLowerCase()) >= 0
        })
      },
    },
    mounted() {
      this.getDataSupplier()
    },
  }
</script>
