import { useLoaderData } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";
import { useRef, useState } from 'react';
import { Button } from "~/components/ui/button";

// TODO : remove when transforming card to component
import { Wifi, Wrench, ChartArea } from 'lucide-react';
import DummyGraph from "~/public/dummy/dummy-graph.png";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";


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

	let status = device?.status ?? "PENDING";
	let bg_color = (status === "ONLINE") ? "bg-blue-400" : ((status === "OFFLINE") ? "bg-red-400" : "bg-gray-300");

	return (
		<div className="h-full w-full flex flex-col px-16">
			{/* HAUT */}
			<div className="py-4 block">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">{device?.room}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{device?.name}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			{/* BAS */}
			<div className="h-full w-full flex flex-row justify-center gap-8">
				<div className="w-full justify-center flex flex-col gap-4"> {/* Gauche */}
					{/* Configuration */}
					<div className="w-full">
						<div className={`flex row items-center gap-2 w-full ${bg_color} rounded-t-xl p-2`}>
							<Wifi className="size-8 stroke-[2px] stroke-white"/>
							<p className="text-white text-xl font-extrabold">Configuration</p>
						</div>
						<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
							<p><span className="font-bold">CPU</span> : {device?.deviceConfigs?.[0]?.cpuName ?? "Unknown"}</p>
							<p><span className="font-bold">RAM</span> : {device?.deviceConfigs?.[0]?.ramSize ?? "Unknown"}</p>
						</div>
					</div>

					{/* Statistiques */}
					<div className="w-full">
						<div className={`flex row items-center gap-2 w-full ${bg_color} rounded-t-xl p-2`}>
							<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
								<ChartArea className="size-8 stroke-[2px] stroke-white"/>
							</div>
							<p className="text-white text-xl font-extrabold">Statistiques</p>
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
				<div className="w-full">
						<div className={`flex row items-center gap-2 w-full ${bg_color} rounded-t-xl p-2`}>
							<div className="flex items-center gap-2 justify-start rounded-full p-2 size-10">
								<Wrench className="size-8 stroke-[2px] stroke-white"/>
							</div>
							<p className="text-white text-xl font-extrabold">Scripts</p>
						</div>
						<div className="border-x-2 border-b-2 w-full border-grey-400 rounded-b-xl p-2">
							Content
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
