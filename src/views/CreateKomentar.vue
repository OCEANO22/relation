<script setup>
import { ref } from 'vue'

const nama = ref('')
const email = ref('')
const pesan = ref('')
const berhasil = ref(false)

async function submitKomentar() {
  try {
    const response = await fetch("/api/relation/komentar", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: nama.value,
        email: email.value,
        pesan: pesan.value
      })
    })

    if (!response.ok) {
      throw new Error('Gagal mengirim komentar')
    }

    // Reset form dan tampilkan pesan sukses
    nama.value = ''
    email.value = ''
    pesan.value = ''
    berhasil.value = true

    // Sembunyikan pesan sukses setelah 3 detik
    setTimeout(() => {
      berhasil.value = false
    }, 3000)

  } catch (err) {
    console.error('Error:', err)
    alert('Terjadi kesalahan saat mengirim komentar.')
  }
}
</script>

<template>
  <div class="form-komentar">
    <h2>Tambah Komentar</h2>
    <form @submit.prevent="submitKomentar">
      <input v-model="nama" type="text" placeholder="Nama Anda" required />
      <input v-model="email" type="email" placeholder="Email Anda" required />
      <textarea v-model="pesan" placeholder="Pesan Anda" required></textarea>
      <button type="submit">Kirim</button>
    </form>

    <div class="komentar-terkirim" v-if="berhasil">
      <p>Komentar berhasil dikirim!</p>
    </div>
  </div>
</template>

<style scoped>
.form-komentar {
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
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
.komentar-terkirim {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}
</style>
