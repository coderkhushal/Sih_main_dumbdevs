import { FaUser } from "react-icons/fa";

import React, { useContext } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { AuthContext, useAuthContext } from "@/context/AuthContext";

export default function UserProfilePicture({
    isExpanded,
}: {
    isExpanded: boolean;
}) {
    const { user } = useAuthContext();

    return (
        <div className="flex flex-row justify-start items-center w-full gap-2">
            <div className=" rounded-full bg-onBackground w-fit h-fit px-4 py-4 flex justify-center items-center">
                <FaUser color="white" size={24} />
            </div>

            <div className="w-full overflow-hidden">
                <div className="flex flex-col justify-center items-start">
                    {isExpanded ? (
                        <p className="text-onBackground w-full text-sm">
                            {user?.name}
                        </p>
                    ) : null}
                    {isExpanded ? (
                        <p className="text-onBackground text-sm">
                            {user?.email}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
