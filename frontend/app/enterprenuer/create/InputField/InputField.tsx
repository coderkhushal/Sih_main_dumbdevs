import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    control: any;
    name: string;
    label: string;
    type?: string;
  }


export  const InputField : React.FC<InputFieldProps> = ({ control, name, label, type = "number" }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              onChange={(e) =>
                field.onChange(
                  type === "number" ? parseFloat(e.target.value) : e.target.value
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );