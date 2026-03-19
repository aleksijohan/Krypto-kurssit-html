# Krypto-kurssit

Tämä on harjoitustyö Oulun ammattikorkeakoulun Web-sovellusten perusteet -kurssille (kevät 2026). Sovellus näyttää reaaliaikaisia kryptovaluuttojen hintoja Binance:n julkisesta API:sta ja mahdollistaa suosikkikryptojen tallentamisen selaimen localStorageen.

## Mitä sovellus tekee

- Näyttää suosituimpien kryptojen (BTC, ETH, SOL jne.) reaaliaikaiset hinnat, 24 h muutosprosentin ja volyymin.
- Mahdollistaa kryptojen lisäämisen/poistamisen suosikeista tähdellä klikkaamalla.
- Tallentaa suosikit selaimen localStorageen.
- Näyttää toast-ilmoituksia lisäyksestä ja poistosta.
- Vaihtoehtona joko USD tai EUR kursseille drop-down valikosta.
- Responsiivisuus (toimii puhelimella ja tietokoneella)

## Käyttöohjeet

1. Avaa sovellus selaimessa (esim. GitHub Pages -linkistä tai paikallisesti index.html-tiedostoa kaksoisklikkaamalla)
2. Etusivulta pääset "Kaikki kryptot" -sivulle.
3. Klikkaa tähteä (☆ → ★) lisätäksesi kryptovaluutan suosikkeihin.
4. Suosikit-sivulla näet tallentamasi kryptot ja voit poistaa niitä ×-napilla.
5. Valuuttavalitsimesta (USD/EUR) voit vaihtaa hintojen näyttötavan – päivittyy automaattisesti.

## Asennus / paikallinen käyttö

Ei vaadi asennusta tai palvelinta – pelkkä selain riittää.

1. Kloonaa repo
   git clone https://github.com/sinun-kayttajanimi/krypto-kurssit.git