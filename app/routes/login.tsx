import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
    email: z.string().email("Format d'adresse mail invalide"),
    password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
});

export default function Index() {

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
                                <Input {...field} className="w-[20rem]"/>
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
                                <Input {...field} type="password" className="w-[20rem]"/>
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