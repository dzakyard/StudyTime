// Menghubungkan elemen HTML ke JavaScript
const tampilanWaktu = document.getElementById('tampilanWaktu');
const tombolStart = document.getElementById('tombolStart');
const tombolStop = document.getElementById('tombolStop');
const tombolReset = document.getElementById('tombolReset');

// Inisialisasi Variabel
let intervalId = null;
let waktuBerjalan = false;
let waktuMulai = 0;
let waktuTelahBerlalu = 0;

// Fungsi untuk memformat waktu
function formatWaktu(milidetik) {
    let jam = Math.floor(milidetik / 3600000);
    let menit = Math.floor((milidetik % 3600000) / 60000);
    let detik = Math.floor((milidetik % 60000) / 1000);
    let ms = Math.floor((milidetik % 1000) / 10);

    // Menambahkan nol di depan jika angka < 10
    jam = String(jam).padStart(2, '0');
    menit = String(menit).padStart(2, '0');
    detik = String(detik).padStart(2, '0');
    ms = String(ms).padStart(2, '0');

    return `${jam}:${menit}:${detik}.${ms}`;
}

// Fungsi utama
function startTimer() {
    if (waktuBerjalan) return;
    waktuBerjalan = true;
    waktuMulai = Date.now() - waktuTelahBerlalu;
    intervalId = setInterval(updateTampilan, 10);
}

function stopTimer() {
    if (!waktuBerjalan) return;
    waktuBerjalan = false;
    clearInterval(intervalId);
}

function resetTimer() {
    clearInterval(intervalId);
    waktuBerjalan = false;
    waktuTelahBerlalu = 0;
    tampilanWaktu.textContent = "00:00:00.00";
}

function updateTampilan() {
    waktuTelahBerlalu = Date.now() - waktuMulai;
    tampilanWaktu.textContent = formatWaktu(waktuTelahBerlalu);
}

function clearAchievement() {
    waktuTerbaik = 0;
    tampilanWaktuTerbaik.textContent = "00:00:00:00";
}

// Event Listeners untuk tombol
tombolStart.addEventListener('click', startTimer);
tombolStop.addEventListener('click', stopTimer);
tombolReset.addEventListener('click', resetTimer);

// Inisialisasi tampilan waktu terbaik saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    tampilanWaktuTerbaik.textContent = formatWaktu(waktuTerbaik);
});