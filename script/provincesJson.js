import fs from 'fs';

// Fungsi untuk membaca file wilayah.sql
async function bacaFile(namaFile) {
    try {
        const data = await fs.promises.readFile(namaFile, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Menggunakan fungsi untuk membaca file
const dataWilayah = await bacaFile('../db/json/wilayah.json');


// Fungsi untuk mencari objek dengan id 2 digit
function cariObjekDenganId2Digit(data) {
    let objekData;
    try {
        objekData = JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
    return objekData.filter(objek => objek.id.length === 2);
}

// Menggunakan fungsi untuk mencari objek dengan id 2 digit
const provinsi = cariObjekDenganId2Digit(dataWilayah);

console.log(provinsi);


// Fungsi untuk menyimpan hasil ke dalam file result.txt
function simpanHasilKeFile(hasil, namaFile) {
    fs.writeFile(namaFile, JSON.stringify(hasil, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Data telah ditulis ke dalam file " + namaFile);
    });
}

// Menyimpan hasil ke dalam file
simpanHasilKeFile(provinsi, "../db/json/provices.json");