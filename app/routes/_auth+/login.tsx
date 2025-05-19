
import LoginForm from "~/components/custom/forms/LoginForm";

import { Separator } from "~/components/ui/separator";

export default function Login() {
    return (
        <>
            <LoginForm />
            <Separator className="w-[30rem] my-4"/>
            <p className="text-gray-600">Vous n'avez pas de compte ? <a href="/register" className="text-blue-600 hover:underline">Inscrivez vous dès maintenant !</a></p>
        </>
    )
};