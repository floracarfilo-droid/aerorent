
const DEPOSIT = 3000;

const provinces = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir",
  "Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli",
  "Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane",
  "Hakkari","Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli",
  "Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş",
  "Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ",
  "Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt",
  "Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis",
  "Osmaniye","Düzce"
];

// id, günlük fiyat
const carsData = [
  ['audi-a3',2200],
  ['audia6',2200],
  ['audiq2',2200],
  ['audiq7',2200],
  ['bmw218',2200],
  ['bmw320',2200],
  ['bmw520',2200],
  ['citroencelysee',1500],
  ['fiat-egea',1500],
  ['ford-courier',1100],
  ['ford-fiesta',1100],
  ['ford-focus',1400],
  ['ford-puma',1400],
  ['honda-civic',1400],
  ['honda-crv',1800],
  ['hyundai-elantra',1400],
  ['hyundai-i20',1100],
  ['hyundai-i30',1400],
  ['hyundai-tucson',1800],
  ['mercedes180',2200],
  ['mercedesc200',2200],
  ['mercedesvclass',2200],
  ['peugeot3008',1800],
  ['peugeot301',1100],
  ['peugeot408',1800],
  ['peugeot508',1800],
  ['renault-clio',1100],
  ['renault-taliant',1100],
  ['renaultmeganehacthback',1400],
  ['seat-leon',1500],
  ['seatibiza',1100],
  ['toyotacorolla',1400],
  ['toyotaproacecity',1100],
  ['wolksvagengolf',1400],
  ['wolksvagenpassat',1800]
];

const carImages = {
  'audi-a3':'audi-a3.png',
  'audia6':'audia6.png',
  'audiq2':'audiq2.png',
  'audiq7':'audiq7.png',
  'bmw218':'bmw218.png',
  'bmw320':'bmw320.png',
  'bmw520':'bmw520.png',
  'citroencelysee':'citroencelysee.png',
  'fiat-egea':'fiat egea.png',
  'ford-courier':'ford-courier.png',
  'ford-fiesta':'ford-fiesta.png',
  'ford-focus':'ford-focus.png',
  'ford-puma':'ford-puma.png',
  'honda-civic':'honda-civic.png',
  'honda-crv':'honda-crv.png',
  'hyundai-elantra':'hyundai-elantra.png',
  'hyundai-i20':'hyundai-i20.png',
  'hyundai-i30':'hyundai-i30.png',
  'hyundai-tucson':'hyundai-tucson.png',
  'mercedes180':'mercedes180.png',
  'mercedesc200':'mercedesc200.png',
  'mercedesvclass':'mercedesvclass.png',
  'peugeot3008':'peugeot3008.png',
  'peugeot301':'peugeot301.png',
  'peugeot408':'peugeot408.png',
  'peugeot508':'peugeot508.png',
  'renault-clio':'renault-clio.png',
  'renault-taliant':'renault-taliant.png',
  'renaultmeganehacthback':'renaultmeganehacthback.png',
  'seat-leon':'seat-leon.png',
  'seatibiza':'seatibiza.png',
  'toyotacorolla':'toyotacorolla.png',
  'toyotaproacecity':'toyotaproacecity.png',
  'wolksvagengolf':'wolksvagengolf.png',
  'wolksvagenpassat':'wolksvagenpassat.png'
};

const dieselIds = new Set([
  'citroen-berlingo','dacia-duster','fiat-doblo','fiat-scudo','ford-tourneo-courier',
  'ford-tourneo-custom','hyundai-staria','hyundai-tucson','mercedes-sprinter','mercedes-vclass',
  'mercedes-vito','nissan-qashqai','peugeot-3008','peugeot-rifter','peugeot-traveller',
  'renault-kangoo','renault-master','renault-trafic','skoda-superb','toyota-proace',
  'toyota-rav4','volkswagen-caddy','volkswagen-passat','volvo-s60'
]);
function fuelFor(id){
  return dieselIds.has(id) ? 'Dizel' : 'Benzin';
}


function titleCaseWord(w){
  if(!w) return "";
  if(/^[0-9]/.test(w)) return w.toUpperCase();
  return w.charAt(0).toUpperCase()+w.slice(1);
}

function formatCarName(id){
  const parts = id.split('-');
  if(!parts.length) return id;
  const brand = parts[0];
  const brandsUpper = ['bmw','audi','mercedes','fiat','ford','kia','volkswagen','vw'];
  let brandLabel = brandsUpper.includes(brand) ? brand.toUpperCase() : titleCaseWord(brand);
  const rest = parts.slice(1).map(titleCaseWord).join(' ');
  return (brandLabel + ' ' + rest).trim();
}

const cars = carsData.map(([id,price]) => ({
  id,
  price,
  name: formatCarName(id),
  img: 'images/'+carImages[id],
  fuel: fuelFor(id)
}));

cars.sort((a,b)=>a.price-b.price);


function initProvinces(){
  const citySelect = document.getElementById('quickCity');
  if(!citySelect) return;
  citySelect.innerHTML = "";
  provinces.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    citySelect.appendChild(opt);
  });
}

