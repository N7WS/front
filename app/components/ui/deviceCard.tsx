import { WifiHighIcon, WifiIcon, WifiOffIcon } from "lucide-react";

type DeviceCardProps = {
    name: string;
    cpu: string;
    ram: number;
    room: string;
    status: string
    // lastUpdate: Date; // TODO
};

export default function DeviceCard({name, cpu, ram, room, status}: DeviceCardProps) {
    return (
        <div key={name} className="flex items-center gap-4 justify-stretch bg-zinc-100 p-2 w-full h-28 rounded-xl">
            <div>
                <p className="text-3xl">{name}</p>
                <p className="text-base text-stone-400">{cpu}</p>
                <p className="text-base text-stone-400">{ram && ram + "go RAM"}</p>
            </div>
            <>
            {status === "ONLINE" ? (
            <div className="flex items-center gap-2 justify-start w-32">
                <WifiIcon className="size-5 stroke-[3px] stroke-green-500"/>
                <p className="text-xl text-green-500">Up</p>
            </div>
            ) : status === "OFFLINE" ? (
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
            <p className="text-xl">{room}</p>
            </div>
        </div>
    );
}
