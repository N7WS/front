import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import serverImage from "~/public/login/server.png";
import N7WSlogo from "~/public/N7WS.png"
import LoginForm  from "~/components/custom/forms/LoginForm";

import { Separator } from "~/components/ui/separator";

import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";


export async function action({
    request,
}: ActionFunctionArgs) {
    const body = await request.formData();

    return fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: body.get("email"),
            password: body.get("password"),
        }),
    }).then((response) => {
        if (response.ok) {
            return redirect("/");
        } else {
            throw new Response(response.statusText, {
                status: response.status,
                statusText: response.statusText,
            });
        }
    }).catch((error) => {
        throw new Response(error.message, {
            status: error.status,
            statusText: error.message,
        });
    })
} 

export default function Index() {
    const data = useActionData<typeof action>();
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