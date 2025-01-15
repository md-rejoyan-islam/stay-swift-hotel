"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  checkIn: z.date({
    required_error: "Please select a check-in date.",
  }),
  checkOut: z.date({
    required_error: "Please select a check-out date.",
  }),
  cardNumber: z.string().min(16, {
    message: "Please enter a valid card number.",
  }),
  expiryDate: z.string().min(5, {
    message: "Please enter a valid expiry date.",
  }),
  cvv: z.string().min(3, {
    message: "Please enter a valid CVV.",
  }),
});

export function PaymentForm({
  searchParams: { checkIn, checkOut } = {},
  email,
  name,
  userId,
  hotelId,
}: {
  email: string;
  name: string;
  userId: string;
  hotelId: string;
  searchParams?: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      email: email,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          hotelId,
          userId,
          checkIn: format(values.checkIn, "yyyy-MM-dd"),
          checkOut: format(values.checkOut, "yyyy-MM-dd"),
        }),
      });

      if (response.status === 201) {
        toast.success("Payment successful!");
        router.push("/bookings");
      } else {
        const data = await response.json();
        toast.error(data?.error);
      }
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-sky-100">
            Personal Information
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-sky-100">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={name ? true : false}
                    className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-sky-100">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                    disabled={email ? true : false}
                    className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="dark:border-sky-800" />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-sky-100">
            Stay Dates
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="dark:text-sky-100">Check In</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="dark:text-sky-100">Check Out</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="dark:border-sky-800" />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-sky-100">
            Payment Information
          </h2>
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-sky-100">Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    {...field}
                    className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-sky-100">
                    Expiry Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/YY"
                      {...field}
                      className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-sky-100">CVV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      {...field}
                      className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#ff6a28] hover:bg-[#ff6a28]/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <span>Pay</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
