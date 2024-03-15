import fs from 'fs';

// Fungsi untuk membaca file wilayah.sql
function bacaFile(namaFile) {
    try {
        const data = fs.readFileSync(namaFile, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

function ambilDataKodeNama(inputText) {
    // Mencocokkan baris dengan pola ('kode','nama') menggunakan regex
    var regex = /\('([^']+)','([^']+)'\)/g;

    var hasil = [];
    var match;

    while ((match = regex.exec(inputText)) !== null) {
        // Mengambil nilai kode dan nama dari setiap baris yang cocok
        var kode = match[1].replace(/\./g, ''); // Menghapus titik dari kode
        var nama = match[2];

        // Menyimpan data dalam objek dan menambahkannya ke hasil
        var data = { id: kode, name: nama };
        hasil.push(data);
    }

    return hasil;
}

// Fungsi untuk menyimpan hasil ke dalam file result.txt
function simpanHasilKeFile(hasil, namaFile) {
    fs.writeFile(namaFile, JSON.stringify(hasil, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Data telah ditulis ke dalam file " + namaFile);
    });
}

const dataWilayah = bacaFile('../db/wilayah.sql');
const hasil = ambilDataKodeNama(dataWilayah);

// Menyimpan hasil ke dalam file
simpanHasilKeFile(hasil, "../db/json/wilayah.json");
