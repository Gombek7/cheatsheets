# Konfiguracja ESlinta dla Next.js.
Next.js utworzony za pomocą `create-react-app` ma już wbudowanego ESlinta, jednak tę konfigurację można dodatkowo rozbudować. Aktualnie Next.js używa ESlinta w wersji 8. Wersja 9 będzie wymagała zupełnie innej kongifguracji.

## 1. Konfiguraca `vscode`
**Wyłącz** pluginy [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), (Prettier ESLint)[https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint] i tym podobne. Włącz tylko plugin [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Włącz traktowanie ESLinta jako formatera. W ustawieniach zaznacz `Eslint:Format`. Alternatywnie w `settings.json` dodaj wpis `"eslint.format.enable": true`.

Włącz uruchamianie ESlinta przy zapisie. W `settings.json` dodaj wpis:
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit"
},
```

**Wyłącz** ustawienie "Editor:Format on Save", aby nie uruchamiało się podwójne formatowanie.

Ustawienia VSCode warto przypisać do workspace, dzięki czemu inni deweloperzy będą mieli te same ustawienia. Plik `.vscode/settings.json` możę wyglądać tak:
```js
{
    //Fixes eslint error "Pages directory cannot be found..."
    "eslint.workingDirectories": [
        {
            "pattern": "./packages/*/"
        }
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "eslint.format.enable": true,
    "editor.formatOnSave": false
}
```

W pliku `.vscode/extension.json` można ustawić rekomendowane rozszerzenia.
```js
{
  "recommendations": [
    "dbaeumer.vscode-eslint"
  ]
}
```

## 2. Instalacja `typescript-eslint`
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

## 3. Pluginy `react` i `react-hooks`
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

## 4. Instalacja `prettier` jako pluginu ESlinta
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
    // (...)
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
}
```
Utwórz plik `.prettierrc.json` określający formatowanie kodu. Przykład:
```js
{
  "arrowParens": "avoid",
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "endOfLine": "auto",
  "bracketSameLine": true,
  "tabWidth": 2
}
```

Szczególnie ważna jest zasada
```
"endOfLine": "auto"
```
Ułatwia współpracę pomiędzy użytkownikami windowsa i maca.

## 5. Konfiguracja zasad

Poniżej znajduje się lsita zasad, które według mnie warto włączyć/wyłączyć:

```js
{
  "rules": {
    "react/react-in-jsx-scope": "off", // don't require import React (in Next.js it's not required)
    "react/prop-types": "off", // allow missing props validation (in Typescript it's unnecessary)
    "react/display-name": "off", // allow missing displayName in a React component definition
    "@next/next/no-img-element": "off", // allow using native <img> element in Next.js
    "@typescript-eslint/no-unused-vars": [ // allow unused vars when dev intentionally mark them with `-`
      "error",
      {
        "argsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "no-restricted-imports": [ // if you use `next-i18next` lib, don't import from `react-i18next`
      "error",
      {
        "name": "react-i18next",
        "message": "Please use 'next-i18next' instead."
      }
    ],
    "react-hooks/exhaustive-deps": [ // check dependencies in react hooks, also in custom hook `useEffectUpdate`
      "warn",
      {
        "additionalHooks": "(useEffectUpdate)"
      }
    ],
    "react-hooks/rules-of-hooks": "error" // check if hoooks are used correctly
  },
}
```

## 6. (Opcjonalnie) Sortowanie importów

Istnieje kilka pluginów sortujących importy. Całkiem nieźle sprawdza się (`eslint-plugin-simple-import-sort`)[https://www.npmjs.com/package/eslint-plugin-simple-import-sort]

```
npm i eslint-plugin-simple-import-sort --save-dev
```

Można zmienić domyślne działanie pluginu za pomocą zasad w `eslintrc.json`

```js
{
  "rules": {
    //(...)
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          [
            "^react",
            "^@deliverky/",
            "^@aexol-studio/",
            // Side effect imports.
            "^\\u0000",
            // Node.js builtins prefixed with `node:`.
            "^node:",
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            "^@?\\w",
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            "^",
            // Relative imports.
            // Anything that starts with a dot.
            "^\\."
          ]
        ]
      }
    ],
    "simple-import-sort/exports": "error"
  }
}
```

## 7. Konfiguracja dla monorepo

W poszczególnych paczkach dodaj pliki konfiguracyjne `eslint.json` rozszerzające główne ustawienia. Jeśli next nie jest używany we wsystkich paczkach, to możesz przenieść jego ustawienia do poszczególnych paczek.
```
{
  "extends": [
    "next/core-web-vitals",
    "../../.eslintrc.json"
  ]
}
```
W pliku `.vscode/settings` dodaj ponizszy wpis, aby eslint prawidłowo rozpoznał foldery `pages`.
```
{
  //Fixes eslint error "Pages directory cannot be found..."
  "eslint.workingDirectories": [
    {
      "pattern": "./packages/*/"
    }
  ],
}
```

## Częste pytania i problemy

### Nie działa formatowanie przy zapisie lub 
TODO: uzupełnić tę sekcję

### Zasady dla next.js mi nie działają
TODO: uzupełnić tę sekcję


