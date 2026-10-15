"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IApplication } from "../interface";
import { formatDate, formatSalary } from "../utils";
import { ApplicationActions } from "./ApplicationActions";
import { StatusBadge } from "./StatusBadge";

type Props = {
  applications: IApplication[];
  onDelete: (application: IApplication) => void;
};

export function ApplicationTable({ applications, onDelete }: Props) {
  return (
    <div className="rounded-xl border animate-in fade-in duration-300">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((a) => (
            <TableRow key={a._id}>
              <TableCell className="font-medium">
                {a.companyName}
                <span className="block text-xs font-normal text-muted-foreground">
                  {a.location}
                </span>
              </TableCell>
              <TableCell>{a.position}</TableCell>
              <TableCell>
                <StatusBadge status={a.status} />
              </TableCell>
              <TableCell className="capitalize">{a.priority}</TableCell>
              <TableCell className="capitalize">{a.jobType}</TableCell>
              <TableCell>{formatDate(a.appliedAt)}</TableCell>
              <TableCell>{formatSalary(a.minSalary, a.maxSalary)}</TableCell>
              <TableCell>
                <ApplicationActions application={a} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
