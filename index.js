// "use strict" ? difficult mode

// semua functions sudah di buat sesimpel mungkin jika menemukan bug/typo dalam penulisan bisa beritahu saya di issue

// connecting WhatsApp web menggunakan Baileys https://www.github.com/adiwajshing/baileys
const {
  WAConnection: _WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  MimetypeMap,
  WALocationMessage,
  ChatModification,
  WA_MESSAGE_STUB_TYPES,
  WA_DEFAULT_EPHEMERAL,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  waChatKey,
  mentionedJid,
  processTime
} = require("@adiwajshing/baileys");

// functions node modules
const speed = require('performance-now');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require("child_process");
let path = require('path');
const translate = require('@iamtraction/google-translate');
const ffmpeg = require("fluent-ffmpeg");
const toMs = require('ms');
const fs = require("fs");
const similarity = require('similarity');
const threshold = 0.72;
const requests = require('node-fetch');
const lxa = require('./result/index');
const package = require('./package.json');
const FormData = require('form-data');
const yts = require('yt-search');
const axios = require("axios");
// functions dalam library
const simple = require('./whatsapp/connecting');
const { fetchJson, fakeText, getBuffer } = require('./library/fetcher');
const { color, bgcolor } = require('./library/color');
const { 
  createExif,
  modStick,
  h2k, 
  isUrl,
  isLinkyt,
  pickRandom,
  generateMessageID, 
  getGroupAdmins,
  getRandom,
  runtime,
  weton,
  week,
  date,
  waktu,
  tanggal,
  time,
  WIB,
  WITA,
  WIT,
  formatDate
} = require('./library/functions');

// functions

const {
  direc,
  addImage,
  addVideo,
  addStiker,
  addAudio,
  addReport
} = require('./functions/directory');


const { 
  User, 
  cekRegis,
  addRegister,
  addUser, 
  cekUser,
  cekPoin, 
  addPoin, 
  delPoin, 
  addLevel,
  cekLevel,
  cekBanned, 
  addBanned, 
  delBanned,
  cekPremium,
  addPremium,
  delPremium,
  addChatbot,
  delChatbot,
  cekChatbot,
  cekVoiceCommand,
  addVoiceCommand,
  delVoiceCommand,
  addAfk,
  delAfk,
  cekAfk,
  cekAfkReason,
  cekAfkTime,
  addWarn,
  delWarn,
  cekWarn,
  addBahasa,
  cekBahasa
} = require('./functions/user'); // mengubah dan mengambil data user dalam ./database/user

const {
  Group,
  addGroup,
  addOffline,
  delOffline,
  cekOffline,
  addWelcome,
  delWelcome,
  cekWelcome,
  addAntilink,
  delAntilink,
  cekAntilink,
  addBadword,
  delBadword,
  cekBadword,
  addAntidelete,
  delAntidelete,
  cekAntidelete,
  addDetect,
  delDetect,
  cekDetect,
  addViewonce,
  delViewonce,
  cekViewonce
} = require('./functions/group'); // mengubah dan mengambil data dalam ./database/group

const {
  st,
  addName,
  addAuthor,
  addPackname,
  addWm,
  addGamewaktu,
  addPoingame,
  addCmd
} = require('./functions/setting-bot'); // mengubah data dalam ./database/setting-bot

const {
  Wel,
  addCustomWelcome,
  getCustomWelcome,
  setCustomWelcome,
  delCustomWelcome,
  getCustomBye,
  setCustomBye,
  delCustomBye
} = require('./functions/welcome');

const { msgFilter } = require('./functions/antispam')
const { menu } = require('./functions/menu'); // tampilan menu dalam functions/menu
const { ind, eng, jv, snd, ar } = require('./language/index');

// functions dalam ./functions/setting-bot
let ownerNumber = st.ownerNumber;
let isPoingame = st.poinGame; 
let isGamewaktu = st.gameWaktu;
let isPoinawal = st.poinAwal;
let isNama = st.nama; 
let isAuthor = st.author; 
let isPackname = st.packname;
let isWm = st.wm;
let isTotalcmd = st.totalcommand;
let hujanapi = st.hujanApi
// -- thumbnail
let thumb = fs.readFileSync('./temp/thumb.jpeg'); // !! jangan ganti, mau ganti ada casenya
let ambrela = fs.readFileSync('./temp/ambrela.jpg'); 
let fakethumb = fs.readFileSync('./temp/thumbnail.jpeg'); // !! jangan ganti, mau ganti ada casenya

let baterai = {
    baterai: 0,
    cas: false
};

let Use = {
  prefix: '!',
  multi: true,
  nopref: false,
  onepref: false
};

module.exports = client = async (client, mek) => {
  try {
    if (!mek.hasNewMessage) return;
    mek = mek.messages.all()[0];
    if (!mek.message) return;
    if(mek.key.fromMe) return; // hapus untuk pengguna self bot namun akan error pada fitur game
    if (mek.key && mek.key.remoteJid == 'status@broadcast') return;
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    let m = simple.smsg(client, mek);
    global.prefix;
    global.blocked;
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const type = Object.keys(mek.message)[0];
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType;
    const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = client.user.phone;
//--
    const cmd = 
    type === 'conversation' && mek.message.conversation ? mek.message.conversation :
    type === 'imageMessage' && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : 
    type === 'videoMessage' && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : 
    type === 'extendedTextMessage' && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : 
    type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''.slice(1).trim().split(/ +/).shift().toLowerCase();

      if(Use.multi){
        var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|÷?;:%^&./\\©^]/gi) : '-';
      } else if (Use.nopref) {
        prefix = '';
      } else if (Use.onepref) {
        prefix = Use.prefix;
        }

const body = 
     type === 'conversation' && mek.message.conversation.startsWith(prefix) ? mek.message.conversation : 
     type === 'imageMessage' && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : 
     type === 'videoMessage' && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : 
     type === 'extendedTextMessage' && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : 
     type === 'buttonsResponseMessage' && mek.message[type].selectedButtonId.startsWith(prefix) ? mek.message[type].selectedButtonId : '';
     
     
     const budy = 
     type === 'conversation' ? mek.message.conversation : 
     type === 'extendedTextMessage' ? mek.message.extendedTextMessage.text :
     type === 'imageMessage' ? mek.message.imageMessage.caption : 
     type === 'videoMessage' ? mek.message.videoMessage.caption : 
     type === 'stickerMessage' ? 'Sticker' :
     type === 'audioMessage' ? 'Audio' : '';
     const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
     const args = body.trim().split(/ +/).slice(1);
     const more = String.fromCharCode(8206);
     const readMore = more.repeat(4000);
     const value = args.join(' ');
     const isCmd = body.startsWith(prefix);
     const totalchat = await client.chats.all();
     const botNumber = client.user.jid;
     
//-- Group Metadata
     const isGroup = from.endsWith('@g.us');
     const sender = isGroup ? mek.participant : mek.key.remoteJid;
     const groupMetadata = isGroup ? await client.groupMetadata(from) : '';
     const groupName = isGroup ? groupMetadata.subject : '';
     const groupDesc = isGroup ? groupMetadata.desc : ''
     const groupId = isGroup ? groupMetadata.jid : '';
     const itsMe = mek.key.fromMe ? true : false
     const groupMembers = isGroup ? groupMetadata.participants : '';
     const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
     const isOwner = ownerNumber.includes(sender) || false;
     const isBotAdmins = groupAdmins.includes(botNumber) || false;
     const isAdmins = groupAdmins.includes(sender) || false;
     let siapa = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.fromMe ? client.user.jid : mek.sender;
     let dia = mek.quoted ? mek.quoted.sender : mek.mentionedJid && mek.mentionedJid[0] ? mek.mentionedJid[0] : false;
     const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
     const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
     const about = (await client.getStatus(sender).catch(console.error) || {}).status || ''
    

// cek Informasi user
     let isPoin = cekPoin(sender);
     let isLevel = cekLevel(sender);
     let isPremium = cekPremium(sender);
     let isChatbot = cekChatbot(sender);
     let isVoiceCommand = cekVoiceCommand(sender);
     let isBanned = cekBanned(sender);
     let isAfk = cekAfk(sender);
     let isAfkTime = cekAfkTime(sender);
     let isAfkReason = cekAfkReason(sender);
     let isOffline = cekOffline(from);
     let isWelcome = cekWelcome(from);
     let isAntidelete = cekAntidelete(from);
     let isAntilink = cekAntilink(from);
     let isDetect = cekDetect(from);
     let isRegister = cekRegis(sender);
     let isViewonce = cekViewonce(from);
     let msg = cekBahasa(sender);
     
          // -- bahasa
     if (msg === "indonesia") {
       msg = ind;
     } else if (msg === "english") {
       msg = eng;
     } else {
       msg = ind;
     }

     /** Ucapan waktu menurut Timezone 
      * Saying time according to Timezone
      */
     if (time < "24:59:00") {
       ucapanWaktu = msg.night;
     }
     if (time < "18:00:00") {
       ucapanWaktu = msg.evening;
     }
     if (time < "15:00:00") {
       ucapanWaktu = msg.day;
     }
     if (time < "11:00:00") {
       ucapanWaktu = msg.morning;
     }
     if (time < "05:00:00") {
       ucapanWaktu = msg.night;
     }
     
     if (Use.multi) {
        modepref = 'Multi Prefix'
      } else if (Use.nopref) {
        modepref = 'No Prefix'
      } else if (Use.onepref) {
        modepref = 'Prefix ' + Use.prefix
      }
     
     function monospace(string) {
            return '```' + string + '```'
        }   
     
     async function sendFileFromUrl(from, url, caption, mek, men) {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            let type = mime.split("/")[0]+"Message"
            if(mime === "image/gif"){
                type = video
                mime = gif
            }
            if(mime === "application/pdf"){
                type = MessageType.document
                mime = pdf
            }
            if(mime.split("/")[0] === "audio"){
                mime = mp4Audio
            }
            return client.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: mek, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }
     
     // functions penyebutan user premium
     if (isPremium && isOwner) {
       prem = "Yes";
     } else {
       prem = "No";
     }
     
// -- baterai
client.on('CB:action,,battery', json => {
	const a = json[2][0][1].value;
	const b = json[2][0][1].live;
	baterai.baterai = a;
	baterai.cas = b;
});
     
// detected quoted 
     const isMedia = type === "imageMessage" || type === "videoMessage";
     const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
 	 	 const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
		 const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
		 const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
		 const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
	   const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
		 const isQuotedextendedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage');


// console log command ketika dalam private chat
    if (!isGroup && isCmd) {
      console.log("‣", bgcolor('Command On PRIVATE CHAT', 'magenta'));
      console.log(" From :", color(pushname, "yellow"), "Tanggal :", bgcolor(tanggal, 'grey'));
      console.log(" Command :", color(command.toUpperCase(), "orange"), "MessageType :", bgcolor(type, "orange"));
    }
    
// console log command ketika dalam group
    if (isGroup && isCmd) {
      console.log("‣", bgcolor('Command On', 'magenta'), "GROUP", color(groupName, "orange"));
      console.log(" From :", color(pushname, "yellow"), "Tanggal :", bgcolor(tanggal, 'grey'));
      console.log(" Command :", color(command.toUpperCase(), "orange"), "MessageType :", bgcolor(type, "orange"));
    }
  

 let infoMSG = JSON.parse(fs.readFileSync('./database/msg.data.json'))
    infoMSG.push(JSON.parse(JSON.stringify(mek)))
    fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
    const urutan_pesan = infoMSG.length
    if (urutan_pesan === 5000) {
    infoMSG.splice(0, 4300)
    fs.writeFileSync('./database/msg.data.json', JSON.stringify(infoMSG, null, 2))
    }

const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
            let po = client.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "Pilih Disini","footerText": "Jangan Lupa Donasi Ya Kak ☕","listType": "SINGLE_SELECT","sections": list}}, {})
            return client.relayWAMessage(po, {waitForAck: true})
        }

const sendMess = (hehe, teks) => {
           client.sendMessage(hehe, teks, text)
        }

const sendText = (from, text) => {
           client.sendMessage(from, text, MessageType.text)
        }


// auto respon
lexa = ['@'+client.user.jid.split('@')[0]]
for ( var L of lexa){
  if(!mek.isBaileys && budy.match(L)){
    lari = fs.readFileSync('./database/media/sticker/lari.webp')
   //return client.sendMessage(from, lari, sticker, {quoted: mek})
   capt = 'Halo @'+sender.split('@')[0]+' Ryuu disini'
   return client.send2ButtonLoc(from, thumb, capt, 'Klik button untuk menampilkan menu dan informasi', 'MENU', prefix + 'menu', 'INFORMATION', prefix + 'informasi', false, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
  }
}

if (budy) addUser(sender); // menambah informasi user kedalam database
if (isGroup && budy) addGroup(from); // menambah informasi group kedalam database
if (isCmd) addCmd() // menambah jumlah total command ketika user menggunakan command
if (isCmd) addPoin(sender); // menambah poin user ketika menggunakan command
if (isGroup && budy) addCustomWelcome(from) // push costume welcome
if(isGroup && budy && isAfk){ //cek Players afk
  await delAfk(sender)
 return m.reply(msg.offAfk)
}
	
	
/** 
 * GOOGLE ASISTEN by @alpio adjijanuar
 * maintenance for better experience 
 */
    
/**
 * GOOGLE PIYO by @alpio adjijanuar
 * maintenance for better experience 
 */


// menambahkan poin ke level dan di akumulasikan untuk menaikkan level
const Amount = isPoinawal * (Math.pow(2, isLevel) - 1)
if (Amount <= isPoin) {
           await addLevel(sender) // akumulasi poin untuk menaikkan level
          }

// khusus command ketika status offline dalam group menyala
switch (command) {
  
  case 'offline': // ketik offline menyala bot tidak akan membalas perintah apapun dalam group tertentu
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if (isOffline === true ) {
      return m.reply('Bot offline')
    }
    await addOffline(from)
    m.reply(msg.offline)
    break

  case 'online':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if (isOffline === false ) {
      return m.reply('Bot online')
    }
    await delOffline(from)
    m.reply(msg.online)
    break 
    default:
}

if (isGroup && isOffline === true) return; // ketik offline menyala bot tidak akan membalas perintah apapun dalam group tertentu


switch (command) { 
 
  case 'restart': // restart bot !!
    if(!isOwner) return m.reply(msg.owner)
    m.reply('Restart bot, proses membutuhkan waktu kurang dari 1 menit, silahkan tunggu')
    try {
      process.send('reset')
    } catch (e) {
      m.reply('hmmmm')
    }
  break
 
  case 'ping':
    const timestamp = speed();
    const latensi = speed() - timestamp 
    m.reply(`Speed : ${latensi.toFixed(3)} Second`)
  break 
  
  case 'sc':
  case 'script':
    capt = `
*Original*  : Segera Hadir....

*Recode* : Riu_Forbiden
`
client.sendMessage(from, capt, text, {quoted: mek})
break
  
  
//-- Rapiin dikit:v -hns
  case 'menu': case 'help':
  if (isBanned) return m.reply(msg.banned)
    m.reply(msg.wait)
    capt = `
Hi ${pushname} ${ucapanWaktu}
    
🐣 *Level mu* : ${isLevel}
🐥 *Poin mu* : ${isPoin}
⚔️ *Premium* : ${prem}
⏲️ *Tanggal* : ${tanggal}
🕯 *Mode* : ${modepref}
`
    capt += readMore
    capt += menu(prefix)
    client.send3ButtonLoc(from, thumb, capt, `\n𝗟𝗜𝗦𝗧 𝗛𝗔𝗥𝗚𝗔 𝗣𝗥𝗘𝗠𝗜𝗨𝗠\n\n\n( SEMINGGU 5K )\n\nFitur :  \n• Unlock Youtube Downloader\n• Unlock Hentai Image\n• Unlock Antilink\n• Unlock Antidelete\n• Unlock Antiviewonce\n• Unlock Detect\n• Join grup 3x kesempatan\n\nMau beli? Ketik .owner dan tanyain disitu ya!!`, 'INFORMASI', prefix + 'informasi', 'OWNER', prefix + 'owner', 'THANKS USER🤝', prefix + '')
    break
  
  case 'bahasa':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.Pbahasa)
    if (value.toLowerCase() === "indonesia") {
      await addBahasa(sender, "indonesia")
      m.reply("Bahasa Indonesia terpilih\nSekarang bot akan membalas pesanmu dengan bahasa Indonesia")
    } else if (value.toLowerCase() === "english") {
      await addBahasa(sender, "english")
      m.reply("Selected English\nNow the bot will reply to your message in English")
      } else {
      m.reply(msg.nobahasa)
    }
    break;
  
  case 'kisahnabi':
  if (isBanned) return m.reply(msg.banned)
                    if (!value) return m.reply(`Example: ${prefix + command} Muhammad`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kisahnabi/${value}?apikey=rmzbot`)
                    get_result = get_result.result
                    ini_txt = `Nama : ${get_result.name}\n`
                    ini_txt += `Lahir : ${get_result.thn_kelahiran}\n`
                    ini_txt += `Umur : ${get_result.age}\n`
                    ini_txt += `Tempat : ${get_result.place}\n`
                    ini_txt += `Story : \n${get_result.story}`
                    m.reply(ini_txt)
                    break
  
  case 'runtime':
  if (isBanned) return m.reply(msg.banned)
  m.reply(`*Runtime* : ${runtime(process.uptime())}`)
  break
  
  case 'owner':
  case 'author':
    number = '17706916497@s.whatsapp.net'
    capt = `Nomor : @${number.split('@')[0]}\n\n`
    capt += 'Instagram : https://www.instagram.com/hyodoissei1'
    await client.fakeLink(from, capt, thumb, 'Click in here', 'https://www.instagram.com/hyodoissei1', mek)
   /* client.sendContact(from, '6282223014661', 'owner', {
	 key: {
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(from ? 
	 { remoteJid: from } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text":"Nih owner ku"
                        }
	                  }})*/
    break
    
   case 'info':
   case 'informasi':
  if (isBanned) return m.reply(msg.banned)
   const unread = await client.loadAllUnreadMessages ();
   i = []
   giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
   uptime = process.uptime()
   teks = `
( INFORMASI )

- Nama : ${client.user.name}
- Versi Bot : ${package.version}
- Author: ${package.author}
- Speed : ${process.uptime()}
- Runtime : ${kyun(uptime)}


( WHATSAPP )

- Kontak : ${Object.keys(client.contacts).length}
- Total pesan : ${totalchat.length}
- Personal Chat : ${totalchat.length - giid.length}
- Total group : ${giid.length}
- Pesan belum dibaca : ${unread.length}
- Versi Wa : ${client.user.phone.wa_version}


( DEVICE )

- Baterai : ${baterai.baterai}%
- Charge : ${baterai.cas === 'true' ? 'Charging' : 'Not charging'}
- Device : ${device_manufacturer}
- Versi OS : ${os_version}
- Versi Device : ${device_model}
- RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- Browser : ${client.browserDescription[1]}
- Versi Browser : ${client.browserDescription[2]}


( OWNER )

- Instagram : https://www.instagram.com/riuganz_
- WhatsApp : wa.me/62814622392081


( SCRIPT )

- Recode By : R1U
- License : ${package.license}
- Script : Segera Hadir....` 
  client.sendMessage(from, monospace(teks), text, { quoted: mek })
   break
    
 case 'namaninja':
 case 'purba':
 case 'blackpill':
 case 'typewriter':
 case 'sans':
 case 'castle':
 case 'comic':
  if (isBanned) return m.reply(msg.banned)
  if(!value) return m.reply(msg.notext)
  if(command === "namaninja" ) {
    has = await lxa.namaninja(value)
  } else if(command === "blackpill"){
    has = await lxa.blackpill(value)
  } else if(command === "typewriter"){
    has = await lxa.typewriter(value)
  } else if(command === "sans"){
    has = await lxa.sans(value)
  } else if(command === "castle"){
    has = await lxa.castle(value)
  } else if(command === "purba"){
    has = await lxa.purba(value)
  } else if(command === "comic"){
    has = await lxa.comic(value)
  }
   m.reply(has)
   break
   
   case 'creategrup':
   if (!text) return m.reply('_Masukkan Nama Grup!_')
   try{
    await m.reply('Wait Bot Sedang Membuat Group nya')
    let group = await client.groupCreate(`${value}`, [m.sender])
    let link = await client.groupInviteCode(group.gid)
    let url = 'https://chat.whatsapp.com/' + link;
    //client.sendMessage(group.gid, "Success to group create!", MessageType.extendedText)
     m.reply('_Berhasil Membuat Grup *' + text + '*_\n\n*Nama:* ' + value + '\n*ID:* ' + group.gid + '\n*Link:* ' + url + '\n\n*CREATE GROUP*')
       } catch (e) {
    m.reply('```Error```')
    console.log (e)
  }
    break
    
  case 'truth':
  case 'dare':
  case 'dilan':
  case 'ilham':
  case 'fakta':
  case 'gombal':
  case 'hacker':
  if (isBanned) return m.reply(msg.banned)
    if(command === "truth" ) {
      hasil = lxa.truth()
    } else if (command === "dare" ) {
      hasil = lxa.dare()
    } else if (command === "dilan") {
      hasil = lxa.dilan()
    } else if (command === "ilham") {
      hasil = lxa.ilham()
    } else if (command === "fakta") {
      hasil = lxa.fakta()
    } else if (command === "gombal") {
      hasil = lxa.gombal()
    } else if (command === "hacker") {
      hasil = lxa.hacker()
    }
    capt = "*❲ "+command.toUpperCase()+" ❳*\n"+hasil
    client.sendButton(from, capt, msg.next(command), 'Next', prefix + command)
    break
    
  case 'fitnah':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.notext)
    if(!dia) return m.reply(msg.notag)
    text1 = value.split("/")[0]
    text2 = value.split("/")[2]
    client.fakeReply(from, text1, dia, text2, from)
    break
  
  case 'say':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.notext)
    client.sendMessage(from, value, text)
    break
  
  case 'apakah':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.notext)
    apa = ['Tidak', 'Iya', 'Mungkin']
    jawaban = pickRandom(apa)
    capt = 'Pertanyaan : Apakah ' + value 
    capt += '\nJawaban : ' + jawaban 
    m.reply(capt)
  break

  case 'siapa':
  case 'siapakah':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.notext)
    if(!isGroup) return m.reply(msg.group)
    let member = groupMembers.map(u => u.jid)
    siapa = pickRandom(member)
    capt = 'Pertanyaan : Siapakah ' + value 
    capt += '\nJawaban : @' + siapa.split('@')[0]
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
  break

  case 'kapan':
  case 'kapankah':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(msg.notext)
    No = Math.floor(Math.random() * 30)
    Apa = ["Jam lagi","Hari lagi","Minggu lagi","Bulan lagi","Tahun lagi"]
    jawaban = pickRandom(Apa)
    capt = 'Pertanyaan : Kapankah ' + value 
    capt += '\nJawaban : ' + No + ' ' + jawaban
    m.reply(capt)
  break

 case 'afk':
  if (isBanned) return m.reply(msg.banned)
   if(!isGroup) return m.reply(msg.group)
   tgl = week + ", " + time
   reason = value ? msg.with + value : ''
   if(args.length > 10) return m.reply('No')
   await addAfk(sender, tgl, reason)
   m.reply(msg.onAfk(reason))
 break

  case "s":
  case "stiker":
  case "sticker":
  if (isBanned) return m.reply(msg.banned)
    anu = args.join(" ").split("|");
        a = anu[0] !== "" ? anu[0] : isAuthor;
        b = typeof anu[1] !== "undefined" ? anu[1] : isPackname;
    if ( 
      ((isMedia && !mek.message.videoMessage) || isQuotedImage)
      ) { 
        const encmedia = isQuotedImage 
        ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message .extendedTextMessage.contextInfo : mek;
          media = await client.downloadAndSaveMediaMessage(encmedia); 
          await createExif(a, b); 
          out = getRandom(".webp"); 
          ffmpeg(media) 
          .on("error", (e) => { 
            console.log(e); 
            client.sendMessage(from, "Terjadi kesalahan", "conversation", { quoted: mek }); 
            fs.unlinkSync(media); 
            })
            .on("end", () => { 
              _out = getRandom(".webp"); 
              spawn("webpmux", [
                "-set",
                "exif",
                "./temp/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                client.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11))
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await client.downloadAndSaveMediaMessage(encmedia);
          await createExif(a, b);
          out = getRandom(".webp");
          ffmpeg(media)
            .on("error", (e) => {
              console.log(e);
              client.sendMessage(from, "Terjadi kesalahan", "conversation", {
                quoted: mek,
              });
              fs.unlinkSync(media);
            })
            .on("end", () => {
              _out = getRandom(".webp");
              spawn("webpmux", [
                "-set",
                "exif",
                "./temp/data.exif",
                out,
                "-o",
                _out,
              ]).on("exit", () => {
                client.sendMessage(
                  from,
                  fs.readFileSync(_out),
                  "stickerMessage",
                  { quoted: mek }
                );
                fs.unlinkSync(out);
                fs.unlinkSync(_out);
                fs.unlinkSync(media);
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(out);
        } else {
          m.reply(
            `Kirim gambar dengan caption ${prefix}stiker, untuk video durasi kurang dari *7 detik*`
          );
        }
        break

  case "take":
  case "colong":
      if (!isQuotedSticker) return m.reply(msg.replyStic);
      encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
        .message.extendedTextMessage.contextInfo;
      media = await client.downloadAndSaveMediaMessage(encmedia);
        anu = args.join(" ").split("|");
        a = anu[0] !== "" ? anu[0] : isPackname;
        b = typeof anu[1] !== "undefined" ? anu[1] : isAuthor;
        createExif(a, b);
        modStick(media, client, mek, from);
        break 
   
  case "toimg":
    if (!isQuotedSticker) return m.reply(msg.replyStic);
        m.reply(msg.wait);
        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await client.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".png");
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return m.reply("Yah gagal, coba ulangi");
          buffer = fs.readFileSync(ran);
          client.sendMessage(from, buffer, image, {caption: msg.done})
          fs.unlinkSync(ran);
        });
        break;

   case 'pinterest':
  if (isBanned) return m.reply(msg.banned)
    if(!value) return m.reply(no.text)
    m.reply(msg.wait)
    go = await lxa.pinterest(value)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    client.sendMessage(from, await getBuffer(pin), image, { quoted: mek, caption: 'Result from *PINTEREST*\n'+pin, thumbnail: Buffer.alloc(0) })
 break
 
 case 'neko18': case 'nekonime':
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v3 = await fetchJson(`https://waifu.pics/api/nsfw/waifu`)
let hasil2 = await getBuffer(v3.url)
client.sendButtonImg(from, hasil2, 'Result from : *nekos.life*', msg.next(command), 'Next', prefix + 'neko18', mek)
break
 
case 'waifu18': case 'waifuhentai':
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v2 = await fetchJson(`https://waifu.pics/api/nsfw/waifu`)
let hasil1 = await getBuffer(v2.url)
client.sendButtonImg(from, hasil1, 'Result from : *github.xyz*', msg.next(command), 'Next', prefix + 'waifu18', mek)
break

  case 'cogan':
  if (isBanned) return m.reply(msg.banned)
    cogan = ['cogan indo', 'pap cogan', 'cogan']
    push = pickRandom(cogan)
    m.reply(msg.wait)
    go = await lxa.pinterest(push)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pin), 'Result from : *PINTEREST*\n'+pin, msg.next(command), 'Next', prefix + 'cogan', mek)
 break
 
 case 'shouta':
  if (isBanned) return m.reply(msg.banned)
    shot = ['shouta', 'shouta wallpaper']
    ta = pickRandom(shot)
    m.reply(msg.wait)
    wall = await lxa.pinterest(ta)
    pon = pickRandom(wall)
    if(!pon) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pon), 'Result from : *raw.githubsercontent.com*\n\n'+pon, `${command}`, 'Next', prefix + 'shouta', mek)
 break
 
 
 case 'milf': case 'fendom':
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/femdom`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'milf', mek)
break

case 'hololewd': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/holo`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'hololewd', mek)
}
break

