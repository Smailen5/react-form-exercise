import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
  const form = useForm({
    // Richiamiamo i valori salvati in precedenza dal utente
    defaultValues: async () => {
      const response = await fetch(
        // dati esempio di Json placeholder
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        // Se vuoi raggruppare dei dati puoi usare oggetti nidificati
        social: {
          twitter: "",
          facebook: "",
        },
      };
    },
  });
  //  Controlla e gestisce il form, vedi react hook form documentation per maggiori info
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Dati in arrivo", data);
  };

  return (
    <div className="">
      <form
        className="grid text-left"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Ho posizionato il paragrafo dentro il label perche e piu bello da vedere */}
        <label htmlFor="username" className="flex justify-between items-center">
          User name
          {/* Attenzione che dopo user ci va ´?´ altrimenti non controlla se e contenuto qualcosa */}
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
        </label>

        <input
          type="text"
          id="username"
          //   obbligatorio = required: 'testo da mandare come messaggio' === metodo veloce, sotto metodo contorto
          {...register("username", {
            required: { value: true, message: "nome richiesto" },
          })}
        />

        <label htmlFor="email" className="flex justify-between items-center">
          Email<p className="text-red-500 text-xs">{errors.email?.message}</p>
        </label>

        <input
          type="email"
          id="email"
          //   Per email non é necessario require é sufficiente pattern inserendo il value pattern e il messaggio di errore
          {...register("email", {
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "email non valida",
            },
            // In questo modo si personalizza la validazione del form, es. usa una email diversa da quella di esempio
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Inserisci una email diversa"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "dominio non e supportato"
                );
              },
            },
          })}
        />

        <label htmlFor="twitter" className="flex justify-between items-center">
          Twitter
        </label>
          {/* Essendo in un oggetto nidificato non dimenticare la dot. notation */}
        <input type="text" id="twitter" {...register("social.twitter")} />

        <label htmlFor="facebook" className="flex justify-between items-center">
          Facebook
        </label>

        <input type="text" id="facebook" {...register("social.facebook")} />

        <button type="submit" className="w-full p-4 bg-stone-500 rounded-md">
          Submit
        </button>
      </form>
      {/* da chiamare dopo la chiusura del form */}
      <DevTool control={control} />
    </div>
  );
};
