"use client"

import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { fromSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";

// Define the type for CreateChatCompletionRequestMessage
type CreateChatCompletionRequestMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessage] = useState<CreateChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try {
      const userMessage: CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessage = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessage,
      });

      setMessage((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // ToDo: Open Pro Model
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                          border-0
                          outline-none
                          focus-visible:ring-0
                          focus-visible:ring-transparent
                        "
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
            {messages.length=== 0 && !isLoading && (
               <Empty label="No conversation started." />
            )}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message, index) => (
              <div key={index}>{message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
