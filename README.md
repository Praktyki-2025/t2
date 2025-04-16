# 💰 Aplikacja do Śledzenia Wydatków i Przychodów

## 📝 Opis projektu

Aplikacja stworzona w Angularze, której celem jest pomoc użytkownikom w zarządzaniu finansami osobistymi. Pozwala na śledzenie przychodów i wydatków, oferuje możliwość analizy danych na wykresach, a także zarządzanie kontem użytkownika. Projekt został zrealizowany w ramach praktyk zawodowych 2024/2025.

---

## 🛠️ Technologie

- **Angular 17+** – framework frontendowy
- **TypeScript** – język programowania
- **RxJS** – programowanie reaktywne
- **Chart.js** / **Ngx-Charts** – wizualizacja danych
- **Angular Material** – komponenty interfejsu użytkownika
- **Firebase** / **Node.js + Express + MongoDB** – backend i baza danych (do wyboru)

---

## 🎯 Główne funkcjonalności

### 🔐 Konto użytkownika
- Rejestracja nowego konta
- Logowanie i wylogowanie
- Edycja danych konta
- Usuwanie konta

### 📥 Przychody i 📤 Wydatki
- Dodawanie przychodów i wydatków
- Edycja wpisów finansowych
- Usuwanie wpisów
- Filtrowanie po dacie (miesiąc, rok)

### 📈 Analiza finansowa
- Wykresy miesięczne przychodów i wydatków
- Graficzna analiza salda (różnica między przychodami a wydatkami)
- Podsumowanie finansowe (saldo, suma przychodów, suma wydatków)

---

## 🚀 Jak uruchomić projekt lokalnie?

1. **Klonuj repozytorium:**
   ```bash
   git clone https://github.com/nazwa-uzytkownika/nazwa-projektu.git
   cd nazwa-projektu
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Uruchom aplikację:**
   ```bash
   ng serve
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:4200`

---

## 🧪 Testowanie

Używane narzędzia:
- **Jasmine & Karma** – testy jednostkowe Angular

Uruchomienie testów:
```bash
ng test
```

---

## 📁 Struktura folderów

```
src/
├── app/
│   ├── auth/          # logowanie, rejestracja
│   ├── dashboard/     # panel główny
│   ├── income/        # komponenty przychodów
│   ├── expenses/      # komponenty wydatków
│   ├── chart/         # wykresy
│   └── services/      # logika i komunikacja z backendem
└── assets/            # zasoby statyczne
```

---

## 👨‍💻 Autorzy

Projekt wykonany w ramach praktyk zawodowych 2024/25.

Przez:
- Paweł P.
- Daniel F.
- Hubert W.
- Mateusz P.

---

## 📌 Dalszy rozwój (opcjonalnie)

- [x] Podstawowe funkcjonalności (logowanie, CRUD finansów)
- [ ] Kategorie wydatków i przychodów
- [ ] Eksport danych (PDF/CSV)
- [ ] Powiadomienia o zbliżającym się limicie budżetu

---

## 📄 Licencja

Projekt edukacyjny – tylko do celów naukowych.

