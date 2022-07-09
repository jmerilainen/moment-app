import { format } from "date-fns";
import { LoaderFunction, redirect } from "@remix-run/node";

export let loader: LoaderFunction = async () => {
  const now = format(new Date(), 'yyyy/MM');

  return redirect(`/${now}`);
};