function renderCars(list){
  const grid = document.getElementById('carGrid');
  const countEl = document.getElementById('carCount');
  const quickCar = document.getElementById('quickCar');
  grid.innerHTML = "";
  quickCar.innerHTML = "<option value=''>Araç seç (isteğe bağlı)</option>";
  list.forEach(car => {
    // option
    const opt = document.createElement('option');
    opt.value = car.id;
    opt.textContent = car.name + ' – ' + car.price.toLocaleString('tr-TR') + '₺';
    quickCar.appendChild(opt);

    const card = document.createElement('article');
    card.className = 'car-card';
    const daily = car.price;
    const monthly = daily*30;
    card.innerHTML = `
      <div class="badge-km">Sınırsız KM</div>
      <img src="${car.img}" alt="${car.name}" class="car-image" onerror="this.style.display='none'">
      <div class="car-body">
        <div class="car-name">${car.name}</div>
        <div class="car-meta">
          <span>Günlük: ${daily.toLocaleString('tr-TR')}₺</span>
          <span>Aylık: ${monthly.toLocaleString('tr-TR')}₺</span>
          <span>Yakıt: ${car.fuel}</span>
          <span>Vites: Otomatik</span>
        </div>
        <div class="car-bottom">
          <span class="badge-deposit-inline">Depozito 3000₺</span>
          <a class="btn" href="tel:+905370594257">Hemen Ara</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  if(countEl) countEl.textContent = list.length + " araç";
}

function setupSearch(){
  const input = document.getElementById('carSearch');
  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const filtered = !q ? cars : cars.filter(c => c.name.toLowerCase().includes(q));
    renderCars(filtered);
  });
}

function handleQuickCalc(){
  const days = parseInt(document.getElementById('quickDays').value || "0", 10);
  const city = document.getElementById('quickCity').value;
  const carId = document.getElementById('quickCar').value;
  const resultEl = document.getElementById('quickResult');
  if(!days || days <= 0 || !carId){
    resultEl.textContent = "Lütfen gün sayısını ve araç seçimini yapın.";
    return;
  }
  const car = cars.find(c => c.id === carId);
  if(!car){
    resultEl.textContent = "Araç bulunamadı.";
    return;
  }
  const total = days*car.price + DEPOSIT;
  resultEl.textContent = `${city} için ${car.name} ${days} gün: yaklaşık toplam ${total.toLocaleString('tr-TR')}₺ (3000₺ depozito dahil).`;
}

function openWhatsappForCar(car){
  const daysVal = document.getElementById('quickDays').value;
  const days = parseInt(daysVal || "0",10);
  const city = document.getElementById('quickCity').value || "Belirtilmedi";
  let msg = `Merhaba, Aero Rentacar Filo Car'dan ${car.name} aracı için rezervasyon yapmak istiyorum.`;
  if(days){
    const total = days*car.price + DEPOSIT;
    msg += `\nGün sayısı: ${days}\nLokasyon: ${city}\nTahmini toplam: ${total.toLocaleString('tr-TR')}₺ (3000₺ depozito dahil).`;
  }
  const url = "https://wa.me/905370594257?text="+encodeURIComponent(msg);
  window.open(url,"_blank");
}

function setupCarActions(){
  const grid = document.getElementById('carGrid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if(!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    const car = cars.find(c => c.id === id);
    if(!car) return;
    if(action === 'whatsapp'){
      openWhatsappForCar(car);
    }else if(action === 'details'){
      const daysVal = document.getElementById('quickDays').value;
      const days = parseInt(daysVal || "0",10);
      const resultEl = document.getElementById('quickResult');
      if(!days || days <= 0){
        resultEl.textContent = `${car.name} için gün sayısını yukarıdan girin.`;
        document.getElementById('quickCar').value = car.id;
        return;
      }
      document.getElementById('quickCar').value = car.id;
      handleQuickCalc();
      window.scrollTo({top:0,behavior:'smooth'});
    }
  });
}

function setupQuickButtons(){
  const waBtn = document.getElementById('quickWhatsappBtn');
  ['quickDays','quickCar','quickCity'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener('change', handleQuickCalc);
  });
  if(waBtn) waBtn.addEventListener('click', () => {
    const carId = document.getElementById('quickCar').value;
    if(!carId){
      document.getElementById('quickResult').textContent = "Önce bir araç seçip fiyat hesaplayın.";
      return;
    }
    const car = cars.find(c => c.id === carId);
    if(car) openWhatsappForCar(car);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProvinces();
  renderCars(cars);
  setupSearch();
  setupQuickButtons();
});


function setupKvkkModal(){
  const modal = document.getElementById('kvkkModal');
  const openBtn = document.getElementById('kvkkOpenBtn');
  const closeBtn = document.getElementById('kvkkCloseBtn');
  if(!modal || !openBtn || !closeBtn) return;
  openBtn.addEventListener('click', ()=>{ modal.classList.add('open'); });
  closeBtn.addEventListener('click', ()=>{ modal.classList.remove('open'); });
  modal.addEventListener('click', (e)=>{
    if(e.target === modal){ modal.classList.remove('open'); }
  });
}

document.addEventListener('DOMContentLoaded', setupKvkkModal);