case 'holoeroi': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/holoero`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'holoeroi', mek)
}
break

case 'holohentai': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/holo`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'holohentai', mek)
}
break

case 'pussy': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/pussy`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'pussy', mek)
}
break
 
 case 'kemonomimi': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/kemonomimi`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'kemonomimi', mek)
}
break

case 'yuri': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/yuri`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'yuri', mek)
}
break

case 'tits': {
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
m.reply(msg.wait)
v4 = await fetchJson(`https://nekos.life/api/v2/img/tits`)
let hasil3 = await getBuffer(v4.url)
client.sendButtonImg(from, hasil3, 'Result from : *nekos.life*', `${command}`, 'Next', prefix + 'tits', mek)
}
break
 
 case 'cosplay':
  if (isBanned) return m.reply(msg.banned)
    cos = ['cosplay']
    playnya = pickRandom(cos)
    m.reply(msg.wait)
    woss = await lxa.pinterest(playnya)
    pan = pickRandom(woss)
    if(!pan) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pan), 'Result from : *raw.githubsercontent.com*\n\n'+pan, `${command}`, 'Next', prefix + 'cosplay', mek)
 break

 case 'loli':
  if (isBanned) return m.reply(msg.banned)
    lo = ['loli', 'loli wallpaper']
    li = pickRandom(lo)
    m.reply(msg.wait)
    wass = await lxa.pinterest(li)
    pun = pickRandom(wass)
    if(!pun) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pun), 'Result from : *raw.githubsercontent.com*\n\n'+pun, `${command}`, 'Next', prefix + 'loli', mek)
 break

  case 'cecan':
  if (isBanned) return m.reply(msg.banned)
    cecan = ['cecan indo', 'pap cecan', 'cecan']
    push = pickRandom(cecan)
    m.reply(msg.wait)
    go = await lxa.pinterest(push)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pin), 'Result from : *PINTEREST*\n'+pin, msg.next(command), 'Next', prefix + 'cecan', mek)
 break

  case 'cyberpunk':
  if (isBanned) return m.reply(msg.banned)
    cyberpunk = ['cyberpunk jepang', 'cyberpunk']
    push = pickRandom(cyberpunk)
    m.reply(msg.wait)
    go = await lxa.pinterest(push)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pin), 'Result from : *PINTEREST*\n'+pin, msg.next(command), 'Next', prefix + 'cyberpunk', mek)
 break

  case 'wallpaper':
  if (isBanned) return m.reply(msg.banned)
    wall = ['wallpaper cute', 'wallpaper anime','wallpaper aesthetic']
    push = pickRandom(wall)
    m.reply(msg.wait)
    go = await lxa.pinterest(push)
    pin = pickRandom(go)
    if(!pin) return m.reply('Error')
    client.sendButtonImg(from, await getBuffer(pin), 'Result from : *PINTEREST*\n'+pin, msg.next(command), 'Next', prefix + 'wallpaper', mek)
 break

  case 'upsw':
    if(!isOwner) return m.reply(msg.owner)
    const colors = [
    0xff26c4dc, 0xff792138,
    0xff8b6990, 0xfff0b330,
    0xffae8774, 0xff5696ff,
    0xffff7b6b, 0xff57c9ff,
    0xff243640, 0xffb6b327,
    0xffc69fcc, 0xff54c265,
    0xff6e257e, 0xffc1a03f,
    0xff90a841, 0xff7acba5,
    0xff8294ca, 0xffa62c71,
    0xffff8a8c, 0xff7e90a3,
    0xff74676a
]
    let _m = Promise.resolve({ key: { id: '' }})
    if (!m.quoted && !value) m.reply('reply pesan atau sebagai argumen')
    if (m.quoted && m.quoted.mtype !== 'conversation' && !value) _m = m.quoted.forward('status@broadcast')
    if (m.quoted && m.quoted.mtype === 'conversation' && !value) _m = client.sendMessage('status@broadcast', {
        text: m.quoted.text,
        textArgb: 0xffffffff,
        backgroundArgb: pickRandom(colors)
    }, 'extendedTextMessage')
    if (!m.quoted && value) _m =client.sendMessage('status@broadcast', {
        value,
        textArgb: 0xffffffff,
        backgroundArgb: pickRandom(colors)
    }, 'extendedTextMessage')
    if (m.quoted && value) _m = client.forwardMessage('status@broadcast', await m.quoted.cMod('status@broadcast', value))
    m.reply((await _m).key.id)
    break

 case 'tomp3':
  if (isBanned) return m.reply(msg.banned)
   if(isMedia || isQuotedVideo) {
     m.reply(msg.wait)
     q = m.quoted ? m.quoted : m 
     mp3 = await q.download()
     client.sendMessage(from, mp3, audio, {quoted: mek})
   } else {
     m.reply(msg.replyVid)
   }
   break

 case 'tovn':
  if (isBanned) return m.reply(msg.banned)
   if(!isQuotedAudio) return m.reply(msg.replyVn)
   m.reply(msg.wait)
   q = m.quoted ? m.quoted : m 
   vn = await q.download()
  client.sendMessage(from, vn, audio, {ptt: true, quoted: mek})
   break

  case 'del' : 
  case 'delete':
  case 'd':
    if (!isAdmins && !isOwner) return m.reply(msg.admin)
    try{
      pesan = {
        id: mek.message.extendedTextMessage.contextInfo.stanzaId, 
        remoteJid: from, 
        fromMe: true 
      }
      client.deleteMessage(from, pesan)
    } catch(e) {
      m.reply('Reply bot message')
    }
    break

 case 'report':
 case 'bug':
   if (!value) return m.reply(msg.notext)
   await addReport(sender, value)
   capt = 'Report from @' + sender.split('@')[0]
   capt += '\n' + value
   m.reply(msg.done + '\n' + capt)
   break

 case 'listreport':
   if (!isOwner) return m.reply(msg.owner)
   report = '*LIST REPORT*'
   for (var R of direc.report){
     report += `\n\nId : @` + R.id.split('@')[0]
     report += `\nReport : ` + R.report
   }
   m.reply(report)
   break

  case 'listmedia':
   listimg = direc.image
   listvid = direc.video
   listaud = direc.audio
   liststik = direc.sticker
   teks = msg.liston+'\n'
   teks += '╭─⊷❲ *IMAGE* ❳\n'
   	for ( v of listimg) { 
   	  teks += `├  ${v}\n`
	  }
	  teks += '╰────────\n'
	  teks += '╭─⊷❲ *VIDEO* ❳\n'
	  for ( x of listvid) { 
   	  teks += `├  ${x}\n`
	  }
	  teks += '╰────────\n'
	  teks += '╭─⊷❲ *AUDIO* ❳\n'
	  for ( y of listaud) { 
   	  teks += `├  ${y}\n`
	  }
	  teks += '╰────────\n'
	  teks += '╭─⊷❲ *STICKER* ❳\n'
	  for ( z of liststik) { 
   	  teks += `├  ${z}\n`
	  }
	  teks += '╰────────\n'
	  teks += msg.getlist
	  m.reply(teks.trim())
   break
 
 case 'addimg':
   if(!value) return m.reply(msg.notext)
   if(isMedia || isQuotedImage) {
     for ( i of direc.image) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let img = await q.download() 
   fs.writeFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`, img)
   m.reply(msg.done)
   await addImage(value.toLowerCase())
   } else {
     m.reply(msg.replyImg)
   }
   break

 case 'getimg':
   try { 
     mage = fs.readFileSync(`./database/media/image/${value.toLowerCase()}.jpeg`) 
     client.sendMessage(from, mage, image, { quoted: mek, caption: 'Result : database image', thumbnail: Buffer.alloc(0) })
     } catch {
       m.reply(msg.packoff)
     }
     break

 case 'addvid':
   if(!value) return m.reply(msg.notext)
   if(isMedia || isQuotedVideo) { 
     for ( i of direc.video) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   vid = await q.download()
   fs.writeFileSync(`./database/media/video/${value.toLowerCase()}.mp4`, vid)
   m.reply(msg.done)
   await addVideo(value.toLowerCase())
   } else {
     m.reply(msg.replyVid)
   }
   break

 case 'getvid':
   try { 
     vid = fs.readFileSync(`./database/media/video/${value.toLowerCase()}.mp4`) 
     client.sendMessage(from, vid, video, { quoted: mek, caption: 'Result : database video' })
     } catch {
       m.reply(msg.packoff)
     }
     break


 case 'addvn':
   if(!isQuotedAudio) return m.reply(msg.replyVn)
   if(!value) return m.reply(msg.notext)
   for ( i of direc.audio) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let aud = await q.download()
   fs.writeFileSync(`./database/media/audio/${value.toLowerCase()}.mp3`, aud)
   m.reply(msg.done)
   await addAudio(value.toLowerCase())
   break

 case 'getvn':
   try { 
     vn = fs.readFileSync(`./database/media/audio/${value.toLowerCase()}.mp3`) 
     client.sendMessage(from, vn, audio, { quoted: mek, ptt: true})
     } catch {
       m.reply(msg.packoff)
     }
     break

 case 'addstik':
   if(!isQuotedSticker) return m.reply(msg.replyStic)
   if (!value) return m.reply(msg.notext)
   for ( i of direc.sticker) {
        if(i === value.toLowerCase()) return m.reply(msg.packon)
        }
   q = m.quoted ? m.quoted : m 
   let stic = await q.download()
   fs.writeFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`, stic) 
   m.reply(msg.done)
   await addStiker(value.toLowerCase())
break

 case 'getstik':
   try { 
     tik = fs.readFileSync(`./database/media/sticker/${value.toLowerCase()}.webp`) 
     client.sendMessage(from, tik, sticker, { quoted: mek })
     } catch {
       m.reply(msg.packoff)
     }
     break

