const popularCoins = ["BTC", "ETH", "BNB", "SOL", "XRP", "DOGE", "ADA", "TRX", "AVAX", "SHIB", "LINK", "DOT"];
let allData = [];
let favorites = JSON.parse(localStorage.getItem("cryptoFavorites")) || [];
let currentCurrency = 'USDT'; // Oletusvaluutta

function showPage(page) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  
  if (page === 'list') loadAllCrypto();
  if (page === 'favorites') renderFavorites();
}

document.getElementById('currencySelect')?.addEventListener('change', (e) => {
  currentCurrency = e.target.value;
  
  // Päivitä molemmat sivut
  if (document.getElementById('list').classList.contains('active')) {
    loadAllCrypto(); // Päivitä lista
  }
  if (document.getElementById('favorites').classList.contains('active')) {
    renderFavorites(); // Päivitä suosikit
  }
});

async function fetchPrice(symbol) {
  const symbolWithCurrency = `${symbol}${currentCurrency}`;
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbolWithCurrency}`);
    if (!res.ok) {
      throw new Error(`Ei ${currentCurrency}-paria symbolille ${symbol}`);
    }
    const data = await res.json();
    return {
      symbol: symbol,
      price: parseFloat(data.lastPrice).toFixed(currentCurrency === 'EUR' ? 2 : 4), // EUR: 2 desimaalia, USD: 4
      change: parseFloat(data.priceChangePercent).toFixed(2),
      volume: parseFloat(data.volume).toFixed(0),
      currency: currentCurrency // tallenna valuutta näyttöä varten
    };
  } catch (err) {
    console.error(err);
    return {
      symbol,
      price: 'N/A',
      change: '0.00',
      volume: '0',
      currency: currentCurrency
    };
  }
}

async function loadAllCrypto() {
  const container = document.getElementById("cryptoList");
  container.innerHTML = "<p class='col-span-3 text-center text-xl'>Ladataan kursseja...</p>";
  
  const promises = popularCoins.map(s => fetchPrice(s));
  allData = await Promise.all(promises);
  renderCryptoList(allData);
}

function renderCryptoList(data) {
  const container = document.getElementById("cryptoList");
  container.innerHTML = "";
  
  data.forEach(coin => {
    const isFavorite = favorites.includes(coin.symbol);
    const starClass = isFavorite ? "text-yellow-400" : "text-gray-500";
    const changeColor = coin.change > 0 ? "text-green-400" : "text-red-400";
    
    const currencySymbol = coin.currency === 'EUR' ? '€' : '$';
    
    const div = document.createElement("div");
    div.className = "crypto-card bg-gray-900 rounded-3xl p-6 cursor-pointer";
    div.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="text-3xl font-bold">${coin.symbol}</h3>
        <span class="${changeColor} font-bold text-xl">${coin.change}%</span>
      </div>
      <p class="text-5xl font-light mt-4">${currencySymbol}${coin.price}</p>
      
      <button 
        onclick="event.stopImmediatePropagation(); toggleFavorite('${coin.symbol}');" 
        class="mt-6 ${starClass} text-2xl hover:scale-110 transition">
        ${isFavorite ? "★" : "☆"}
      </button>
    `;
    // Volume-alert valuutan mukaan
    div.onclick = () => alert(`24h volyymi: ${coin.volume} ${coin.currency}`);
    container.appendChild(div);
  });
}

function filterList() {
  const term = document.getElementById("searchInput").value.toUpperCase();
  const filtered = allData.filter(c => c.symbol.includes(term));
  renderCryptoList(filtered);
}

