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

// Fungsi untuk mencari objek dengan id 2 digit
function cariObjekDenganId4Digit(data) {
    let objekData;
    try {
        objekData = JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
    return objekData.filter(objek => objek.id.length === 4);
}

// Fungsi untuk menghasilkan array berisi objek dari dataWilayah dengan tambahan properti province_id
function tambahPropertiProvinceId(data) {
    let objekData;
    try {
        objekData = data;
    } catch (err) {
        console.error(err);
        return null;
    }
    return objekData.map(objek => {
        return {
            ...objek,
            province_id: objek.id.substring(0, 2)
        };
    });
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

const dataWilayah = await bacaFile('../db/json/wilayah.json');
const regencies = cariObjekDenganId4Digit(dataWilayah);
const dataWilayahWithProvinceId = tambahPropertiProvinceId(regencies);

// Menyimpan hasil ke dalam file
simpanHasilKeFile(dataWilayahWithProvinceId, "../db/json/regencies.json");