case 'halah':
 case 'hilih':
 case 'huluh':
 case 'heleh':
 case 'holoh':
  if (isBanned) return m.reply(msg.banned)
   var vokal 
   if(command == 'halah') {
     vocal = 'a'
   } else if (command == 'hilih') {
     vocal = 'i'
   } else if (command == 'huluh') {
     vocal = 'u'
   } else if (command == 'heleh') {
     vocal = 'e'
   } else if (command == 'holoh') {
     vocal = 'o'
   }
   capt = value.replace(/[aiueo]/gi, vocal)
 m.reply(capt)
 break

case "fast":
  if (isMedia || isQuotedVideo) {
    m.reply(msg.wait);
    encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
    media = await client.downloadAndSaveMediaMessage(encmedia);
    ran = getRandom(".mp4");
    exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
      fs.unlinkSync(media);
      if (err) return m.reply(`Err: ${err}`);
      buff = fs.readFileSync(ran);
      client.sendMessage(from, buff, video, {
        mimetype: "video/mp4",
        quoted: mek,
      });
      fs.unlinkSync(ran);
    });
  } else if (isMedia || isQuotedAudio) {
    m.reply(msg.wait)
    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
    media = await client.downloadAndSaveMediaMessage(encmedia)
    ran = getRandom('.mp3')
    exec(`ffmpeg -i ${media} -filter:a "atempo=2,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
      fs.unlinkSync(media)
      if (err) return m.reply('Error!')
      buff = fs.readFileSync(ran)
						client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
    })
  } else {
    m.reply(msg.replyVid + '/' + msg.replyVn)
  }
  break;

case "slow":
  if (isMedia || isQuotedVideo) {
    m.reply(msg.wait);
    encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
    media = await client.downloadAndSaveMediaMessage(encmedia);
    ran = getRandom(".mp4");
    exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
      fs.unlinkSync(media);
      if (err) return m.reply(`Err: ${err}`);
      buff = fs.readFileSync(ran);
      client.sendMessage(from, buff, video, {
        mimetype: "video/mp4",
        quoted: mek,
      });
      fs.unlinkSync(ran);
    });
    } else if (isMedia || isQuotedAudio) {
      m.reply(msg.wait)
      encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
      media = await client.downloadAndSaveMediaMessage(encmedia)
      ran = getRandom('.mp3')
      exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
        fs.unlinkSync(media)
        if (err) return m.reply('Error!')
        buff = fs.readFileSync(ran)
        client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
        fs.unlinkSync(ran)
      })
    } else {
      m.reply(msg.replyVid + '/' + msg.replyVn)
    }
    break
    
case 'bc':
if (!isOwner) return reply(`Khusus Owner!`)     
anu = await client.chats.all()
caption = `${value}\n\n${readMore}𝗕𝗥𝗢𝗔𝗗𝗖𝗔𝗦𝗧`
for (let _ of anu) {
client.sendMessage(_.jid, caption, text, { contextInfo: { forwardingScore: 100, isForwarded: true }})
}
reply('Suksess broadcast ')
break

case "reverse":
  if (!isQuotedVideo) return reply(msg.replyVid);
  encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
  media = await client.downloadAndSaveMediaMessage(encmedia);
  m.reply(msg.wait)
  ran = getRandom(".mp4");
  exec(`ffmpeg -i ${media} -vf reverse -af areverse ${ran}`, (err) => {
    fs.unlinkSync(media);
    if (err) return m.reply(`Err: ${err}`);
    buffer453 = fs.readFileSync(ran);
    client.sendMessage(from, buffer453, video, {
      mimetype: "video/mp4",
      quoted: mek,
    });
    fs.unlinkSync(ran);
  });
  break

case 'gemuk':
  if (isBanned) return m.reply(msg.banned)
  if(!isQuotedAudio) return m.reply(msg.replyVn)
  encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
  media = await client.downloadAndSaveMediaMessage(encmedia)
  ran = getRandom('.mp3')
  exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
    fs.unlinkSync(media)
    if (err) return m.reply('Error!')
    buff = fs.readFileSync(ran)
    client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break

case 'tupai':
  if (isBanned) return m.reply(msg.banned)
  if(!isQuotedAudio) return m.reply(msg.replyVn)
  tupay = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
  tupai = await client.downloadAndSaveMediaMessage(tupay)
  m.reply()
  ran = getRandom('.mp3')
  exec(`ffmpeg -i ${tupai} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
    fs.unlinkSync(tupai)
    if (err) return m.reply('Error!')
    buff = fs.readFileSync(ran)
    client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
    fs.unlinkSync(ran)
  })
  break

case 'bass':
  if (isBanned) return m.reply(msg.banned) 
  	if(!isQuotedAudio) return m.reply(msg.replyVn)
  	bas = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
  	bass = await client.downloadAndSaveMediaMessage(bas)
  	ran = getRandom('.mp3')
  	m.reply(msg.wait)
  	exec(`ffmpeg -i ${bass} -af equalizer=f=${text}:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
  	  fs.unlinkSync(bass)
  	  if (err) return m.reply('Error!')
  	  buff = fs.readFileSync(ran)
  	  client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
   
case 'nightcore':
  if (isBanned) return m.reply(msg.banned)
	if(!isQuotedAudio) return m.reply(msg.replyVn) 
	night = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
	core = await client.downloadAndSaveMediaMessage(night)
  ran = getRandom('.mp3')
  m.reply(msg.wait)
  exec(`ffmpeg -i ${core} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
    fs.unlinkSync(core)
    if (err) return m.reply('Error!')
    buff = fs.readFileSync(ran)
    client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', quoted: mek, ptt: true})
    fs.unlinkSync(ran)
  })
  break

  case 'setfakethumb':
  if (isBanned) return m.reply(msg.banned)
   if(!isOwner) return m.reply(msg.owner)
   if(isMedia || isQuotedImage) {
   q = m.quoted ? m.quoted : m 
   thumb = await q.download() 
   fs.writeFileSync(`./temp/thumbnail.jpeg`, thumb)
   m.reply(msg.done)
   } else {
     m.reply(msg.replyImg)
   }
   break

 case 'setthumb':
 case 'setthumb':
   if(!isOwner) return m.reply(msg.owner)
   if(isMedia || isQuotedImage) {
   q = m.quoted ? m.quoted : m 
   thumb = await q.download() 
   fs.writeFileSync(`./temp/thumb.jpeg`, thumb)
   m.reply(msg.done)
   } else {
     m.reply(msg.replyImg)
   }
   break

 case 'fakethumb':
   if(isMedia || isQuotedImage) {
   q = m.quoted ? m.quoted : m 
   hasil = await q.download() 
   client.sendMessage(from, hasil, image, {quoted: mek, caption: msg.done, thumbnail: Buffer.alloc(0)})
   } else {
     m.reply(msg.replyImg)
   }
   break
 
 case 'tr':
 case 'translate':
  if (isBanned) return m.reply(msg.banned)
   if(!value) return m.reply(msg.notext)
   to = args[0]
   bahasa = {
     id: 'indonesia',
     en: 'english',
     ja: 'jepang',
     ko: 'korea',
     pt: 'portugal',
     ar: 'arab'
   }
   var lang = to || 'id' 
   if (!bahasa[lang]) return m.reply('Language not supported : ' + lang);
   if(!m.quoted) {
     word = value.split(lang)[1]
   } else if(m.quoted){
     word = m.quoted.text
   }
   await translate(word, { to: lang }).then(res => {
     capt = 'Translate ' + bahasa[to].toUpperCase()
     capt += '\nResult : ' + res.text
      return m.reply(capt) 
   }).catch(err => {
        return m.reply('Error')
      })
   break
 
 case 'fetch':
 case 'result':
 case 'view':
   if(!isOwner) return m.reply(msg.owner)
   res = await fetchText(value)
   m.reply(res)
   break
  
 
 case 'covid':
  if (isBanned) return m.reply(msg.banned)
   covid = await lxa.covid()
   capt = '*INFORMASI COVID INDONESIA*\n'
   capt += 'Positif : ' + covid.indo.indoP
   capt += '\nMeninggal : ' + covid.indo.indoM
   capt += '\nSembuh : ' + covid.indo.indoS
   capt += '\nLast Update : ' + covid.indo.indoU
   capt += '\n\n*INFORMASI COVID GLOBAL*' 
   capt += '\nJumlah : ' + covid.global.negara + ' Negara'
   capt += '\nPositif : ' + covid.global.positif
   capt += '\nMeninggal : ' + covid.global.meninggal
   capt += '\nLast Update : ' + covid.global.update
   m.reply(capt)
   break

 case 'cerpen':
  if (isBanned) return m.reply(msg.banned)
   cerpen = await lxa.RandomCerpen()
   if(cerpen.status === 500) return m.reply('Error')
   capt = '*Judul* : ' + cerpen.result.Judul
   capt += '\n*Karangan* : ' + cerpen.result.Penulis
   capt += '\n\n' + readMore + cerpen.result.cerita
   capt += '\n*Sumber* : ' + cerpen.result.sumber
   m.reply(capt)
   break
   
   case 'artinama':
  if (isBanned) return m.reply(msg.banned)
   if (!value) return m.reply(msg.notext)
   arti = await lxa.ArtiNama(value)
   if (!arti) return m.reply('Error')
   m.reply(arti.result.replace(/\n\n\n\n/, '').replace(`
      
        
        
          `, ''))
   break 
   
 case 'artimimpi':
  if (isBanned) return m.reply(msg.banned)
   if (!value) return m.replu(msg.notext)
   mimpi = await lxa.ArtiMimpi(value)
   if (!mimpi) return m.reply('Error')
   m.reply(mimpi.result.replace(/[.]/gi, '.\n\n').replace(`\n\n\n`, ''))
   break

case 'listpremium':
 case 'listprem':
   if(!isOwner) return m.reply(msg.owner)
   m.reply(msg.wait)
   capt = '*List Premium*'
   for (var u of User) {
    if (u.premium === true) {
      capt += '\nId : @' + u.id.split('@')[0]
    }
  }
  m.reply(capt)
  break

 case 'listban':
 case 'listbanned':
   if(!isOwner) return m.reply(msg.owner)
   m.reply(msg.wait)
   capt = '*List Banned*'
   for (var b of User) {
    if (b.banned === true) {
      capt += '\nId : @' + b.id.split('@')[0]
    }
  }
  m.reply(capt)
  break

case 'joox':
  if (isBanned) return m.reply(msg.banned)
    if (!value) return m.reply(msg.notext)
    m.reply(msg.wait) 
    res = await lxa.joox(value)
    json = JSON.parse(JSON.stringify(res))
    hasil = json.data[0]
    judul = hasil.lagu
    artis = hasil.penyanyi
    album = hasil.album
    foto = hasil.img
    lagu = hasil.mp3
    jooxy = await getBuffer(foto)
    path = await getBuffer(lagu)
    client.adReplyAudio(from, path, document, judul+' - '+artis, artis+' ('+album+')', jooxy, 'https://www.instagram.com/p/CTKtDqeBgY5/?utm_medium=copy_link')
  break

 case 'ytsearch':
 case 'yts':
  if (isBanned) return m.reply(msg.banned)
   if(!value) return m.reply(msg.notext)
   try {
     url = await yts(value);
   link = url.all
   capt = ''
   m.reply(msg.wait)
   link.map((video) => {
     capt += "\n________________________\n\n"
     capt += '*Title* : ' + video.title
     capt += '\n*Link* : ' + video.url
     capt += '\n*Durasi* : ' + video.timestamp
     capt += '\n*Upload* : ' + video.ago
   })
   capt += ''
   await client.adReply(from, capt, text, 'YT Search : ' + value, tanggal, thumb, link[0].url)
   } catch {
     return m.reply('Musik tidak ditemukan')
   }
  break

