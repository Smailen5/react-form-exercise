import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
  const form = useForm();
  //  Controlla e gestisce il form, vedi react hook form documentation per maggiori info
  const { register, control, handleSubmit } = form;

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
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          //   obbligatorio = required: 'testo da mandare come messaggio' === metodo veloce, sotto metodo contorto
          {...register("username", {
            required: { value: true, message: "nome richiesto" },
          })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          //   Per email non é necessario require é sufficiente pattern inserendo il value pattern e il messaggio di errore
          {...register("email", {
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "email non valida",
            },
          })}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "canale youtube richiesto" })}
        />

        <button type="submit" className="w-full p-4 bg-stone-500 rounded-md">
          Submit
        </button>
      </form>
      {/* da chiamare dopo la chiusura del form */}
      <DevTool control={control} />
    </div>
  );
};
