# Form sample Youtube

- form di esempio (non simile a quello di youtube) per esercizio con i form su react

# Obbiettivi

- form con auto compilazione
- validazione per ogni campo
- utilizzo della libreria react-hook-form
- rendere esteticamente bella la pagina

# Roba installata

- react (vedi installazione ufficiale vite+react)
- tailwind (vedi installazione tailwind ufficiale per vite)
- npm i react-hook-form
- npm i -D @hookform/devtools

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

# Links utili

- Documentazione [React hook form](https://react-hook-form.com/get-started)
- regex per validazione email [regexr.com](https://regexr.com/3e48o)
