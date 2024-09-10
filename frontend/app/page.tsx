"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getMotionsOfUser } from "@/actions/motion";
import { useAuthContext } from "@/context/AuthContext";
import { Roles } from "@/lib/enums";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    // if (user?.role === Roles[Roles.ENTREPRENEUR]) {
    //     router.push("/enterprenuer/dashboard");
    // } else if (user?.role === Roles[Roles.GOVERNMENT]) {
    //     router.push("/govt/grants");
    // }

    return (
        // INSTRUCTIONS;
        // GO TO CONSTANTS.TS TO UPDATE ROUTING AND ICONS WIHTOUTH DOING HOTCHPOTCH
        // ALSO UDPATE USE ENV VARIABLE INSTEAD OF HARDCODING BACKEND URL EVERYWHERE
        // BELOW IS EXAMPLE HOW TO USE AUTHENTICATION ON EACH PAGE
        // AJEEM DONT MAKE HOOKS FOR FETCH REQUEST , DEFINE ALL FETCH REQUEST RELATED TO ONE THING IN ONE FILE ( SEE ACTIONS FOLDER)
        // MOTION.TS IN ACTIONS FOLDER IS EXAMPLE OF HOW TO DO FETCH REQUESTS

        //const {user, fetchUser,logout} = useAuthContext()
        // const [motions, setmotions] = useState<MotionType[] | null> (null)
        // useEffect(()=>{
        //     fetchUserMotions()
        // },[user])
        // const fetchUserMotions = async () => {
        //     if(!user){
        //         await fetchUser()

        //     }
        //     if(user){
        //         const data= await getMotionsOfUser();
        //         if(data.success){
        //             setmotions(data.data.motions)

        //         }
        //         else{
        //             alert("motions not found")
        //         }
        //     }
        // }

        <div className="w-full h-4/5 lg:h-full p-10 flex flex-col">
            {/* <h1 className='w-full text-center font-bold text-2xl'>DashBoard</h1> */}
            <h1 className="w-full text-center font-bold text-2xl">
                Welcome page
            </h1>
            <h2>
                Go to app/(main)/page.tsx to see commented code how to use
                authentication for fetch request
            </h2>
            <Link href={"/govt/grants"}>
                <Button variant={"secondary"}>Go to govt DashBoard</Button>
            </Link>

            <Link href={"/enterprenuer/dashboard"}>
                <Button variant={"secondary"}>
                    Go to enterprenuer DashBoard
                </Button>
            </Link>
            <Link href={"/investor/dashboard"}>
                <Button variant={"secondary"}>
                    Go to investor DashBoard
                </Button>
            </Link>
            {/* <LogOut className='absolute top-5 right-5 ' onClick={logout}/> */}
        </div>
    );
};

export default WelcomePage;
