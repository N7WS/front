import { useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import DeviceCard from "~/components/custom/device-card";

export async function loader() {
  const res = await fetch("http://localhost:8080/devices");
  return Response.json(await res.json());
}

export default function Index() {
  const devices = useLoaderData<typeof loader>();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const handleSelection = (device : any) => {
    console.log(device.name);
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">

      <Accordion type="single" collapsible className="w-[30%]">
        <AccordionItem value="item-1">
          <AccordionTrigger>C201</AccordionTrigger>
          <AccordionContent>

            <div className="flex flex-col gap-2 w-full">
              {devices.map((device : any) => (
                // <DeviceCard name="Morpheus" cpu="cpu" ram={16} room="D208" status="ONLINE" />
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
  );
}