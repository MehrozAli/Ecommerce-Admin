import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { Navbar } from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface Props {
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