case 'music': case 'musik':{
                if (!value) return m.reply(`Kirim perintah *${command}* _query_`)
                url = await yts(value);
                link = url.all
                        let list = []
                        let startnum = 1
                        link.map((video) => {
                        let yy = { title: 'Data ke-'+ startnum++,
                        rows: [
                           {
                            title: `${video.title}`,
                            description: `\n\n*Duration: ${video.timestamp}*\n*Upload: ${video.ago}*\n*Url: ${video.url}*`,
                            rowId: prefix + 'ytmp3' + video.url
                          }
                        ]
                        }
                        list.push(yy)
                    })
                    listmsg(from, `Music Search`, `Pilih disini, Hasil Pencarian "${value}", Hanya untuk Premium User`, list)
            }
                break

 case "playstore":
 if (isBanned) return m.reply(msg.banned)
     if(!value) return m.reply(msg.notext)
     m.reply(msg.wait)
     let play = await lxa.playstore(value); 
     store = '*PLAY STORE*\n'
     for (let i of play) {
       store += `*Nama* : ${i.name}
*Link* : ${i.link}
*Dev* : ${i.developer}
*Link Dev* : ${i.link_dev}\n────────────────\n`;
        } 
     m.reply(store);
   break;

  case 'playmp3':
  if(!isPremium && !isOwner ) return m.reply(msg.noprem)
   if (!value) return m.reply(msg.notext)
   url = await yts(value);
   link = url.all 
   if(!link) return ('Error')
   m.reply(msg.wait)
  // img = await getBuffer(link[0].thumb)
   musik = `*Play Audio*

Ditemukan!!!
Lagu ${value}
Silakan Pilih Sesuai 
Pilihannmu
${readMore}
*Data ke 1*
Judul : ${link[0].title}

*Data ke 2*
Judul : ${link[1].title}

*Data ke 3*
Judul : ${link[2].title}` 
 client.send3ButtonLoc(from, ambrela, musik, 'Pilih lagu yang akan di download', 'Data ke 1', prefix + 'ytmp3 ' + link[0].url, 'Data ke 2', prefix + 'ytmp3 ' + link[1].url, 'Data ke 3', prefix + 'ytmp3 ' + link[2].url)
 break

 case 'ytmp3':
 if(!isPremium && !isOwner ) return m.reply(msg.noprem)
   if(!value) return m.reply(msg.nolink('youtube'));
   if(!isLinkyt(value)) return m.reply('Link invalid');
   m.reply(msg.wait)
   res = await lxa.yta(value)
   buff = await getBuffer(res.link)
   if (!buff) return m.reply('Error')
   if(Number(res.size.split(' MB')[0]) >= 5.00) {
     axios.get(`https://tinyurl.com/api-create.php?url=${res.link}`).then((G) => {
     return m.reply(msg.oversize + G.data)
     })
   } else {
     img = await getBuffer(res.thumb)
     capt = '\nQuality : ' + res.quality
     capt += '\nSize : ' + res.size
     client.adReplyAudio(from, buff, audio, res.judul, capt, img, value)
   }
	break

 case 'ytmp4':
 if(!isPremium && !isOwner ) return m.reply(msg.noprem)
   if(!value) return m.reply(msg.nolink('youtube'));
   if(!isLinkyt(value)) return m.reply('Link invalid');
   m.reply(msg.wait)
   res = await lxa.ytv(value)
   buff = await getBuffer(res.link)
   if (!buff) return m.reply('Error')
   if(Number(res.size.split(' MB')[0]) >= 20.00) {
     axios.get(`https://tinyurl.com/api-create.php?url=${res.link}`).then((G) => {
     return m.reply(msg.oversize + G.data)
     })
   } else {
     img = await getBuffer(res.thumb)
     capt = '\nQuality : ' + res.quality
     capt += '\nSize : ' + res.size
     await client.adReplyVideo(from, buff, video, res.judul, capt, img, value, mek)
   }
	break

case 'attp':
  if (isBanned) return m.reply(msg.banned)
              if (!value) return m.reply(`Example: ${prefix + command} YUDHA`)
              buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(value)}`)
              client.sendMessage(from, buffer, sticker, { quoted: mek })
              .catch((err) => {
                            m.reply('Eror')
                        })
              break

 case 'igvid':
 case 'igimg':
 case 'igdl':
   if(!isUrl(value) && !value) return m.reply(msg.nolink('instagram'));
   if(isUrl(value) && !value.match("instagram.com/p/")) return m.reply('Link invalid');
   m.reply(msg.wait)
   igdl = await lxa.igDl(value)
   buffer = await getBuffer(igdl.result.link)
   desk = igdl.result.desc
   if(!buffer) return m.reply('Error')
   if(igdl.result.link.match('.mp4')){
     if(!isPremium && !isOwner ) return m.reply(msg.noprem)
     client.sendMessage(from, buffer, video, {quoted: mek, caption: desk})
   } else {
     client.sendMessage(from, buffer, image, {quoted: mek, caption: desk, thumbnail: Buffer.alloc(0)})
   }
   break

 case 'reels':
 case 'reel':
   if(!isUrl(value) && !value) return m.reply(msg.nolink('instagram reel'));
   if(isUrl(value) && !value.match("instagram.com/reel")) return m.reply('Link invalid');
   m.reply(msg.wait)
   igdl = await lxa.igDl(value)
   buffer = await getBuffer(igdl.result.link)
   desk = igdl.result.desc
   if(!buffer) return m.reply('Error')
   if(!isPremium && !isOwner ) return m.reply(msg.noprem)
   client.sendMessage(from, buffer, video, {quoted: mek, caption: desk})
   break

  case 'hidetag':
  case 'notif':
  if (isBanned) return m.reply(msg.banned)
        if(!isOwner && !isAdmins) return m.reply(msg.admin)
        if (!isGroup) return m.reply(msg.group);
        if(!m.quoted) {
          tag = value
        } else if(m.quoted){
          tag = m.quoted.text
        } else {
          tag = ''
        }
        group = await client.groupMetadata(from);
        mention = groupMembers.map(u => u.jid) 
        var optionshidetag = {
          text: tag,
          contextInfo: { mentionedJid: mention },
          quoted: mek,
        };
        client.sendMessage(from, optionshidetag, text);
        break;

  case 'tagall':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    mention = groupMembers.map(u => u.jid) 
    m.reply('Tag all Member\n' + mention.map((v, i) => i + 1 + '. @' + v.replace(/@.+/, '')).join`\n`, null, {
    contextInfo: { mentionedJid: mention }
  })
  break

  case 'join':
    if(!value) return (`Link grupnya mana kak?`)
    join = value.split('https://chat.whatsapp.com/')[1]
    await client.acceptInvite(join).then((res) => {
      client.sendMessage(res.gid,`Hai 👋🏻\n@${sender.split("@")[0]} Telah Mengundang ku untuk masuk ke dalam Group`, text, {contextInfo:{mentionedJid:[sender]}})
      m.reply(`Succses Join Group!`)
      }).catch((err) => m.reply("‣ "+jsonformat(err)))
    break

  case 'link':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    code = await client.groupInviteCode(from)
    link = 'https://chat.whatsapp.com/'+code 
    m.reply(link)
    break
 
  case 'profile':
   //if(!siapa) return m.reply(msg.notag)
   if(!isGroup) return m.reply(msg.group)
   try {
	      ppimg = await client.getProfilePicture(siapa);
	    } catch {
	      ppimg = 'https://telegra.ph/file/7c0b1068736040b515d81.jpg';
	    }
	 Prema = cekPremium(siapa) ? 'Yes' : 'No'
   capt = '*PROFILE*\n\n'
   capt += '*Nomor* : ' + siapa.split('@')[0]
   capt += '\n*Nama* : ' + pushname
   capt += '\n*Bio* : ' + about
   capt += '\n*Premium* : ' + Prema
   capt += '\n*Bahasa* : ' + cekBahasa(siapa)
   capt += '\n*Level* : ' + cekLevel(siapa)
   capt += '\n*Poin* : ' + cekPoin(siapa)
   capt += '\n*Warning* : ' + cekWarn(siapa)
   client.sendMessage(from, capt, text, { quoted: mek })
   break
 
 case 'grouplist':
   if(!isOwner) return m.reply(msg.owner)
   capt = totalchat.filter(z => z.jid.endsWith('g.us')).map((z, i) =>`*${i + 1}.* ${client.getName(z.jid)}\nId : ${z.jid}\nStatus : ${z.read_only ? 'Left' : 'Joined'}`).join`\n\n`
  m.reply(capt)
  break

 case "inspect":
   if(!isOwner) return m.reply(msg.owner)
   try {
     if (!value) return m.reply(msg.nolink('Whatsapp'));
     url = value.split("https://chat.whatsapp.com/")[1];
     if(!url) return m.reply('Link invalid')
     mem = [];
     let { id, owner, subject, subjectOwner, desc, descId, participants, size, descOwner, descTime, creation, } = await client.query({ json: ["query", "invite", url], expect200: true, });
     fotoProf = await client.getProfilePicture(id);
     buff = await getBuffer(fotoProf)
     capt = '*Id* : ' + id 
     capt += owner ? '\n*Owner* : @' + owner.split('@')[0] : '\n*Owner* : -'
     capt += '\n*Nama* : ' + subject 
     capt += '\n*Dibuat* : ' + formatDate(creation * 1000)
     capt += '\n*Jumlah Member* : ' + size 
     capt += desc ? '\n*Deskripsi* : ' + desc : '\n*Deskripsi* : -'
     capt += '\n*Id Deskripsi* : ' + descId 
     capt += descOwner ? '\n*Deskripsi diubah oleh* : @' +  descOwner.split("@")[0] : '\n*Deskripsi diubah oleh* : -'
     capt += descTime ? '\n*Tanggal* : ' + formatDate(descTime * 1000) : '\n*Tanggal* : -' 
     capt += '\n\n*Kontak tersimpan* : \n'
          for (let y of participants) {
            capt += '- @' +  y.id.split("@")[0]
            capt += '\n'
            mem.push(y.id.replace(/@c.us/g, "@s.whatsapp.net"));
          }
          mem.push( owner ? owner.replace(/@c.us/g, "@s.whatsapp.net") : '-');
          mem.push( descOwner ? descOwner.replace(/@c.us/g, "@s.whatsapp.net") : '-');
          client.sendMessage(from, buff, image, {
            caption: capt,
            quoted: mek,
            contextInfo: { mentionedJid: mem },
          });
        } catch {
          m.reply("Link invalid");
        }
break
 
 case 'infogroup':
 case 'infogc':
   if(!isGroup) return m.reply(msg.group)
   try {
	      ppimg = await client.getProfilePicture(from);
	    } catch {
	      ppimg = 'https://telegra.ph/file/7c0b1068736040b515d81.jpg';
	    }
   isAntilink = isAntilink ? 'Yes' : 'No' 
   isAntidelete = isAntidelete ? 'Yes' : 'No' 
   isDetect = isDetect ? 'Yes' : 'No' 
   isWelcome = isWelcome ? 'Yes' : 'No' 
   isViewonce = isViewonce ? 'Yes' : 'No'
   creation = moment(groupMetadata.creation * 1000).tz('Asia/Jakarta').format(`DD-MM-YYYY`)
   ownergc = groupMetadata.owner.split('@')[0]
   capt = 'GROUP INFORMATIONS\n\n'
   capt += '*Nama* : ' + groupName
   capt += '\n*Di buat pada* : ' + creation
   capt += '\n*Owner* : @' + ownergc
   capt += '\n*Total Admin* : ' + groupAdmins.length
   capt += '\n*Total Member* : ' + groupMembers.length
   capt += '\n\nGROUP SETTING'
   capt += '\n*Antilink* : ' + isAntilink
   capt += '\n*Antidelete* : ' + isAntidelete
   capt += '\n*Antiviewonce* : ' + isViewonce
   capt += '\n*Detected* : ' + isDetect
   capt += '\n*Welcome* : ' + isWelcome
   capt += '\n\n*Deskripsi* : ' + groupDesc 
   client.sendMessage(from, capt, text, { quoted: mek })
break
 
 
  case 'revoke':
  if (isBanned) return m.reply(msg.banned)
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    await client.revokeInvite(from)
    m.reply(msg.done)
    break
  
  case 'warn':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isAdmins) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    await addWarn(dia)
    warn = cekWarn(dia)
    if (warn === 3) {
      client.groupRemove(from, [dia]).catch((e) => {console.log(`*ERROR:* ${e}`)})
      await delWarn(sender, 3)
      return m.reply(msg.bye)
     }
    m.reply(msg.addwarn)
    break

  case 'delwarn':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner && !isAdmins) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    warn = cekWarn(dia)
    if (warn === 0) {
      return m.reply(msg.nowarn)
    }
    await delWarn(dia, 1)
    m.reply(msg.delwarn)
    break

  case 'cekwarn':
    warn = cekWarn(siapa)
    m.reply(msg.cekwarn(warn))
    break

  case 'addpremium':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner) return m.reply(msg.owner)
    prem = cekPremium(dia)
    if (prem === true) {
      return m.reply(msg.isprem)
    }
    await addPremium(dia)
    m.reply(msg.done)
    break
    
  case 'delpremium':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner) return m.reply(msg.owner)
    prem = cekPremium(dia)
    if (prem === false) {
      return m.reply(msg.noprem)
    }
    await delPremium(dia)
    m.reply(msg.done)
    break
    
  case 'banned':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner) return m.reply(msg.owner)
    ban = cekBanned(dia)
    if (ban === true) {
      return m.reply(msg.ban)
    }
    await addBanned(dia)
    m.reply(msg.done)
    break
    
  case 'unbanned':
    if(!isGroup) return m.reply(msg.group)
    if(!isOwner) return m.reply(msg.owner)
    ban = cekBanned(dia)
    if (ban === false) {
      return m.reply(msg.noban)
    }
    await delBanned(dia)
    m.reply(msg.done)
    break

  case 'open':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    // allow everyone to send Message
    await client.groupSettingChange (from, GroupSettingChange.messageSend, false)
    m.reply(msg.open)
    break
    
  case 'close':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    // only allow admins to send messages
    await client.groupSettingChange (from, GroupSettingChange.messageSend, true)
    m.reply(msg.close)
    break
    
  case 'setname':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!value) return m.reply(msg.notext)
    await client.groupUpdateSubject(from, value)
    m.reply(msg.name(value))
    break

  case 'setppgc':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(isMedia || isQuotedImage) {
    q = m.quoted ? m.quoted : m 
    let img = await q.download() 
    await client.updateProfilePicture (from, img)
   } else {
     m.reply(msg.replyImg)
   }
    break

  case 'setppbot':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(isMedia || isQuotedImage) {
    q = m.quoted ? m.quoted : m 
    let img = await q.download() 
    id = client.user.jid
    await client.updateProfilePicture (from, img)
   } else {
     m.reply(msg.replyImg)
   }
    break

  case 'setdesk':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!value) return m.reply(msg.notext)
    await client.groupUpdateDescription(from, value)
    m.reply(msg.desk(value))
    break

  case 'kick':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    //if(dia === isAdmins) return m.reply(msg.isadmin)
    anu = "@"+dia.split('@')[0]
    capt = msg.kick(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
    await client.groupRemove(from, [dia])
    break

  case 'add':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    //if(!dia) return m.reply(msg.notag)
    user = value.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
    try {
    response = await client.groupAdd(from, [user])
    v = response.participants[0]
    invit = (Object.values(v))
    if(invit[0].code == 409) return m.reply(msg.onwa)
    else if(invit[0].code == 403){
    capt = msg.sendlink+"@"+user.split('@')[0]
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
    client.sendGroupV4Invite(from, user, invit[0].invite_code, invit[0].invite_code_exp, groupMetadata.subject , `${pushname} Invite you, to join a group`)
    }
    } catch (e) {
      m.reply(msg.nonum)
    }
    break 
  
  case 'undang':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.nonum)
    users = value.replace(/[^0-9]/g, '')+"@s.whatsapp.net"
    ini = await client.groupInviteCode(from)
    link = 'https://chat.whatsapp.com/'+ini 
    client.sendMessage(users, "@"+sender.split("@")[0]+"\nMengundang mu untuk masuk kedalam group\n"+link, text, {
          contextInfo: {
            mentionedJid: [sender],
          }})
          m.reply(msg.done)
    break

  case 'promote':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    // id & people to make admin (will throw error if it fails)
    await client.groupMakeAdmin (from, [dia])
    anu = "@"+dia.split('@')[0]
    capt = msg.promote(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
    break

  case 'demote':
    if(!isGroup) return m.reply(msg.group)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!dia) return m.reply(msg.notag)
    // id & people to make admin (will throw error if it fails)
    await client.groupDemoteAdmin (from, [dia]) //demote admins
    anu = "@"+dia.split('@')[0]
    capt = msg.demote(anu)
    m.reply(capt, null, {
          contextInfo: {
            mentionedJid: client.parseMention(capt),
          },
        });
    break

 case 'voting':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
   if(!value) return m.reply(msg.notext)
   client.vote = client.vote ? client.vote : {}
    if (from in client.vote) {
        await m.reply(msg.main('Voting'))
        return false
    }
    caption = `*VOTING*

