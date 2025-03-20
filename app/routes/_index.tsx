import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("http://localhost:8080/test");
  return Response.json(await res.json());
}

export default function Index() {
  const tests = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1>{tests.content}</h1>
    </div>
  );
}
