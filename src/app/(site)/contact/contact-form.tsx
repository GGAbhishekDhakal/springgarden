"use client";

import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return <input type="submit" disabled={pending} className="btn btn-block btn-primary text-white py-3 px-5" value={pending ? "Sending..." : "Send Message"} />;
}

export function ContactForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action}>
      <div className="form-group row">
        <div className="col-md-6 mb-4 mb-lg-0"><input name="firstName" type="text" className="form-control" placeholder="First name" /></div>
        <div className="col-md-6"><input name="lastName" type="text" className="form-control" placeholder="Last name" /></div>
      </div>
      <div className="form-group row"><div className="col-md-12"><input name="email" type="email" className="form-control" placeholder="Email address" /></div></div>
      <div className="form-group row"><div className="col-md-12"><input name="phone" type="tel" className="form-control" placeholder="Phone number" /></div></div>
      <div className="form-group row"><div className="col-md-12"><textarea name="message" required className="form-control" placeholder="Write your message." cols={30} rows={10}></textarea></div></div>
      <div className="form-group row"><div className="col-md-6 mr-auto"><Submit /></div></div>
    </form>
  );
}
