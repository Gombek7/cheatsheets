# Konfiguracja ESlinta dla Next.js.
Next.js utworzony za pomocą `create-react-app` ma już wbudowanego ESlinta, jednak tę konfigurację można dodatkowo rozbudować. Aktualnie Next.js używa ESlinta w wersji 8. Wersja 9 będzie wymagała zupełnie innej kongifguracji.

## 1. Instalacja `typescript-eslint`
`typescript-eslint` umożliwia ESlint'owi parsowanie składni TypeScript'a oraz umożliwia działanie zasad specyficznych dla TypeScript'a.

Możesz podążać za oficjalnym [poradnikiem](https://typescript-eslint.io/getting-started/legacy-eslint-setup), jeśli wolisz.

Najpierw zainstaluj parser i plugin.
```powershell
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin 
```
Następnie uzupełnij plik `eslintrc.json`
```js
{
  "root": true, //indicate this file is the root-level one used by the project and ESLint should not search beyond this directory for config files, generally good practice
  "parser": "@typescript-eslint/parser", //set custom parser to parse typescript code 
  "extends": [
    "next/core-web-vitals", //basic next js rules
    "eslint:recommended", //eslint recommended ruleset
    "plugin:@typescript-eslint/recommended" //typescript-eslint recommended ruleset
  ],
  "plugins": [
    "@typescript-eslint"
  ]
}
```

## 2. Pluginy `react` i `react-hooks`
Pluginy [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) i [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) zawierają zasady specyficzne dla reacta.

Instalacja:
```powershell
npm install eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

Do `eslintrc.json` należy dopisać:
```js
"extends": [
    // (...)
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
],
```
TODO: uzupełnić tę sekcję

## 3. Instalacja `prettier` jako pluginu ESlinta
[`Prettier`](https://github.com/prettier/prettier) może zostać skonfigurowany jako [plugin do ESlinta](https://github.com/prettier/eslint-plugin-prettier). Błędy formatowania będą zgłaszane jako samonaprawialne błędy ESlinta.

Najpierw zainstalujmy potrzebne paczki:
```powershell
npm install --save-dev eslint-plugin-prettier eslint-config-prettier
npm install --save-dev --save-exact prettier
```
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) zawiera rekomendowaną konfigurację, która wyłącza kolidujące zasady `ESlinta`. Teraz trzeba ją jeszcze załadować w pliku konfiguracyjnym `Eslinta` - domyślnie `.eslintrc.json`, ale inne możliwe rozszerzenia to `.eslintrc.js`, `.eslintrc`

```js
{
    "extends": [
        "next/core-web-vitals",
        "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
}
```

## 4. Konfiguracja zasad

TODO: uzupełnić tę sekcję

## 5. (Opcjonalnie) Sortowanie importów

Istnieje kilka pluginów sortujących importy. Całkiem nieźle sprawdza się (`eslint-plugin-simple-import-sort`)[https://www.npmjs.com/package/eslint-plugin-simple-import-sort]

TODO: uzupełnić tę sekcję

## 6. Konfiguracja dla monorepo

## Częste pytania i problemy

### Nie działa formatowanie przy zapisie lub 
TODO: uzupełnić tę sekcję

### Zasady dla next.js mi nie działają
TODO: uzupełnić tę sekcję


