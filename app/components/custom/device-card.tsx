import { ServerCogIcon, ServerCrashIcon, ServerOffIcon } from "lucide-react";

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
        <div key={name} className="flex items-center gap-4 bg-zinc-100 p-4 w-full h-28 rounded-xl justify-between">
            <div className="flex flex-col">
                <p className="text-2xl">{name}</p>
                <p className="text-base text-stone-400">{cpu}</p>
                <p className="text-base text-stone-400">{ram && ram + "go RAM"}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                {status === "ONLINE" ? (
                    <div className="flex items-center gap-2 justify-start bg-blue-400 rounded-full p-2 size-10">
                        <ServerCogIcon className="size-8 stroke-[2.5px] stroke-white"/>
                    </div>
                    ) : status === "OFFLINE" ? (
                    <div className="flex items-center gap-2 justify-start bg-gray-400 rounded-full p-2 size-10">
                        <ServerCrashIcon className="size-8 stroke-[2.5px] stroke-white"/>
                    </div>) :
                    <div className="flex items-center gap-2 justify-start bg-gray-400 rounded-full p-2 size-10">
                        <ServerOffIcon className="size-8 stroke-[2.5px] stroke-white"/>
                    </div>
                }
                <p className="text-base">Dernière actualisation : 2h18</p>
            </div>
        </div>
    );
}
