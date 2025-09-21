import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AddressSkeleton() {
  return (
    <div className="container mx-auto px-2 py-8">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-64 mx-auto mb-2 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-5 w-64 mx-auto bg-gray-200 dark:bg-gray-700" />
      </div>

      <Card className="rounded-3xl shadow-md border border-muted bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="flex justify-end">
          <Skeleton className="w-32 h-10 rounded-md bg-gray-200 dark:bg-gray-700" />
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl p-5 border border-muted shadow-sm bg-white/80 dark:bg-gray-800/80"
              >
                <div className="flex flex-col lg:flex-row gap-4 md:gap-8 justify-between items-start md:items-center">
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-6 w-48 mb-1 bg-gray-200 dark:bg-gray-700" />{" "}
                    <Skeleton className="h-4 mx-auto w-30  md:w-64 mb-2 bg-gray-200 dark:bg-gray-700" />{" "}
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end md:justify-start">
                    <Skeleton className="w-24 h-9 rounded-lg bg-gray-200 dark:bg-gray-700" />{" "}
                    <Skeleton className="w-24 h-9 rounded-lg bg-gray-200 dark:bg-gray-700" />{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
