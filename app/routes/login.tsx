import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import serverImage from "~/public/login/server.png";
import N7WSlogo from "~/public/N7WS.png"

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Format d'adresse mail invalide"),
    password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
});

export default function Index() {

        /** Variable réactive pour montrer ou non le mot de passe dans l'input */
        const [isViewPassword, setIsViewPassword] = useState(false);

    // Création du form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { // Très important de définir les valeurs par défaut
            email: "",
        },
    })

    // Action à faire après envoi du form
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    

    return (
        <div className="flex flex-row w-full">
            <img alt="asset server" src={serverImage} className="h-screen"/>
            <div className="flex flex-col w-full items-center py-40">
                <img alt="logo" src={N7WSlogo} className="w-72" />
                <div className="flex flex-col pt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="w-80"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                    <Input
                                        type={isViewPassword ? "text" : "password"}
                                        className="mt-2 w-80"
                                        {...field}
                                    />

                                    {isViewPassword ? (
                                        <Eye
                                        className="absolute right-4 top-[25%] h-5 w-5 z-10 cursor-pointer text-gray-500"
                                        onClick={() => {
                                            setIsViewPassword(!isViewPassword)
                                        }}
                                        />
                                    ) : (
                                        <EyeOff
                                        className="absolute right-4 top-[25%] h-5 w-5 z-10 cursor-pointer text-gray-500"
                                        onClick={() => setIsViewPassword(!isViewPassword)}
                                        />
                                    )}
                                    </div>
                                </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-40 bg-blue-600 hover:bg-blue-800">Submit</Button>
                    </form>
                </Form>
                </div>
            </div>
        </div>
    )
};