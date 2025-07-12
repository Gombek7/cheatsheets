# Konfiguracja ESlinta dla Next.js i Tailwind 3

Nowy flat config miał być łatwiejszy...

![alt text](img.png)

---

W każdym razie po całym dniu coś ogarnąłem. Skopiuj pliki `eslint.config.mjs` i pliki konfiguracyjne z `.vscode`.
## Uwagi
- Jeśli nie używasz `tailwind'a`, to usuń wszystko co dotyczy `tailwind'a`. Po prostu wyszukaj `ctrl + f` i wpisz `tailwind`.
- Opcjonalnie możesz usunąć parę ustawień specyficznych dla `shadcn`, ale nie powinny w niczym przeszkadzać. Sprawiają, że funkcja `cn` ma autouzupełnianie z `tailwind`.
- W pliku `.vscode/settings.json` możesz ustawić, żeby pliki `css` były traktowane jako pliki `tailwindcss`. Dzięki temu zniknął ostrzeżenia i będzie działało parę funkcjonalności z wtyczki [`bradlc.vscode-tailwindcss`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). Niestety nie udało mi się ogarnąć, żeby to działało razem z `eslint'em` i formatowaniem.