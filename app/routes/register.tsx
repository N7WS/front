import N7WSlogo from "~/public/N7WS.png"
import serverImage from "~/public/login/server.png";

import RegisterForm from "~/components/custom/forms/RegisterForm";

import { Separator } from "~/components/ui/separator";

export default function Register() {

    return(
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
    )
    
}