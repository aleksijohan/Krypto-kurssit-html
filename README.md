# Krypto-kurssit

Tämä on harjoitustyö Web-sovellusten perusteet -kurssille (kevät 2026). Sovellus näyttää reaaliaikaisia kryptovaluuttojen hintoja ja käyttää  Binance:n julkista API:a (https://api.binance.com) ja mahdollistaa suosikkikryptojen tallentamisen selaimen localStorageen.

## Mitä sovellus tekee ?

- Näyttää suosituimpien kryptojen (BTC, ETH, SOL jne.) reaaliaikaiset hinnat ja volyymin.
- Mahdollistaa kryptojen lisäämisen/poistamisen suosikeista tähdellä klikkaamalla.
- Tallentaa suosikit selaimen localStorageen.
- Näyttää toast-ilmoituksia lisäyksestä ja poistosta.
- Vaihtoehtona joko USD tai EUR kursseille drop-down valikosta.
- Responsiivisuus (toimii puhelimella ja tietokoneella)

## Käyttöohjeet

1. Avaa sovellus selaimessa (GitHub Pages) tai kloonaamalla reposity ja avaamalla index.html
2. Etusivulta pääset "Kaikki kryptot" -sivulle.
3. Klikkaa tähteä (☆ → ★) lisätäksesi kryptovaluutan suosikkeihin.
4. Suosikit-sivulla näet tallentamasi kryptot ja voit poistaa niitä ×-napilla.
5. Valuuttavalitsimesta (USD/EUR) voit vaihtaa hintojen näyttötavan – päivittyy automaattisesti.

## Asennus / paikallinen käyttö

Ei vaadi asennusta tai palvelinta – pelkkä selain riittää.

1. Kloonaa repo
   git clone https://github.com/aleksijohan/krypto-kurssit.git
