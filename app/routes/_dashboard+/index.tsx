import { useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import DeviceCard from "~/components/custom/device-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

// TODO : remove when transforming card to component
import { LoaderFunctionArgs } from "@remix-run/node";
import { ServerCogIcon, ServerCrashIcon, ServerOffIcon } from "lucide-react";
import DummyGraph from "~/public/dummy/dummy-graph.png";


export async function loader({ request }: LoaderFunctionArgs) {
	// Add bearer token from cookie called "jwt"
	const token = request.headers.get("Cookie")?.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '';
	console.log("Token from cookie: ", token);
	const res = await fetch(
		"http://localhost:8080/devices", {
			method: "GET",
			credentials: "include", // Permet d'accepter les cookies HTTPOnly du backend
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`, // Ajoute le token JWT dans l'en-tête Authorization
			},
		}
	);
	return Response.json(await res.json());
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

export default function Index() {
	const devices = useLoaderData<Device[]>();
	const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
	const handleSelection = (device: any) => {
		setSelectedDevice(device);
		// console.log("selected: " + (device?.name ?? "null")); // yeah !
	}

	return (
		<div className="h-full w-full flex flex-row items-center justify-between px-16">

			{/* MACHINE SELECTION */}
			<div className="w-1/3">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>C201</AccordionTrigger>
						<AccordionContent>

							<div className="flex flex-col gap-2 w-full">
								{devices.map((device: any) => (
									<DeviceCard
										key={device.name}
										name={device.name}
										cpu={device.deviceConfigs[0]?.cpuName}
										ram={device.deviceConfigs[0]?.ramSize}
										room={device.room}
										status={device.status}
										onClick={() => handleSelection(device)}
									/>
								))}
							</div>

						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>C202</AccordionTrigger>
						<AccordionContent>
							Under construction
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>C203</AccordionTrigger>
						<AccordionContent>
							Under construction
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			{/* SELECTED MACHINE */}
			{/* TODO Convert to component for factorisation */}
			<div className="w-1/3">
				<div className="flex row items-center gap-2 w-full bg-blue-400 rounded-t-xl p-2">
					{(selectedDevice?.status ?? "PENDING") === "ONLINE" ? (
							<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
									<ServerCogIcon className="size-8 stroke-[2.5px] stroke-white"/>
							</div>
							) : (selectedDevice?.status ?? "PENDING") === "OFFLINE" ? (
							<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
									<ServerCrashIcon className="size-8 stroke-[2.5px] stroke-white"/>
							</div>) :
							<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
									<ServerOffIcon className="size-8 stroke-[2.5px] stroke-white"/>
							</div>
						}
					<p className="text-white font-extrabold">{selectedDevice?.name ?? "Not selected - please select a machine"}</p>
				</div>
				<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
					<p><span className="font-bold">CPU</span> : {selectedDevice?.deviceConfigs?.[0]?.cpuName ?? "Unknown"}</p>
					<p><span className="font-bold">RAM</span> : {selectedDevice?.deviceConfigs?.[0]?.ramSize ?? "Unknown"}</p>
					<p className="pt-[1em] font-semibold">Ping</p>
					<div className="flex flex-col justify-center items-center pt-6 gap-8">
						<img alt="logo" src={DummyGraph} className="w-4/5" /> {/* TODO : replace by shadcn graph */}
						<a> {/* TODO : link with parameter in route etc */}
						<Button type="button" className="w-40 bg-blue-400 hover:bg-blue-600">Consulter la machine</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}