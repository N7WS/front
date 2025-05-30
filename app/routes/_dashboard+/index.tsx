import { useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import DeviceCard from "~/components/custom/device-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area"

// TODO : remove when transforming card to component
import { ServerCogIcon, ServerCrashIcon, ServerOffIcon } from "lucide-react";
import DummyGraph from "~/public/dummy/dummy-graph.png";

export async function loader() {
	const res = await fetch("http://localhost:8080/devices");
	return Response.json(await res.json());
}

function findRooms(devices: Device[]) {
	let rooms: string[] = [];
	for (const device of devices) {
		let room = device.room;
		if (!rooms.includes(room)) {
			rooms.push(room);
		}
	}
	return rooms;
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
	const rooms: string[] = findRooms(devices);
	const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
	const handleSelection = (device: any) => {
		setSelectedDevice(device);
		// console.log("selected: " + (device?.name ?? "null")); // yeah !
	}

	return (
		<div className="flex flex-row justify-between px-16 pt-8">

			{/* MACHINE SELECTION */}
			<div className="flex w-1/3 items-start overflow-hidden">
				<ScrollArea className="h-[40rem] w-full rounded-xl border p-4">
					<Accordion type="single" collapsible className="w-full">
						{rooms.map((room: string) => (
							<AccordionItem value={room}>
								<AccordionTrigger>{room}</AccordionTrigger>
								<AccordionContent>

									<div className="flex flex-col gap-2 w-full">
										{devices
											.filter((device) => device.room === room)
											.map((device: Device) => (
												<DeviceCard
													key={device.name}
													name={device.name}
													cpu={device.deviceConfigs[0]?.cpuName}
													ram={device.deviceConfigs[0]?.ramSize}
													room={device.room}
													status={device.status}
													onClick={() => handleSelection(device)}
													selected={device.name === selectedDevice?.name}
												/>
											))}
									</div>

								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</ScrollArea>
			</div>

			{/* SELECTED MACHINE */}
			{/* TODO Convert to component for factorisation */}
			<div className="w-1/3 justify-start">
				<div className="flex row items-center gap-2 w-full bg-blue-400 rounded-t-xl p-2">
					{(selectedDevice?.status ?? "PENDING") === "ONLINE" ? (
						<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
							<ServerCogIcon className="size-8 stroke-[2.5px] stroke-white" />
						</div>
					) : (selectedDevice?.status ?? "PENDING") === "OFFLINE" ? (
						<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
							<ServerOffIcon className="size-8 stroke-[2.5px] stroke-white" />
						</div>) :
						<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
							<ServerCrashIcon className="size-8 stroke-[2.5px] stroke-white" />
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
						<a href={"/device?name=" + selectedDevice?.name}>
							<Button type="button" className="w-40 bg-blue-400 hover:bg-blue-600">Consulter la machine</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}