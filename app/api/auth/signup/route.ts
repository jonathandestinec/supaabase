import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const supabase = createClient();

    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    const password = searchParams.get('password')

    if (email && password != null) {


        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })


        if (error) {
            return Response.json({ error })
        }

        return Response.json({ data })
    }

    return NextResponse.json("Provide an email and a password")

}