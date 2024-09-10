import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardSkeleton() {
    return (
        <div className="p-8 bg-gray-100 min-h-screen text-onBackground">
            <h1 className="text-4xl font-bold mb-8">Entrepreneur Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Startup Info Cards Skeleton */}
                <Card className="">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <Skeleton className="h-16 w-16 rounded-full mb-4" />
                        <h2 className="text-2xl font-bold mb-2">
                            Add Your Startup Data
                        </h2>
                        <p className="text-center text-muted-foreground mb-4">
                            Create your personalized startup dashboard by adding
                            your data.
                        </p>
                        <Button asChild>
                            <Link href="/enterprenuer/create">
                                Go to Create Page
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="col-span-full md:col-span-2">
                    <CardHeader>
                        <CardTitle>Startup Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[60px]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Equity Pie Chart Skeleton */}
                <Card>
                    <CardHeader>
                        <CardTitle>Equity Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[200px] w-[200px] rounded-full mx-auto" />
                    </CardContent>
                </Card>

                {/* Burn Rate Skeleton */}
                <Card>
                    <CardHeader>
                        <CardTitle>Burn Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                </Card>

                {/* Runway Skeleton */}
                <Card>
                    <CardHeader>
                        <CardTitle>Runway</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                </Card>

                {/* Financial Overview Skeleton */}
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>Financial Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-4 w-1/2 mb-2" />
                                    <Skeleton className="h-8 w-3/4" />
                                </div>
                            ))}
                        </div>
                        <Skeleton className="h-[200px] w-full mt-4" />
                    </CardContent>
                </Card>
            </div>

            {/* Message to add data */}
        </div>
    );
}
