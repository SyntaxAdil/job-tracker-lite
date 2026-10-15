"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft, FiFileText, FiFolder, FiLoader } from "react-icons/fi";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/common/empty-state";
import { FormField } from "@/components/common/form-field";
import { LoadingBlock } from "@/components/common/loading-block";
import { OptionSelect } from "@/components/common/option-select";
import {
  useApplication,
  useCreateApplication,
  useUpdateApplication,
} from "../hooks";
import {
  APPLICATION_PRIORITIES,
  APPLICATION_STATUSES,
  JOB_TYPES,
  type IApplication,
} from "../interface";
import {
  applicationSchema,
  type applicationInput,
} from "../schema/application-schema";
import { toFormValues, toNumber, toOptional } from "../utils";
import { JsonFill } from "./JsonFill";

const BASE = "/dashboard/workspaces";

type Props = { workspaceId?: string; id?: string };

export function ApplicationForm({ workspaceId, id }: Props) {
  const { data, isPending, error } = useApplication(id ?? "");

  if (id) {
    if (isPending) return <LoadingBlock className="mx-auto h-96 max-w-3xl" />;
    if (error || !data) {
      return <EmptyState icon={FiFileText} title="Application not found" />;
    }
    return <FormBody workspaceId={data.workspaceId} application={data} />;
  }

  if (!workspaceId) {
    return (
      <EmptyState
        icon={FiFolder}
        title="No workspace selected"
        description="Pick a workspace first."
      >
        <Link href={BASE} className={buttonVariants()}>
          Go to workspaces
        </Link>
      </EmptyState>
    );
  }

  return <FormBody workspaceId={workspaceId} />;
}

function FormBody({
  workspaceId,
  application,
}: {
  workspaceId: string;
  application?: IApplication;
}) {
  const router = useRouter();
  const create = useCreateApplication();
  const update = useUpdateApplication();
  const backHref = `${BASE}/applications?workspaceId=${workspaceId}`;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<applicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: toFormValues(application),
  });

  const onSubmit = (body: applicationInput) => {
    if (application) {
      update.mutate({ id: application._id, body });
      router.push(backHref);
      return;
    }

    create.mutate(
      { workspaceId, body },
      { onSuccess: () => router.push(backHref) },
    );
  };

  const fillForm = (data: Partial<applicationInput>) => {
    const next = { ...data };

    if (next.appliedAt) next.appliedAt = next.appliedAt.slice(0, 10);
    if (next.interviewDate) next.interviewDate = next.interviewDate.slice(0, 10);

    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof applicationInput, value as never, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <FiArrowLeft /> Applications
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          {application ? "Edit application" : "New application"}
        </h1>
      </div>

      <JsonFill onFill={fillForm} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <FormField
          label="Company"
          htmlFor="companyName"
          error={errors.companyName?.message}
        >
          <Input
            id="companyName"
            placeholder="Acme Inc"
            {...register("companyName")}
          />
        </FormField>

        <FormField
          label="Position"
          htmlFor="position"
          error={errors.position?.message}
        >
          <Input
            id="position"
            placeholder="Frontend Developer"
            {...register("position")}
          />
        </FormField>

        <FormField
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input
            id="location"
            placeholder="Remote"
            {...register("location")}
          />
        </FormField>

        <SelectController
          control={control}
          name="jobType"
          label="Job type"
          options={JOB_TYPES}
        />

        <SelectController
          control={control}
          name="status"
          label="Status"
          options={APPLICATION_STATUSES}
        />

        <SelectController
          control={control}
          name="priority"
          label="Priority"
          options={APPLICATION_PRIORITIES}
        />

        <FormField
          label="Min salary"
          htmlFor="minSalary"
          error={errors.minSalary?.message}
        >
          <Input
            id="minSalary"
            type="number"
            min={0}
            {...register("minSalary", { setValueAs: toNumber })}
          />
        </FormField>

        <FormField
          label="Max salary"
          htmlFor="maxSalary"
          error={errors.maxSalary?.message}
        >
          <Input
            id="maxSalary"
            type="number"
            min={0}
            {...register("maxSalary", { setValueAs: toNumber })}
          />
        </FormField>

        <FormField
          label="Applied date"
          htmlFor="appliedAt"
          error={errors.appliedAt?.message}
        >
          <Input
            id="appliedAt"
            type="date"
            {...register("appliedAt", { setValueAs: toOptional })}
          />
        </FormField>

        <FormField
          label="Interview date"
          htmlFor="interviewDate"
          error={errors.interviewDate?.message}
        >
          <Input
            id="interviewDate"
            type="date"
            {...register("interviewDate", { setValueAs: toOptional })}
          />
        </FormField>

        <FormField
          label="Job URL"
          htmlFor="jobUrl"
          error={errors.jobUrl?.message}
          className="sm:col-span-2"
        >
          <Input
            id="jobUrl"
            placeholder="https://"
            {...register("jobUrl")}
          />
        </FormField>

        <FormField
          label="Notes"
          htmlFor="notes"
          error={errors.notes?.message}
          className="sm:col-span-2"
        >
          <Textarea id="notes" rows={4} {...register("notes")} />
        </FormField>

        <div className="flex justify-end gap-2 sm:col-span-2">
          <Link
            href={backHref}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button type="submit" disabled={create.isPending || update.isPending}>
            {(create.isPending || update.isPending) && (
              <FiLoader className="animate-spin" />
            )}
            {application ? "Save changes" : "Create application"}
          </Button>
        </div>
      </form>
    </div>
  );
}

type SelectControllerProps = {
  control: Control<applicationInput>;
  name: "status" | "priority" | "jobType";
  label: string;
  options: readonly string[];
};

function SelectController({
  control,
  name,
  label,
  options,
}: SelectControllerProps) {
  return (
    <FormField label={label} htmlFor={name} error={undefined}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <OptionSelect
            id={name}
            value={field.value}
            options={options}
            onChange={field.onChange}
          />
        )}
      />
    </FormField>
  );
}