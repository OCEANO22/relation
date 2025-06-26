<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const komentar = ref(null)
const berhasil = ref(false)
const komentarId = route.params.id  // pastikan route ini seperti /edit/:id

// Ambil data komentar berdasarkan ID
const fetchKomentar = async () => {
  try {
    const response = await fetch(`api/relation/${relationId}`)
    if (!response.ok) throw new Error('Gagal mengambil data komentar')
    komentar.value = await response.json()
  } catch (err) {
    console.error(err)
    alert('Gagal memuat komentar')
  }
}

// Kirim update komentar
const updateKomentar = async () => {
  try {
    const response = await fetch(`https://public.n-oceano22.workers.dev/api/relation/${komentarId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(komentar.value)
    })

    if (!response.ok) throw new Error('Gagal memperbarui komentar')

    berhasil.value = true
    setTimeout(() => {
      berhasil.value = false
      router.push('/') // arahkan kembali ke halaman utama setelah edit
    }, 2000)

  } catch (err) {
    console.error(err)
    alert('Terjadi kesalahan saat memperbarui komentar')
  }
}

onMounted(() => {
  fetchKomentar()
})
</script>

<template>
  <div class="form-edit-komentar" v-if="komentar">
    <h2>Edit Komentar</h2>
    <form @submit.prevent="updateKomentar">
      <input v-model="komentar.nama" type="text" placeholder="Nama Anda" required />
      <input v-model="komentar.email" type="email" placeholder="Email Anda" required />
      <textarea v-model="komentar.pesan" placeholder="Pesan Anda" required></textarea>
      <button type="submit">Simpan Perubahan</button>
    </form>

    <div class="sukses" v-if="berhasil">
      <p>Komentar berhasil diperbarui!</p>
    </div>
  </div>
  <div v-else>
    <p>Memuat komentar...</p>
  </div>
</template>

<style scoped>
.form-edit-komentar {
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.sukses {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}
</style>
