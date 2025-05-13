import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

import { Eye, EyeOff } from "lucide-react";

import { formSchema } from "~/components/custom/forms/RegisterSchema";

export default function RegisterForm() {

    /** Variable réactive pour montrer ou non le mot de passe dans l'input */
    const [isViewPassword, setIsViewPassword] = useState(false);

    /** Création du form d'inscription d'un utilisateur */
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { // Très important de définir les valeurs par défaut
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    })

    // Action à faire après envoi du form
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        // Envoie de la requête de connection au serveur
    }

    return (
        <div className="flex flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center pt-10">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input {...field} className="w-80" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input {...field} className="w-80" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} className="w-80" />
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
                                        className="w-80"
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
                    </div>
                    <Button type="submit" className="text-xl h-12 w-40 bg-blue-600 hover:bg-blue-800">S'inscrire</Button> 
                </form>
            </Form>
        </div>
    )
}