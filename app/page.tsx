"use client";

type PublicMetadata = {
  credits?: number;
};

type User = {
  publicMetadata: PublicMetadata;
  id: string;
};

import { useUser, useClerk } from "@clerk/clerk-react";
import CheckoutButton from "@/components/CheckoutButton";
export default function Dashboard() {
  const { user } = useUser() as { user: User | null };
  const { session } = useClerk();
  if (!user) return <div>Not signed in</div>;

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";

  const handleClickFree = async () => {
    await fetch("/api/updateCredit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credits: (credits ?? 0) + 1 }),
    });
    session?.reload();
  };
  const handleClick = () => {
    Notification.requestPermission().then((result) => {
      console.log(result);
      if (result === 'granted') {
        new Notification('Hello, world!', {
          body: 'Here is a notification body',
          icon: 'https://via.placeholder.com/150',
        });
      }
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {newUser ? <div>you are new user</div> : <div>you are not new user</div>}
      <div>Credits: {credits ?? 0}</div>
      <button onClick={handleClickFree}>reedom 1 free credit</button>
      <CheckoutButton
        lineItems={[
          {
            price: "price_1PYgA5HniLuMXjEm1r8lv6Gq",
            quantity: 1,
          },
        ]}
      />
       <button onClick={handleClick}>Click me</button>
    </div>
  );
}
