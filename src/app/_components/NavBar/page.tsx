
// next simple component
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import {signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Test() {
    const session = await getServerAuthSession();
    console.log("session", session)
    return (
        <div className="flex flex-row items-center justify-between p-2 shadow-xl">
            <div className="flex">

            </div>
            <div className="flex">

            </div>
            <div className="flex">
                    <div>
                       {!session && 
                        <Link href="/api/auth/signin">
                           Sign in
                        </Link>}
                       {session && 
                         <Link href="/api/auth/signout">
                            Sign out
                        </Link>}
                        &nbsp;
                        
                    </div>
              
            </div>
          
        </div>
    );
}