function toggleFavorite(symbol) {
  let action = '';
  
  if (favorites.includes(symbol)) {
    favorites = favorites.filter(s => s !== symbol);
    action = 'remove';
    showToast(`${symbol} poistettu suosikeista`, 'remove');
  } else {
    favorites.push(symbol);
    action = 'add';
    showToast(`${symbol} lisätty suosikkeihin! ⭐`, 'success');
  }
  
  localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
  
  // Päivitä tähti listassa (uudelleenrenderöi lista)
  renderCryptoList(allData);
  
  // Päivitä suosikit-sivu jos ollaan siellä
  if (document.getElementById("favorites").classList.contains("active")) {
    renderFavorites();
  }
}

// Näyttää toast-ilmoituksen
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  
  toastMsg.textContent = message;
  
  // Väri tyypin mukaan
  if (type === 'success') {
    toast.classList.remove('bg-red-600');
    toast.classList.add('bg-green-600');
  } else if (type === 'error' || type === 'remove') {
    toast.classList.remove('bg-green-600');
    toast.classList.add('bg-red-600');
  }
  
  toast.classList.remove('hidden');
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  
  // Katoaa 2,5 sekunnin jälkeen
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300); // odota fade-out animaatio
  }, 2500);
}

async function renderFavorites() {
  const container = document.getElementById("favoritesList");
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = '<p class="col-span-3 text-center text-xl text-gray-400">Ei vielä suosikkeja – lisää niitä listasta!</p>';
    return;
  }

  container.innerHTML = '<p class="col-span-3 text-center text-xl py-8">Ladataan suosikkeja...</p>';

  try {
    const coins = await Promise.all(
      favorites.map(async (symbol) => {
        try {
          return await fetchPrice(symbol);
        } catch (err) {
          console.error(`Virhe haettaessa ${symbol}:`, err);
          return { symbol, price: '–', change: '0.00', currency: currentCurrency };
        }
      })
    );

    container.innerHTML = "";

    coins.forEach((coin) => {
      const changeColor = coin.change > 0 ? "text-green-400" : coin.change < 0 ? "text-red-400" : "text-gray-400";
      const currencySymbol = coin.currency === 'EUR' ? '€' : '$';

      const div = document.createElement("div");
      div.className = "crypto-card bg-gray-900 rounded-3xl p-6 relative hover:scale-105 transition";

      div.innerHTML = `
        <h3 class="text-3xl font-bold">${coin.symbol}</h3>
        <p class="text-5xl font-light mt-2">${currencySymbol}${coin.price}</p>
        <span class="${changeColor} font-bold text-xl">${coin.change}%</span>
        
        <button 
          class="absolute top-4 right-4 text-red-500 hover:text-red-400 text-2xl font-bold transition"
          onclick="removeFavorite('${coin.symbol.replace(/'/g, "\\'")}'); showToast('${coin.symbol} poistettu suosikeista', 'remove'); this.closest('div').remove();"
          title="Poista suosikeista">
          ×
        </button>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Suosikkien lataus epäonnistui:", err);
    container.innerHTML = '<p class="col-span-3 text-center text-red-400 py-8">Virhe suosikkien latauksessa</p>';
  }
}
function removeFavorite(symbol) {
 
  favorites = favorites.filter(s => s !== symbol);
  localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
  
  if (document.getElementById("favorites").classList.contains("active")) {
    renderFavorites();
  }
}

function setupCurrencyListener() {
  const select = document.getElementById('currencySelect');
  if (select) {
    select.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      console.log('Valuutta vaihdettu:', currentCurrency); // debug

      // Päivitä lista jos se on näkyvissä
      if (document.getElementById('list').classList.contains('active')) {
        loadAllCrypto(); // Tämä hakee uudet hinnat ja renderöi uudelleen
      }

      // Päivitä suosikit aina (jotta data on valmiina kun siirrytään sivulle)
      renderFavorites(); // Tämä on async, mutta ei estä muita toimintoja
    });
  } else {
    console.warn('currencySelect-elementtiä ei löydy');
  }
}

// Käynnistys
window.onload = () => {
  tailwind.config = { content: ["*"] };
  setupCurrencyListener();
  showPage('home');
};