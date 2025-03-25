"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthenticationToken } from "../cookie";
import { setAxiosHeader } from "../axios-configuration";

type IProps = {
    authRequired?: boolean;
    setPasswordRequired?: boolean;
    role?: string[] | string;
    is_onboard?: boolean;
};

const userRoleRedirection = (role: string, router: any, nextPath?: string) => {
    if (nextPath) router.replace(nextPath);
    else {
        if (role === "Company") router.replace("/company/login");
        else if (role === "Individual") router.replace("/developer/login");
        else router.replace("/");
    }
};

const authWrapper = (
    WrappedComponent: React.ComponentType<any>,
    { authRequired = false, setPasswordRequired = false, role = "admin", is_onboard = false }: IProps
) => {
    return function Wrapper(props: any) {
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                let tokenDetails: any = await getAuthenticationToken();

                if (tokenDetails) {
                    tokenDetails = JSON.parse(tokenDetails);
                    setAxiosHeader(tokenDetails.access_token);

                    const authUserRole = tokenDetails?.user?.role;
                    const userRole = Array.isArray(role) ? role : [role];

                    if (!userRole.includes(authUserRole)) {
                        userRoleRedirection(authUserRole, router);
                    } else if (authUserRole === "user" && is_onboard) {
                        router.replace("/user/dashboard");
                    }
                } else if (authRequired) {
                    router.replace(`/developer/login?next=${window.location.pathname}`);
                }
            };

            checkAuth();
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default authWrapper;
