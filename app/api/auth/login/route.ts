import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {

    const supabase = createClient();

    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    const password = searchParams.get('password')

    if (email && password) {

        console.log(">", email, password)

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })


        if (error) {

            return NextResponse.json({ error })
        }

        return NextResponse.json({ data })
    }

    console.log("!", email, password)

    return NextResponse.json({ error: "No email or password provided" })

}