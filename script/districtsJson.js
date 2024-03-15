import fs from 'fs';

// Fungsi untuk membaca file wilayah.sql
async function readFile(namaFile) {
    try {
        const data = await fs.promises.readFile(namaFile, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Fungsi untuk mencari objek dengan id 2 digit
function searchObjWithLengthId6(data) {
    let objekData;
    try {
        objekData = JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
    return objekData.filter(objek => objek.id.length === 6);
}

// Fungsi untuk menghasilkan array berisi objek dari dataWilayah dengan tambahan properti province_id
function addPropertyDistrictId(data) {
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
            regency_id: objek.id.substring(0, 4)
        };
    });
}

// Fungsi untuk menyimpan hasil ke dalam file result.txt
function saveResultToFile(hasil, namaFile) {
    fs.writeFile(namaFile, JSON.stringify(hasil, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Data telah ditulis ke dalam file " + namaFile);
    });
}


const dataWilayah = await readFile('../db/json/wilayah.json');
const regencies = searchObjWithLengthId6(dataWilayah);
const dataWilayahWithDistrictId = addPropertyDistrictId(regencies);

// Menyimpan hasil ke dalam file
saveResultToFile(dataWilayahWithDistrictId, "../db/json/districts.json");