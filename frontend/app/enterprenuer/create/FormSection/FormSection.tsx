import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  interface FormSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
  }

  export const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">{children}</CardContent>
    </Card>
  );