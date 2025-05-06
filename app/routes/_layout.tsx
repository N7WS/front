import { useLoaderData } from "@remix-run/react";
import { WifiHighIcon, WifiIcon, WifiOffIcon } from "lucide-react";
import { Outlet } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import N7WSlogo from "~/public/N7WS.png"
import { LogOut } from 'lucide-react';

export default function HeaderLayout() {
  return (
    <>
    <main>
        {/* DEBUT DU HEADER */}
        {/* TODO : transfo en composant*/}
        <div className="flex justify-between items-center h-[4em] w-full px-4">
          <img alt="logo" src={N7WSlogo} className="h-full p-[0.5em]" />
          <div className="flex items-center gap-[1.5rem] text-[2em] shrink-0">
              {/* TODO : change image for shadcn avatar */}
              <img
              alt="pfp"
              src="https://cdn-images.dzcdn.net/images/cover/409607c5a3dbbd21134e1d1723a8acb6/0x1900-000000-80-0-0.jpg"
              className="h-[2em] rounded-[50%] py-[0.5rem]"
              />
              <a>Benj</a>
              <LogOut color="red" className="w-[1.15em] h-[1.15em]" />
          </div>
        </div>
        {/* FIN DE HEADER */}

        <Outlet />
    </main>
    </>
  );
}