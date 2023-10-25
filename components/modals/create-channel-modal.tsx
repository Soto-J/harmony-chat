"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChannelType } from "@prisma/client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import qs from "query-string";
import { useModalStore } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Server name is required" })
    .refine((name) => name.toLowerCase() !== "general", {
      message: `Channel name cannot be "general"`,
    }),
  type: z.nativeEnum(ChannelType),
});

const CreateChannelModal = () => {
  const router = useRouter();
  const params = useParams();
  const {
    isOpen,
    onClose,
    modalType,
    data: { channelType },
  } = useModalStore();

  const isModalOpen = isOpen && modalType === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channelType) {
      form.setValue("type", channelType);
    } else {
      form.setValue("type", ChannelType.TEXT);
    }
  }, [channelType, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: { serverId: params?.serverId },
      });
      await axios.post(url, values);

      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="
                        text-xs 
                        font-bold 
                        uppercase
                        text-zinc-500
                        dark:text-secondary/70
                      "
                    >
                      Channel name
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Enter a channel name"
                        className="
                          border-0 
                          bg-zinc-50 
                          text-black 
                          focus-visible:ring-0 
                          focus-visible:ring-offset-0
                        "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={channelType}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="
                            border-0
                            bg-zinc-300/50
                            capitalize
                            text-black
                            outline-none
                            ring-offset-0
                            focus:ring-0
                            focus:ring-offset-0
                          "
                        >
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            <span>{type.toLowerCase()}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