Reason : ${value}

${prefix}vote untuk vote
${prefix}devote untuk devote`
    client.vote[from] = [
        await client.send2Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'Devote', false, { contextInfo:{
          mentionedJid: client.parseMention(caption)
        }}),
        [],
        [],
        value,
    ]
    break

 case 'hapusvote':
 case 'delvote':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
    if (!(from in client.vote)) {
        await m.reply(msg.nomain('Voting'))
        return false
    }
    delete client.vote[from]
    m.reply(msg.hapus('Voting'))
    break

 case 'vote':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in client.vote)) {
       m.reply(msg.nomain('Voting'))
       return false
    }
    vote = client.vote[from][1]
    devote = client.vote[from][2]
    inVote = vote.includes(sender)
    inDevote = devote.includes(sender)
    if (inVote) return m.reply(msg.inmain('Voting'))
    if (inDevote) return m.reply(msg.inmain('Voting'))
    vote.push(sender)
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
        caption = `*VOTING*

REASON : ${client.vote[from][3]}

VOTE : ${vote.length}
${listVote}

DEVOTE : ${devote.length}
${listDevote}`.trim()
    await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Cek Voting', prefix + 'cekvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
    break

 case 'devote':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in client.vote)) {
       m.reply(msg.nomain('Voting'))
       return false
    }
    vote = client.vote[from][1]
    devote = client.vote[from][2]
    inVote = vote.includes(sender)
    inDevote = devote.includes(sender)
    if (inVote) return m.reply(msg.inmain('Voting'))
    if (inDevote) return m.reply(msg.inmain('Voting'))
    devote.push(sender)
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
        caption = `*VOTING*

REASON : ${client.vote[from][3]}

VOTE : ${vote.length}
${listVote}

DEVOTE : ${devote.length}
${listDevote}`.trim()
    await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Cek Voting', prefix + 'cekvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
    break


 case 'cekvote':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
   if (!(from in client.vote)) {
        await m.reply(msg.nomain('Voting'))
        throw false
    }
    vote = client.vote[from][1]
    devote = client.vote[from][2]
    listVote = vote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listDevote = devote.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    caption = `*RESULT VOTING*

REASON : ${client.vote[from][3]}

VOTE : ${vote.length}
${listVote}

Devote : ${devote.length}
${listDevote}`.trim()
    await client.send3Button(from, caption, isWm, 'Vote', prefix + 'vote', 'Devote', prefix + 'devote', 'Hapus Voting', prefix + 'delvote', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
break

 case 'absenstart':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
   client.absen = client.absen ? client.absen : {}
    if (from in client.absen) {
        await m.reply(msg.main('Absen'))
        return false
    }
    mention = groupMembers.map(u => u.jid) 
    client.absen[from] = [
        await client.send2Button(from, `Absen dimulai`, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', false, { contextInfo:{
          mentionedJid: mention
        }}),
        [],
        [],
    ]
    break
 
 case 'hapusabsen':
 case 'delabsen':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
    if (!(from in client.absen)) {
        await m.reply(msg.nomain('Absensi'))
        throw false
    }
    delete client.absen[from]
    m.reply(msg.hapus('Absensi'))
    break
 
 case 'izin':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in client.absen)) {
       m.reply(msg.nomain('Absensi'))
       return false
    }
    absen = client.absen[from][1]
    izin = client.absen[from][2]
    inAbsen = absen.includes(sender)
    inIzin = izin.includes(sender)
    if (inAbsen) return m.reply(msg.inmain('Absen'))
    if (inIzin) return m.reply(msg.inmain('Absen'))
    izin.push(sender)
    listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
        caption = `
Tanggal: ${tanggal}

Daftar Absen
Total: ${absen.length}
${listAbsen}

Daftar Izin
Total: ${izin.length}
${listIzin}`.trim()
    await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Cek Absen', prefix + 'cekabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
    break

 case 'absen':
   if(!isGroup) return m.reply(msg.group)
   if (!(from in client.absen)) {
       m.reply(msg.nomain('Absensi'))
       return false
    }
    absen = client.absen[from][1]
    izin = client.absen[from][2]
    inAbsen = absen.includes(sender)
    inIzin = izin.includes(sender)
    if (inAbsen) return m.reply(msg.inmain('Absen'))
    if (inIzin) return m.reply(msg.inmain('Absen'))
    absen.push(sender)
    listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    caption = `
Tanggal: ${tanggal}

Daftar Absen
Total: ${absen.length}
${listAbsen}

Daftar Izin
Total: ${izin.length}
${listIzin}`.trim()
    await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Cek Absen', prefix + 'cekabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
 break

 case 'cekabsen':
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins) return m.reply(msg.admin)
   if (!(from in client.absen)) {
        await m.reply(msg.nomain('Absensi'))
        throw false
    }
    absen = client.absen[from][1]
    izin = client.absen[from][2]
    listAbsen = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    listIzin = izin.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    caption = `
Tanggal: ${tanggal}

Daftar Absen
Total: ${absen.length}
${listAbsen}

