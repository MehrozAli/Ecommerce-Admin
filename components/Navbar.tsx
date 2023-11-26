import { redirect } from "next/navigation";

import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import { StoreSwticher } from "@/components/StoreSwticher";
import { ThemeToggle } from "@/components/ThemeToggle";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <div className="border-b">
      <div className="flex items-center px-4 h-16">
        <StoreSwticher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
