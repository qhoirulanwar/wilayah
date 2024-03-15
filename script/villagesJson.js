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
function searchObjWithLengthId10(data) {
    let objekData;
    try {
        objekData = JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
    return objekData.filter(objek => objek.id.length === 10);
}

// Fungsi untuk menghasilkan array berisi objek dari dataWilayah dengan tambahan properti province_id
function addPropertyVillageId(data) {
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
            district_id: objek.id.substring(0, 6)
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
const districts = searchObjWithLengthId10(dataWilayah);
const dataWilayahWithDistrictId = addPropertyVillageId(districts);

// Menyimpan hasil ke dalam file
saveResultToFile(dataWilayahWithDistrictId, "../db/json/villages.json");