Daftar Izin
Total: ${izin.length}
${listIzin}`.trim()
    await client.send3Button(from, caption, isWm, 'Absen', prefix + 'absen', 'Izin', prefix + 'izin', 'Hapus Absen', prefix + 'hapusabsen', false, { contextInfo: { mentionedJid: client.parseMention(caption) } })
break

  case 'welcome':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isWelcome === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addWelcome(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isWelcome === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delWelcome(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
  case 'antidelete':
    if(!isGroup) return m.reply(msg.group)
    if (!isPremium && !isOwner) return m.reply(msg.noprem)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isAntidelete === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addAntidelete(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isAntidelete === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delAntidelete(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break

  case 'detect':
    if(!isGroup) return m.reply(msg.group)
    if (!isPremium && !isOwner) return m.reply(msg.noprem)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isDetect === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addDetect(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isDetect === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delDetect(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
    
  case 'antilink':
    if(!isGroup) return m.reply(msg.group)
    if (!isPremium && !isOwner) return m.reply(msg.noprem)
    if(!isAdmins) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isAntilink === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addAntilink(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isAntilink === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delAntilink(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break

  case 'antiviewonce':
    if(!isGroup) return m.reply(msg.group)
    if (!isPremium && !isOwner) return m.reply(msg.noprem)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    if(!isBotAdmins) return m.reply(msg.botadmin)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isViewonce === true ) return m.reply(msg.Thison(command.toUpperCase()))
      await addViewonce(from)
      m.reply(msg.On(command.toUpperCase()))
    } else if (value.toLowerCase() === "off") {
      if(isViewonce === false ) return m.reply(msg.Thisoff(command.toUpperCase()))
      await delViewonce(from)
      m.reply(msg.Off(command.toUpperCase()))
    } else {
      m.reply(msg.OnorOff)
    }
    break
           

  case 'chatbot':
  if (isBanned) return m.reply(msg.banned) // atur sesukamu
   // if(!isPremium) return m.reply(msg.premium)
   // if(isGroup) return m.reply(msg.private)
    if(!value) return m.reply(msg.OnorOff)
    if (value.toLowerCase() === "on") {
      if(isChatbot === true ) return m.reply('Chatbot On')
      await addChatbot(sender)
      m.reply(msg.done)
    } else if (value.toLowerCase() === "off") {
      if(isChatbot === false ) return m.reply('Chatbot off')
      await delChatbot(sender)
      m.reply(msg.done)
    } else {
      m.reply(msg.OnorOff)
    }
    break
 
  case 'q':
  if (isBanned) return m.reply(msg.banned) 
    if (!m.quoted) return m.reply(msg.reply)
    let qse = client.serializeM(await m.getQuotedObj())
    if (!qse.quoted) return m.reply(msg.noreply)
    await qse.quoted.copyNForward(from, true)
    break 
 
   case 'suit':
  if (isBanned) return m.reply(msg.banned)
    salah = `Pilihan yang tersedia Gunting, Kertas, Batu\n\n*Contoh* : ${prefix}suit gunting\n`
    poin = 200
    if (!value) return m.reply(salah)
    var suit = Math.random()
    if (suit < 0.34) {
        suit = 'batu'
    } else if (suit > 0.34 && suit < 0.67) {
        suit = 'gunting'
    } else {
        suit = 'kertas'
    }
    //menentukan rules
    if (value == suit) {
      await addPoin(sender, 50)
        m.reply(`*Kita Seri*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (±)100 XP`)
    } else if (value == 'batu') {
        if (suit == 'gunting') {
          await addPoin(sender, poin)
            m.reply(`*Kamu Menang*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          await delPoin(sender, poin)
            m.reply(`*Kamu Kalah*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else if (value == 'gunting') {
        if (suit == 'kertas') {
          await addPoin(sender, poin)
            m.reply(`*Kamu Menang*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          await delPoin(sender, poin)
            m.reply(`*Kamu Kalah*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else if (value == 'kertas') {
        if (suit == 'batu') {
          await addPoin(sender, poin)
            m.reply(`*Kamu Menang*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (+)${poin} XP`)
        } else {
          await delPoin(sender, poin)
            m.reply(`*Kamu Kalah*\n\nkamu : ${value}\nBot : ${suit}\n\nPoin (-)${poin} XP`)
        }
    } else {
       m.reply(salah)
    }
    break
 
 
  case 'asahotak':
  case 'siapaaku':
  case 'tebakkalimat':
  case 'tebakkata':
  case 'tekateki':
  case 'tebaklirik':
      client.game = client.game ? client.game : {}
      if (isBanned) return m.reply(msg.banned)
    if (from in client.game) {
        client.reply(from, msg.onGame, client.game[from][0])
        return false
        } 
        data = fs.readFileSync(`./result/game/${command}.js`);
        list = JSON.parse(data);
        random = Math.floor(Math.random() * list.length);
        json = list[random]
        caption = msg.soal(json.soal, (isGamewaktu / 1000).toFixed(2), isPoingame).trim()
    client.game[from] = [
        await client.reply(from, caption, m),
        json.jawaban,
        setTimeout(() => {
          capt = client.game[from][1].replace(/[aiueoAIUEO]/gi, '_')
          m.reply("*Clue*\n"+capt.toUpperCase())
        }, isGamewaktu - 10000),
        setTimeout(() => {
           client.reply(from, msg.timeout + client.game[from][1].toUpperCase(), client.game[from][0])
            delete client.game[from]
        }, isGamewaktu)
    ]
 break
 
 case 'mathkuis':
 client.game = client.game ? client.game : {}
 if (isBanned) return m.reply(msg.banned)
 if(itsMe) return
 if (!value) return m.reply(`Pilih Levelnya!\n\nList Level\n-easy\n-medium\n-hard\n-impossible\n\n${readMore}Contoh:\n.mathkuis hard`)
    if (from in client.game) {
        client.reply(from, msg.onGame, client.game[from][0])
        return false
        } 
        let buh = await fetchJson(`https://h4ck3rs404-api.herokuapp.com/api/kuis/math?mode=${value}&apikey=404Api`)
        buh_result = buh.result
        caption = msg.soal(buh.result.soal, (isGamewaktu / 1000).toFixed(2), isPoingame).trim()
    client.game[from] = [
        await client.reply(from, caption, m),
        buh_result.jawaban,
        setTimeout(() => {
          capt = client.game[from][1].replace(/[1-5]/gi, '_')
          m.reply("*Clue*\n"+capt.toUpperCase())
        }, isGamewaktu - 10000),
        setTimeout(() => {
           client.reply(from, msg.timeout + client.game[from][1].toUpperCase(), client.game[from][0])
            delete client.game[from]
        }, isGamewaktu)
    ]
 break

  case 'susunkata':
      client.game = client.game ? client.game : {}
      if (isBanned) return m.reply(msg.banned)
    if (from in client.game) {
        client.reply(from, msg.onGame, client.game[from][0])
        return false
        } 
        data = fs.readFileSync(`./result/game/susunkata.js`);
        list = JSON.parse(data);
        random = Math.floor(Math.random() * list.length);
        json = list[random]
        caption = msg.soal(json.soal + '\n\n*Tipe* : ' + json.tipe, (isGamewaktu / 1000).toFixed(2), isPoingame).trim()
    client.game[from] = [
        await client.reply(from, caption, m),
        json.jawaban,
        setTimeout(() => {
          capt = client.game[from][1].replace(/[aiueoAIUEO]/gi, '_')
          m.reply("*Clue*\n"+capt.toUpperCase())
        }, isGamewaktu - 10000),
        setTimeout(() => {
           client.reply(from, msg.timeout + client.game[from][1].toUpperCase(), client.game[from][0])
            delete client.game[from]
        }, isGamewaktu)
    ]
 break

  case 'mode':
   if(!isOwner) return m.reply(msg.owner)
   capt = 'USE MODE *ONEPREF*, *NOPREF*, *MULTI*'
   client.send3Button(from, capt, 'Choose what you want', 'One Prefix', prefix + 'onepref', 'No Prefix', prefix + 'nopref', 'Multi Prefix', prefix + 'multi')
   break
 
  case 'multi':
  case 'onepref':
  case 'nopref':
    if (!isOwner) return m.reply(msg.owner)
    //if (!value) return m.reply(msg.notext)
    if (command === 'multi') {
      if(Use.multi) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = true
      Use.nopref = false
      Use.onepref = false
      m.reply(msg.done)
    } else if (command === 'nopref') {
      if(Use.nopref) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = false
      Use.onepref = false
      Use.nopref = true
      m.reply(msg.done)
    } else if (command === 'onepref') {
      if(Use.onepref) return m.reply(msg.Thison(command.toUpperCase()))
      Use.multi = false
      Use.nopref = false
      Use.onepref = true
      m.reply(msg.done + ' Prefix ' + Use.prefix)
    }
    break

  case 'delwelcome':
  case 'delbye':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.owner)
    if(command.includes('welcome')){
      await delCustomWelcome(from)
      m.reply(msg.default('WELCOME'))
    } else if(command.includes('bye')){
      await delCustomBye(from)
      m.reply(msg.default('BYE'))
    }
  break

  case 'setwelcome':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
    fungsi = `
@tag = @${sender.split('@')[0]}
@nama = ${pushname}
@about = ${about}
@tanggal = ${tanggal}
@group = ${groupName}`
    if(!value) return m.reply(msg.setwel(fungsi))
     await setCustomWelcome(from, value)
     m.reply(msg.setweldone(value, fungsi))
     break

  case 'setbye':
    if(!isGroup) return m.reply(msg.group)
    if(!isAdmins && !isOwner) return m.reply(msg.admin)
fungsi = `
@tag = @${sender.split('@')[0]}
@nama = ${pushname}
@about = ${about}
@tanggal = ${tanggal}
@group = ${groupName}`
    if(!value) return m.reply(msg.setbye(fungsi))
    await setCustomBye(from, value)
    m.reply(msg.setbyedone(value, fungsi))
    break
case 'bucin':
if (isBanned) return m.reply(msg.banned)
					const katakata = [
  "Aku memilih untuk sendiri, bukan karena menunggu yang sempurna, tetapi butuh yang tak pernah menyerah.",
  "Seorang yang single diciptakan bersama pasangan yang belum ditemukannya.",
  "Jomblo. Mungkin itu cara Tuhan untuk mengatakan 'Istirahatlah dari cinta yang salah'.",
  "Jomblo adalah anak muda yang mendahulukan pengembangan pribadinya untuk cinta yang lebih berkelas nantinya.",
  "Aku bukan mencari seseorang yang sempurna, tapi aku mencari orang yang menjadi sempurna berkat kelebihanku.",
  "Pacar orang adalah jodoh kita yang tertunda.",
  "Jomblo pasti berlalu. Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah.",
  "Romeo rela mati untuk juliet, Jack mati karena menyelamatkan Rose. Intinya, kalau tetap mau hidup, jadilah single.",
  "Aku mencari orang bukan dari kelebihannya tapi aku mencari orang dari ketulusan hatinya.",
  "Jodoh bukan sendal jepit, yang kerap tertukar. Jadi teruslah berada dalam perjuangan yang semestinya.",
  "Kalau kamu jadi senar gitar, aku nggak mau jadi gitarisnya. Karena aku nggak mau mutusin kamu.",
  "Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya.",
  "Sayang... Tugas aku hanya mencintaimu, bukan melawan takdir.",
  "Saat aku sedang bersamamu rasanya 1 jam hanya 1 detik, tetapi jika aku jauh darimu rasanya 1 hari menjadi 1 tahun.",
  "Kolak pisang tahu sumedang, walau jarak membentang cintaku takkan pernah hilang.",
  "Aku ingin menjadi satu-satunya, bukan salah satunya.",
  "Aku tidak bisa berjanji untuk menjadi yang baik. Tapi aku berjanji akan selalu mendampingi kamu.",
  "Kalau aku jadi wakil rakyat aku pasti gagal, gimana mau mikirin rakyat kalau yang selalu ada dipikiran aku hanyalah dirimu.",
  "Lihat kebunku, penuh dengan bunga. Lihat matamu, hatiku berbunga-bunga.",
  "Berjanjilah untuk terus bersamaku sekarang, esok, dan selamanya.",
  "Rindu tidak hanya muncul karena jarak yang terpisah. Tapi juga karena keinginan yang tidak terwujud.",
  "Kamu tidak akan pernah jauh dariku, kemanapun aku pergi kamu selalu ada, karena kamu selalu di hatiku, yang jauh hanya raga kita bukan hati kita.",
  "Aku tahu dalam setiap tatapanku, kita terhalang oleh jarak dan waktu. Tapi aku yakin kalau nanti kita pasti bisa bersatu.",
  "Merindukanmu tanpa pernah bertemu sama halnya dengan menciptakan lagu yang tak pernah ternyayikan.",
  "Ada kalanya jarak selalu menjadi penghalang antara aku sama kamu, namun tetap saja di hatiku kita selalu dekat.",
  "Jika hati ini tak mampu membendung segala kerinduan, apa daya tak ada yang bisa aku lakukan selain mendoakanmu.",
  "Mungkin di saat ini aku hanya bisa menahan kerinduan ini. Sampai tiba saatnya nanti aku bisa bertemu dan melepaskan kerinduan ini bersamamu.",
  "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
  "Dalam dinginnya malam, tak kuingat lagi; Berapa sering aku memikirkanmu juga merindukanmu.",
  "Merindukanmu itu seperti hujan yang datang tiba-tiba dan bertahan lama. Dan bahkan setelah hujan reda, rinduku masih terasa.",
  "Sejak mengenalmu bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu.",
  "Tahu gak perbedaan pensi sama wajah kamu? Kalau pensil tulisannya bisa dihapus, tapi kalau wajah kamu gak akan ada yang bisa hapus dari pikiran aku.",
  "Bukan Ujian Nasional besok yang harus aku khawatirkan, tapi ujian hidup yang aku lalui setelah kamu meninggalkanku.",
  "Satu hal kebahagiaan di sekolah yang terus membuatku semangat adalah bisa melihat senyumanmu setiap hari.",
  "Kamu tahu gak perbedaanya kalau ke sekolah sama ke rumah kamu? Kalo ke sekolah pasti yang di bawa itu buku dan pulpen, tapi kalo ke rumah kamu, aku cukup membawa hati dan cinta.",
  "Aku gak sedih kok kalo besok hari senin, aku sedihnya kalau gak ketemu kamu.",
  "Momen cintaku tegak lurus dengan momen cintamu. Menjadikan cinta kita sebagai titik ekuilibrium yang sempurna.",
  "Aku rela ikut lomba lari keliling dunia, asalkan engkai yang menjadi garis finishnya.",
  "PR-ku adalah merindukanmu. Lebih kuat dari Matematika, lebih luas dari Fisika, lebih kerasa dari Biologi.",
  "Cintaku kepadamu itu bagaikan metabolisme, yang gak akan berhenti sampai mati.",
  "Kalau jelangkungnya kaya kamu, dateng aku jemput, pulang aku anter deh.",
  "Makan apapun aku suka asal sama kamu, termasuk makan ati.",
  "Cinta itu kaya hukuman mati. Kalau nggak ditembak, ya digantung.",
  "Mencintaimu itu kayak narkoba: sekali coba jadi candu, gak dicoba bikin penasaran, ditinggalin bikin sakaw.",
  "Gue paling suka ngemil karena ngemil itu enak. Apalagi ngemilikin kamu sepenuhnya...",
  "Dunia ini cuma milik kita berdua. Yang lainnya cuma ngontrak.",
  "Bagi aku, semua hari itu adalah hari Selasa. Selasa di Surga bila dekat denganmu...",
  "Bagaimana kalau kita berdua jadi komplotan penjahat? Aku curi hatimu dan kamu curi hatiku.",
  "Kamu itu seperti kopi yang aku seruput pagi ini. Pahit, tapi bikin nagih.",
  "Aku sering cemburu sama lipstikmu. Dia bisa nyium kamu tiap hari, dari pagi sampai malam.",
  "Hanya mendengar namamu saja sudah bisa membuatku tersenyum seperti orang bodoh.",
  "Aku tau teman wanitamu bukan hanya satu, dan menyukaimu pun bukan hanya aku.",
  "Semenjak aku berhenti berharap pada dirimu, aku jadi tidak semangat dalam segala hal..",
  "Denganmu, jatuh cinta adalah patah hati paling sengaja.",
  "Sangat sulit merasakan kebahagiaan hidup tanpa kehadiran kamu disisiku.",
  "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
  "Sendainya kamu tahu, sampai saat ini aku masih mencintaimu.",
  "Terkadang aku iri sama layangan..talinya putus saja masih dikejar kejar dan gak rela direbut orang lain...",
  "Aku tidak tahu apa itu cinta, sampai akhirnya aku bertemu denganmu. Tapi, saat itu juga aku tahu rasanya patah hati.",
  "Mengejar itu capek, tapi lebih capek lagi menunggu\nMenunggu kamu menyadari keberadaanku...",
  "Jangan berhenti mencinta hanya karena pernah terluka. Karena tak ada pelangi tanpa hujan, tak ada cinta sejati tanpa tangisan.",
  "Aku punya sejuta alasan unutk melupakanmu, tapi tak ada yang bisa memaksaku untuk berhenti mencintaimu.",
  "Terkadang seseorang terasa sangat bodoh hanya untuk mencintai seseorang.",
  "Kamu adalah patah hati terbaik yang gak pernah aku sesali.",
  "Bukannya tak pantas ditunggu, hanya saja sering memberi harapan palsu.",
  "Sebagian diriku merasa sakit, Mengingat dirinya yang sangat dekat, tapi tak tersentuh.",
  "Hal yang terbaik dalam mencintai seseorang adalah dengan diam-diam mendo akannya.",
  "Kuharap aku bisa menghilangkan perasaan ini secepat aku kehilanganmu.",
  "Demi cinta kita menipu diri sendiri. Berusaha kuat nyatanya jatuh secara tak terhormat.",
  "Anggaplah aku rumahmu, jika kamu pergi kamu mengerti kemana arah pulang. Menetaplah bila kamu mau dan pergilah jika kamu bosan...",
  "Aku bingung, apakah aku harus kecewa atu tidak? Jika aku kecewa, emang siapa diriku baginya?\n\nKalau aku tidak kecewa, tapi aku menunggu ucapannya.",
  "Rinduku seperti ranting yang tetap berdiri.Meski tak satupun lagi dedaunan yang menemani, sampai akhirnya mengering, patah, dan mati.",
  "Kurasa kita sekarang hanya dua orang asing yang memiliki kenangan yang sama.",
  "Buatlah aku bisa membencimu walau hanya beberapa menit, agar tidak terlalu berat untuk melupakanmu.",
  "Aku mencintaimu dengan segenap hatiku, tapi kau malah membagi perasaanmu dengan orang lain.",
  "Mencintaimu mungkin menghancurkanku, tapi entah bagaimana meninggalkanmu tidak memperbaikiku.",
  "Kamu adalah yang utama dan pertama dalam hidupku. Tapi, aku adalah yang kedua bagimu.",
  "Jika kita hanya bisa dipertemukan dalam mimpi, aku ingin tidur selamanya.",
  "Melihatmu bahagia adalah kebahagiaanku, walaupun bahagiamu tanpa bersamaku.",
  "Aku terkadang iri dengan sebuah benda. Tidak memiliki rasa namun selalu dibutuhkan. Berbeda dengan aku yang memiliki rasa, namun ditinggalkan dan diabaikan...",
  "Bagaimana mungkin aku berpindah jika hanya padamu hatiku bersinggah?",
  "Kenangan tentangmu sudah seperti rumah bagiku. Sehingga setiap kali pikiranku melayang, pasti ujung-ujungnya akan selalu kembali kepadamu.",
  "Kenapa tisue bermanfaat? Karena cinta tak pernah kemarau. - Sujiwo Tejo",
  "Kalau mencintaimu adalah kesalahan, yasudah, biar aku salah terus saja.",
  "Sejak kenal kamu, aku jadi pengen belajar terus deh. Belajar jadi yang terbaik buat kamu.",
  "Ada yang bertingkah bodoh hanya untuk melihatmu tersenyum. Dan dia merasa bahagia akan hal itu.",
  "Aku bukan orang baik, tapi akan belajar jadi yang terbaik untuk kamu.",
  "Kita tidak mati, tapi lukanya yang membuat kita tidak bisa berjalan seperti dulu lagi.",
  "keberadaanmu bagaikan secangkir kopi yang aku butuhkan setiap pagi, yang dapat mendorongku untuk tetap bersemangat menjalani hari.",
  "Aku mau banget ngasih dunia ke kamu. Tapi karena itu nggak mungkin, maka aku akan kasih hal yang paling penting dalam hidupku, yaitu duniaku.",
  "Mending sing humoris tapi manis, ketimbang sok romantis tapi akhire tragis.",
  "Ben akhire ora kecewa, dewe kudu ngerti kapan waktune berharap lan kapan kudu mandeg.",
  "Aku ki wong Jowo seng ora ngerti artine 'I Love U'. Tapi aku ngertine mek 'Aku tresno awakmu'.",
  "Ora perlu ayu lan sugihmu, aku cukup mok setiani wes seneng ra karuan.",
  "Cintaku nang awakmu iku koyok kamera, fokus nang awakmu tok liyane mah ngeblur.",
  "Saben dino kegowo ngimpi tapi ora biso nduweni.",
  "Ora ketemu koe 30 dino rasane koyo sewulan.",
  "Aku tanpamu bagaikan sego kucing ilang karete. Ambyar.",
  "Pengenku, Aku iso muter wektu. Supoyo aku iso nemokne kowe lewih gasik. Ben Lewih dowo wektuku kanggo urip bareng sliramu.",
  "Aku ora pernah ngerti opo kui tresno, kajaba sak bare ketemu karo sliramu.",
  "Cinta aa ka neng moal leungit-leungit sanajan aa geus kawin deui.",
  "Kasabaran kaula aya batasna, tapi cinta kaula ka anjeun henteu aya se epna.",
  "Kanyaah akang moal luntur najan make Bayclean.",
  "Kenangan endah keur babarengan jeung anjeun ek tuluy diinget-inget nepi ka poho.",
  "Kuring moal bakal tiasa hirup sorangan, butuh bantosan jalmi sejen.",
  "Nyaahna aa ka neg teh jiga tukang bank keur nagih hutang (hayoh mumuntil).",
  "Kasabaran urang aya batasna, tapi cinta urang ka maneh moal aya beakna.",
  "Hayang rasana kuring ngarangkai kabeh kata cinta anu aya di dunya ieu, terus bade ku kuring kumpulkeun, supaya anjeun nyaho gede pisan rasa cinta kuring ka anjeun.",
  "Tenang wae neng, ari cinta Akang mah sapertos tembang krispatih; Tak lekang oleh waktu.",
  "Abdi sanes jalmi nu sampurna pikeun anjeun, sareng sanes oge nu paling alus kanggo anjeun. Tapi nu pasti, abdi jalmi hiji-hijina nu terus emut ka anjeun.",
  "Cukup jaringan aja yang hilang, kamu jangan.",
  "Sering sih dibikin makan ati. Tapi menyadari kamu masih di sini bikin bahagia lagi.",
  "Musuhku adalah mereka yang ingin memilikimu juga.",
  "Banyak yang selalu ada, tapi kalo cuma kamu yang aku mau, gimana?",
  "Jam tidurku hancur dirusak rindu.",
  "Cukup China aja yang jauh, cinta kita jangan.",
  "Yang penting itu kebahagiaan kamu, aku sih gak penting..",
  "Cuma satu keinginanku, dicintai olehmu..",
  "Aku tanpamu bagaikan ambulans tanpa wiuw wiuw wiuw.",
  "Cukup antartika aja yang jauh. Antarkita jangan."
]
                hata = pickRandom(katakata)
				client.sendButton(from, hata + '\nBy Riu~', msg.next(command), 'Next', prefix + command)
					break
            
case 'playmp4': 
if (isBanned) return m.reply(msg.banned)
  if (!isPremium && !isOwner ) return m.reply(msg.noprem)
  if (!value) return m.reply(msg.notext)
   url = await yts(value);
   link = url.all 
   if(!link) return ('Error')
   m.reply(msg.wait)
  // img = await getBuffer(link[0].thumb)
   musik = `
*Play Audio*

Ditemukan!!!
Lagu ${value}
Silakan Pilih Sesuai 
Pilihannmu
${readMore}
*Data ke 1*
Judul : ${link[0].title}

*Data ke 2*
Judul : ${link[1].title}

*Data ke 3*
Judul : ${link[2].title}` 
 client.send3ButtonLoc(from, ambrela, musik, 'Pilih lagu yang akan di download', 'Data ke 1', prefix + 'ytmp4 ' + link[0].url, 'Data ke 2', prefix + 'ytmp4 ' + link[1].url, 'Data ke 3', prefix + 'ytmp4 ' + link[2].url)
	break

 case 'simulasi' :
   if(!isGroup) return m.reply(msg.group)
   if(!isAdmins && !isOwner) return m.reply(msg.admin)
   if(!value) return m.reply('List Simulasi\n\n- Welcome\n-Bye')
   welc = getCustomWelcome(from)
   bye = getCustomBye(from)
   tag = '@'+sender.split('@')[0]
   if(value.toLowerCase() === 'welcome') {
     capt = welc.replace('@tag', tag).replace('@nama', pushname).replace('@about', about).replace('@tanggal', tanggal).replace('@group', groupName)
     client.adReply(from, capt, text, 'Selamat datang member baru', 'Member ke ' + groupMembers.length + ' Group ' + groupName, thumb, 'https://www.instagram.com/p/CTKtDqeBgY5/?utm_medium=copy_link');
     } else if(value.toLowerCase() === 'bye') {
       capt = bye.replace('@tag', tag).replace('@nama', pushname).replace('@about', about).replace('@tanggal', tanggal).replace('@group', groupName)
       m.reply(capt)
     } else {
       m.reply('List Simulasi\n\n- Welcome\n- Bye')
     }
  break

  default:
  
    if (budy.startsWith('$')){
      if (!mek.key.fromMe && !isOwner) return;
      qur = budy.slice(2);
      exec(qur, (err, stdout) => {
        if (err) return m.reply(`‣  ${err}`);
        if (stdout) {
          m.reply(stdout)
        }
      });
    }
          
    if (budy.startsWith('>')){
      if (!mek.key.fromMe && !isOwner) return;
      try {
        client.sendMessage(from, "‣ "+JSON.stringify(eval(budy.slice(2)),null,'\t'), text, {quoted: mek});
        } catch(err) {
          e = String(err);
          m.reply("‣ "+e);
        }
    }
}

    let isLink = 'https://chat.whatsapp.com/'
    if(budy.match(isLink) && isAntilink === true ) {
      if(isAdmins) return
      if(!isBotAdmins) return
      code = await client.groupInviteCode(from) 
      if(budy.match(isLink+code)) {
        return !0
      } else {
        m.reply(msg.antilink)
        await addWarn(sender)
        m.reply(msg.addwarn)
        cek = await cekWarn(sender)
        if(cek === 3) {
          await client.groupRemove(from, [sender])
          await delWarn(sender, 3)
        }
      }
    }


