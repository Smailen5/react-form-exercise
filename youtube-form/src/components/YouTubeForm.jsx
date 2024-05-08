import { useForm } from "react-hook-form";

export const YouTubeForm = () => {
  const form = useForm();
  const { register } = form;

  return (
    <div className="">
      <form className="grid text-left">
        <label htmlFor="username">User name</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("password")} />

        <button type="submit" className="w-full p-4 bg-stone-500 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};
