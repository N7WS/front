import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import serverImage from "~/public/login/server.png";
import N7WSlogo from "~/public/N7WS.png"
import LoginForm  from "~/components/custom/forms/LoginForm";

import { Separator } from "~/components/ui/separator";

export default function Index() {

    return (
        <div className="flex flex-row w-full">
            <img alt="asset server" src={serverImage} className="h-screen"/>
            <div className="flex flex-col w-full items-center py-40">
                <img alt="logo" src={N7WSlogo} className="w-72" />
                <LoginForm />
                <Separator className="w-[30rem] my-4"/>
                <p className="text-gray-600">Vous n'avez pas de compte ? <a href="/register" className="text-blue-600 hover:underline">Inscrivez vous dès maintenant !</a></p>
            </div>
        </div>
    )
};