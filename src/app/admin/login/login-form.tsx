"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-teal-700 px-4 py-2 text-white font-medium hover:bg-teal-800 disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useFormState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input name="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input name="password" type="password" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Submit />
      <p className="text-xs text-slate-500">
        First time? <a className="text-teal-700 underline" href="/admin/setup">Set up admin account</a>
      </p>
    </form>
  );
}
