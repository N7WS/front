import { useLoaderData } from "@remix-run/react";
import { WifiHighIcon, WifiIcon, WifiOffIcon } from "lucide-react";

import { Button } from "~/components/ui/button";

export async function loader() {
  const res = await fetch("http://localhost:8080/devices");
  return Response.json(await res.json());
}

export default function Index() {
  const devices = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-2 w-4/6">
        {devices.map((device : any) => (
          <div key={device.name} className="flex items-center gap-4 justify-stretch bg-zinc-100 p-2 w-full h-28">
            <p className="text-3xl w-20">{device.name}</p>
            <>
            {device.status === "ONLINE" ? (
              <div className="flex items-center gap-2 justify-start w-32">
                <WifiIcon className="size-5 stroke-[3px] stroke-green-500"/>
                <p className="text-xl text-green-500">Up</p>
              </div>
            ) : device.status === "OFFLINE" ? (
              <div className="flex items-center gap-2 justify-start w-32">
                <WifiOffIcon className="size-5 stroke-[3px] stroke-red-500"/>
                <p className="text-xl text-red-500">Down</p>
              </div>) :
              <div className="flex items-center gap-2 justify-start w-32">
                <WifiHighIcon className="size-5 stroke-[3px] stroke-yellow-500"/>
                <p className="text-xl text-yellow-500">Pending</p>
              </div>
            }
            </>
            <div className="flex items-center justify-between w-10">
              <p className="text-xl">{device.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
