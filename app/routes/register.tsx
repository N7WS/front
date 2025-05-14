import N7WSlogo from "~/public/N7WS.png";
import serverImage from "~/public/login/server.png";

import RegisterForm from "~/components/custom/forms/RegisterForm";

import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";

import { Separator } from "~/components/ui/separator";

/** Action à faire après envoi du form */
export async function action({
    request,
}: ActionFunctionArgs) {
    const body = await request.formData();

    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname: body.get("firstname"),
            lastname: body.get("lastname"),
            email: body.get("email"),
            password: body.get("password"),
        }),
    }).then((response) => {
        if (response.ok) {
            return redirect("/login");
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

export default function Invoices() {
    const data = useActionData<typeof action>();
    return (
        <div className="flex flex-row w-full">
            <img alt="asset server" src={serverImage} className="h-screen"/>
            <div className="flex flex-col w-full items-center py-40">
                <img alt="logo" src={N7WSlogo} className="w-72" />
                <RegisterForm />
                <Separator className="w-[30rem] my-4"/>
                <p className="text-gray-600">
                    Vous avez déjà un compte ? <a href="/login" className="text-blue-600 hover:underline">Connectez vous !</a>
                </p>
            </div>
        </div>
    );
}