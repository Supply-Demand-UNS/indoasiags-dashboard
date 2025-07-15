import FacebookIcon from "@/components/icon/FacebookIcon";
import InstagramIcon from "@/components/icon/InstagramIcon";
import LinkedinIcon from "@/components/icon/LinkedinIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import { useAuth } from "@/components/provider/AuthProvider";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/title";
import { useToast } from "@/hooks/use-toast";
import useGet from "@/hooks/useGet";
import $fetch from "@/lib/$fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingSchema = z.object({
  video_url: z
    .string({ required_error: "Video is required" })
    .url("Video must be valid url"),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[+]?\d+(-\d+)*$/, "Invalid phone number"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  x_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  facebook_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  instagram_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  linkedin_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
});

export default function SettingPage() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loadingSave, setLoadingSave] = useState(false);

  const { data } = useGet("/api/get-setting");

  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      video_url: "",
      phone_number: "",
      email: "",
      x_url: "",
      facebook_url: "",
      instagram_url: "",
      linkedin_url: "",
    },
  });

  useEffect(() => {
    form.reset({
      video_url: data?.data?.video_url,
      phone_number: data?.data?.phone_number,
      email: data?.data?.email,
      x_url: data?.data?.x_url,
      facebook_url: data?.data?.facebook_url,
      instagram_url: data?.data?.instagram_url,
      linkedin_url: data?.data?.linkedin_url,
    });
  }, [data]);

  async function onSubmit(values) {
    try {
      setLoadingSave(true);
      const response = await $fetch.create("/api/update-setting", values);
      form.reset({
        video_url: response?.data?.video_url,
        phone_number: response?.data?.phone_number,
        email: response?.data?.email,
        x_url: response?.data?.x_url,
        facebook_url: response?.data?.facebook_url,
        instagram_url: response?.data?.instagram_url,
        linkedin_url: response?.data?.linkedin_url,
      });
      toast({
        title: "Success",
        description: "Success update setting",
      });
    } catch (error) {
      if (error.meta?.messages?.[0]) {
        toast({
          title: error.meta.messages[0],
          variant: "destructive",
        });
        return;
      }

      if (error.meta?.validations) {
        Object.keys(error.meta.validations).forEach((key) => {
          form.setError(key, {
            type: "server",
            message: error.meta.validations[key][0],
          });
        });
      }
    } finally {
      setLoadingSave(false);
    }
  }
  return (
    <div>
      <Title title={"Settings"} caption={"Manage your website settings."} />

      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embed Video (url)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/embed/blablabla"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormDescription>
                    Add the phone number to let users know where they can reach
                    us.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="+123-456-789" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                    Add the email to let users know where they can reach us.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label>Social Media</Label>
              <FormField
                control={form.control}
                name="x_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <TwitterIcon />
                      <FormControl>
                        <Input
                          placeholder="https://x.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FacebookIcon />
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <InstagramIcon />
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <LinkedinIcon />
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-2" loading={loadingSave}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
