<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Transaksi</div>
              <div>Data Transakasi Pembelian dan Pemesanan Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
          :rows="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="judulFilm" :props="props">
                {{ props.row.dataMovie[0].judulFilm }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                  Belum Di Konfirmasi
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                  Sedang Dalam Pengiriman
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Sudah Diterima
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn :disable="props.row.status !== 2" label="Terima Barang" @click="confirm(props.row._id)" class="q-ml-sm" color="green" unelevated></q-btn>
              </q-td>
            </q-tr>
          </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'judulFilm', align: 'left', label: 'Judul Film', field: 'judulFilm', sortable: true },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah', sortable: true },
        { name: 'total', align: 'left', label: 'Total', field: 'total', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`order/getorderbyuser/${this.$q.localStorage.getItem('dataUser')._id}`)
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Sudah Menerima Barang?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/terimabarang/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: aqua;
 }
</style>
