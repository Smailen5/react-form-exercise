import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

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
        phoneNumber: [""],
        phNumbers: [{ number: "" }],
      };
    },
  });
  //  Controlla e gestisce il form, vedi react hook form documentation per maggiori info
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data) => {
    console.log("Dati in arrivo", data);
  };

  // Possiamo osservare qualsiasi valore passando watch come argomento, ci pensera hook-form a chiamare useWatch
  // BUG: eslint da un errore ma funziona tutto correttamente
  // const watchUsername = watch("username");

  // Per migliorare le prestazioni passiamo watch dentro a un useEffect cosi non renderizza ogni volta il componente
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  renderCount++;

  return (
    <>
      <h2>Form render ( {renderCount / 2} )</h2>
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
          {...register(
            "email",
            { required: "email richiesta" },
            {
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
            }
          )}
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

        <label
          htmlFor="phone-primary"
          className="flex justify-between items-center"
        >
          Phone number
        </label>
        {/* Ricorda la dot. notation e non la [] notation */}
        <input
          type="number"
          id="phone-primary"
          {...register("phoneNumber.0")}
        />

        {/* Aggiungere dinamicamente piu campi di input */}
        <label htmlFor="" className="flex justify-between items-center">
          List of phone numbers
        </label>
        {fields.map((field, index) => {
          return (
            <>
              <input
                type="text"
                key={field.id}
                {...register(`phNumbers.${index}.number`)}
              />
              {/* Cosi aggiunge un bottone per eliminare un numero direttamente sotto al tag input, lo genera ogni volta se ce piu di
              un input, scompare quando ce solo un input */}
              {index > 0 && (
                <button
                  type="button"
                  // ora il bastardo maledetto accetta index, almeno elimina il numero a cui si trova e non l'ultimo numero immesso
                  onClick={() => remove(index)}
                  className="w-full p-1 mb-4 bg-red-400 rounded-md"
                >
                  Remove
                </button>
              )}
            </>
          );
        })}

        <button
          type="button"
          onClick={() => append({ number: "" })}
          className="w-full p-4 mb-4 bg-stone-500 rounded-md"
        >
          Add phone number
        </button>

        <label htmlFor="age" className="flex justify-between items-center">
          Age
          {/* Attenzione che dopo age ci va ´?´ altrimenti non controlla se e contenuto qualcosa */}
          <p className="text-red-500 text-xs">{errors.age?.message}</p>
        </label>

        <input
          type="number"
          id="age"
          // Puoi usare valueAsNumber per convertire la stringa inserita in numero
          {...register(
            "age",
            { valueAsNumber: true },
            {
              required: "eta' richiesta",
            }
          )}
        />

        <label
          htmlFor="date-birth"
          className="flex justify-between items-center"
        >
          Date of birth
        </label>

        <input
          type="date"
          id="date-birth"
          {...register("date-birth", { valueAsDate: true })}
        />

        <button type="submit" className="w-full p-4 bg-stone-500 rounded-md">
          Submit
        </button>
      </form>
      {/* da chiamare dopo la chiusura del form */}
      <DevTool control={control} />
    </>
  );
};
