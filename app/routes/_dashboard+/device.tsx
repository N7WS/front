import { useLoaderData } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";
import { useRef, useState } from 'react';
import DeviceCard from "~/components/custom/device-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

// TODO : remove when transforming card to component
import { ServerCogIcon, ServerCrashIcon, ServerOffIcon } from "lucide-react";
import DummyGraph from "~/public/dummy/dummy-graph.png";


export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url);
	const name = url.searchParams.get("name");
	let res;

	await fetch(`http://localhost:8080/devices/${name}`).then(async (response) => {
		if(response.ok) {
			res = Response.json(await response.json());
		} else {
			throw new Response(response.statusText, {
				status: response.status,
				statusText: response.statusText,
			});
		}
	}).catch((error) => {
		console.log(error.message);
		let top_msg;
		let bot_msg;
		if (error.message === "fetch failed") {
			top_msg = "Server unreachable";
			bot_msg = error.msg;
		} else if (error.message === "Unexpected end of JSON input") {
			top_msg = "Invalid device name";
			bot_msg = "Device name has no match";
		}
		else {
			top_msg = error.msg;
			bot_msg = error.msg;
		}
        throw new Response(bot_msg, {
            status: error.status,
            statusText: top_msg,
        });
    });
	return res;
}

interface Device {
	name: string;
	cpu: string;
	ram: number;
	room: string;
	deviceConfigs: DeviceConfig[];
	status: any; // TODO : Fix any
}

interface DeviceConfig {
	cpuName: string;
	ramSize: number;
}

export default function Device() {
	const device = useLoaderData<Device>();

	return (
		<div className="h-full w-full flex flex-row justify-center px-16">

			<div className="w-full justify-center"> {/* Gauche */}
				{/* Configuration */}
				<div className="w-1/3">
					<div className="flex row items-center gap-2 w-full bg-blue-400 rounded-t-xl p-2">
						{(device?.status ?? "PENDING") === "ONLINE" ? (
								<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
										<ServerCogIcon className="size-8 stroke-[2.5px] stroke-white"/>
								</div>
								) : (device?.status ?? "PENDING") === "OFFLINE" ? (
								<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
										<ServerCrashIcon className="size-8 stroke-[2.5px] stroke-white"/>
								</div>) :
								<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
										<ServerOffIcon className="size-8 stroke-[2.5px] stroke-white"/>
								</div>
							}
						<p className="text-white font-extrabold">Configuration</p>
					</div>
					<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
						<p><span className="font-bold">CPU</span> : {device?.deviceConfigs?.[0]?.cpuName ?? "Unknown"}</p>
						<p><span className="font-bold">RAM</span> : {device?.deviceConfigs?.[0]?.ramSize ?? "Unknown"}</p>
					</div>
				</div>

				{/* Statistiques */}
				<div className="w-1/3">
					<div className="flex row items-center gap-2 w-full bg-blue-400 rounded-t-xl p-2">
						<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
								<ServerOffIcon className="size-8 stroke-[2.5px] stroke-white"/>
						</div>
						<p className="text-white font-extrabold">Statistiques</p>
					</div>
					<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
						<p className="pt-[1em] font-semibold">Ping</p>
						<div className="flex flex-col justify-center items-center pt-6 gap-8">
							<img alt="logo" src={DummyGraph} className="w-4/5" /> {/* TODO : replace by shadcn graph */}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full"> {/* Droite */}
			<div className="w-1/3">
					<div className="flex row items-center gap-2 w-full bg-blue-400 rounded-t-xl p-2">
						<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
								<ServerOffIcon className="size-8 stroke-[2.5px] stroke-white"/>
						</div>
						<p className="text-white font-extrabold">Title</p>
					</div>
					<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
						<p>Texte</p>
					</div>
				</div>
			</div>
		</div>
	);
}
