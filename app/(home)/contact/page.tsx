"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-width">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-sky-100">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground dark:text-sky-300 max-w-2xl mx-auto">
          Have questions about Stay Swift? We&apos;re here to help. Send us a
          message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="p-6 dark:bg-sky-900/50 dark:border-sky-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900">
              <MapPin className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold dark:text-sky-100">Our Location</h3>
              <p className="text-sm text-muted-foreground dark:text-sky-300">
                123 Hotel Street, City
              </p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.332792000835!2d144.9617!3d-37.8173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAyLjIiUyAxNDTCsDU3JzQyLjEiRQ!5e0!3m2!1sen!2sus!4v1439949875"
            className="w-full h-48 rounded-lg"
            loading="lazy"
          ></iframe>
        </Card>

        <Card className="p-6 dark:bg-sky-900/50 dark:border-sky-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900">
              <Phone className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold dark:text-sky-100">Phone</h3>
              <p className="text-sm text-muted-foreground dark:text-sky-300">
                Mon-Fri from 8am to 5pm
              </p>
            </div>
          </div>
          <a
            href="tel:+1234567890"
            className="text-lg font-medium dark:text-sky-100"
          >
            +1 (234) 567-890
          </a>
        </Card>

        <Card className="p-6 dark:bg-sky-900/50 dark:border-sky-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900">
              <Mail className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold dark:text-sky-100">Email</h3>
              <p className="text-sm text-muted-foreground dark:text-sky-300">
                We&apos;ll respond within 24 hours
              </p>
            </div>
          </div>
          <a
            href="mailto:support@stayswift.com"
            className="text-lg font-medium dark:text-sky-100"
          >
            support@stayswift.com
          </a>
        </Card>

        <Card className="p-8 lg:col-span-3 dark:bg-sky-900/50 dark:border-sky-800">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-sky-100">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-sky-100">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          {...field}
                          className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-sky-100">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Message subject"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-sky-100">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-[150px] dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:placeholder:text-sky-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full dark:bg-violet-600 dark:text-sky-100 dark:hover:bg-violet-700"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
