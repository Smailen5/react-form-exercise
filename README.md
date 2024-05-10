# Form sample

- Esercizio form per React utilizzando react hook form

# Obbiettivi

- validazione per ogni campo
- utilizzo della libreria react-hook-form
- rendere esteticamente bella la pagina

# Roba installata

- react (vedi installazione ufficiale vite+react)
- tailwind (vedi installazione tailwind ufficiale per vite)
- `npm i react-hook-form`
- `npm i -D @hookform/devtools`

# Codice usato

Questo va bene ma e possibile usare un oggetto per passarli piu proprieta:
```js
validate: (fieldValue) => {
    return (
    fieldValue !== "admin@example.com" ||
    "Inserisci una email diversa"
    );
}
```

Ricorda di aggiungere 
```js
<DevTool control={control} />
```
alla fine del form, ricorda inoltre che devi passare `{ control }` a chi sta usando `useFrom()`

- Nel form puoi usare `{ valueAsNumber: true }` o `{ valueAsDate: true }` per cambiare direttamente i valori da stringa 

Puoi passare come argomento anche un array a `watch(['username', 'email'])`


# Links utili

- Documentazione [React hook form](https://react-hook-form.com/get-started)
- regex per validazione email [regexr.com](https://regexr.com/3e48o)
- Dati di esempio [jsonplaceholder](https://jsonplaceholder.typicode.com/)
