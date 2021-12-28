const axios = require('axios');
const cheerio = require('cheerio');

async function ArtiMimpi(mimpi) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`)
      .then(({
        data 
      }) => {
        const $ = cheerio.load(data);
        const detect = $('#body > font > i').text();
        const isAva = /Tidak ditemukan/g.test(detect) ? false : true;
        if (isAva) {
          const isi = $('#body').text().split(`Hasil pencarian untuk kata kunci: ${mimpi}`)[1].replace(/\n\n/gi, '\n').replace(`Solusi - Menanggulangi akibat dari tafsir mimpi yang buruk
      Jika anda bermimpi sesuatu yang dapat berakibat buruk bagi anda dan keluarga 
      (seperti mimpi gigi copot dll) anda di harapkan melakukan hal-hal sebagai 
      berikut untuk menanggulanginya:
      Ambillah sapu lidi (bisa juga tusuk gigi, bambu kecil dll). Lalu potong 
      atau patahkan dengan tangan anda menjadi 7 (tujuh) batang, kecil-kecil, 
      kira-kira 3 sentimeter. Sediakan selembar kertas atau tissue. Siapkan 
      garam dapur, sedikit saja. Taruhlah potongan ke tujuh sapu lidi dan garam 
      dapur tadi ke dalam tissue atau kertas. Lipat kertas tersebut dan kuburkan 
      ke dalam tanah (pekarangan, halaman rumah anda). Kalimat yang anda harus 
      ucapkan ketika akan mengubur/membenam kertas (yang berisi 7 potong sapu 
      lidi dan garam) tersebut adalah kalimat yang meminta kepada Yang Maha 
      Kuasa agar di jauhi dari akibat buruk mimpi anda.
      Contoh kalimat:"Ya Tuhan.. Jauhkanlah saya dan keluarga saya dari 
      malapetaka. Tidak akan tumbuh/jadi, garam yang saya kubur ini. Seperti 
      halnya mimpi saya yang dapat berakibat buruk bagi kami tidak akan menjadi 
      kenyataan atau tidak akan terjadi. Amien.."
    
    `, '');
          const res = {
            status: 200,
            result: isi
          };
          resolve(res);
        } else {
          const res = {
            status: 404,
            result: `Arti Mimpi ${mimpi} Tidak Di Temukan`
          };
          resolve(res);
        }
      })
      .catch(reject);
  });
}

async function ArtiNama(nama) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data);
        const isi = $('#body').text().split('Nama:')[0];
        const res = {
            status: 200,
            result: isi
          };
          resolve(res);
      })
      .catch(reject);
  });
}

module.exports = {
  ArtiMimpi,
  ArtiNama,
};