// user afl
let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let isOnAfk = cekAfk(jid);
    let isOnAfkTime = cekAfkTime(jid);
    let isOnAfkReason = cekAfkReason(jid);
      if(isOnAfk && isGroup) {
        return m.reply(msg.inAfk(isOnAfkReason, isOnAfkTime))
      }
  }
  


/**
 * url 1 = https://api.simsimi.net/v2/?text=${budy}&lc=id&cf=false
 * url 2 = https://api-sv2.simsimi.net/v2/?text=${budy}&lc=id&cf=false 
 * chatbot // atur sesukamu su pilih salah satu kalo eror
*/

if(!isCmd && isChatbot === true){
 // if(!mek.isBaileys) return
 // if(isGroup) return
 // if(!isPremium) return
  if(m.mtype == 'stickerMessage') return
  result = await fetchJson(`https://api.simsimi.net/v2/?text=${budy}&lc=id`, {method: 'get'})
  m.reply(result.success.replace('simsimi', 'Riu').replace('Simsimi', 'Riu').replace('simi', 'Riu').replace('Simi', 'Riu').replace('sim', 'Riu'))
}

// antiview once
if (m.mtype == 'viewOnceMessage' && isViewonce === true){
  msg = {...mek}
  msg.message = mek.message.viewOnceMessage.message
  msg.message[Object.keys(msg.message)[0]].viewOnce = false
  m.reply('ViewOnce detected!')
  client.copyNForward(from, msg)
}

// game answer
   if (!client.game || !m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.quoted.text) return !0
    if (client.game[from] && m.quoted.from == client.game[from][0].from) {
        if (m.text.toLowerCase() == client.game[from][1].toLowerCase().trim()) {
            m.reply(msg.benar(client.game[from][1].toUpperCase(), isPoingame))
            await addPoin(sender, isPoingame)
            clearTimeout(client.game[from][2])
            clearTimeout(client.game[from][3])
            delete client.game[from]
        } else if (similarity(m.text.toLowerCase(), client.game[from][1].toLowerCase().trim()) >= threshold) m.reply(msg.hampir)
        else m.reply(msg.salah)
    }
    

} catch (e) {
  console.log(bgcolor('‣ Alert :', 'red'), e);
}
};

/**
 * End of proyek WhatsApp bot using baileys 
 * 
 * Thank to 
 - https://github.com/MhankBarBar/weabot
 - https://github.com/Nurutomo/wabot-aq
 - All owner bot 
*/
