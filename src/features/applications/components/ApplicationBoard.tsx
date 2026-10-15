"use client";

import { FiMapPin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OptionSelect } from "@/components/common/option-select";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
  type IApplication,
} from "../interface";
import { formatSalary } from "../utils";
import { ApplicationActions } from "./ApplicationActions";

type Props = {
  applications: IApplication[];
  onDelete: (application: IApplication) => void;
  onStatusChange: (application: IApplication, status: ApplicationStatus) => void;
};

export function ApplicationBoard({
  applications,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {APPLICATION_STATUSES.map((status) => {
        const items = applications.filter((a) => a.status === status);

        return (
          <section key={status} className="space-y-3 rounded-xl bg-muted/50 p-3">
            <header className="flex items-center justify-between px-1">
              <h2 className="text-sm font-medium capitalize">{status}</h2>
              <Badge variant="secondary">{items.length}</Badge>
            </header>

            {items.map((a) => (
              <Card
                key={a._id}
                className="gap-3 py-4 animate-in fade-in zoom-in-95 duration-300"
              >
                <CardHeader className="px-4">
                  <CardTitle className="text-base">{a.companyName}</CardTitle>
                  <CardDescription>{a.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 px-4">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FiMapPin /> {a.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="capitalize">
                      {a.priority} priority
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {a.jobType}
                    </Badge>
                    <Badge variant="outline">
                      {formatSalary(a.minSalary, a.maxSalary)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <OptionSelect
                      value={a.status}
                      options={APPLICATION_STATUSES}
                      onChange={(s) => onStatusChange(a, s)}
                      className="h-8 flex-1"
                    />
                    <ApplicationActions application={a} onDelete={onDelete} />
                  </div>
                </CardContent>
              </Card>
            ))}

            {!items.length && (
              <p className="py-6 text-center text-xs text-muted-foreground">
                Nothing here
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
