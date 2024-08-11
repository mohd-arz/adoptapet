
"use client"

import { PetAge, PetSex, PetType } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useEffect, useState, useTransition } from "react"
import { api } from "~/trpc/react"
import { toast } from "~/components/ui/use-toast"
import { Toaster } from "~/components/ui/toaster"
import {  storePet } from "~/lib/action"
import { ToastAction } from "~/components/ui/toast"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { petFormSchema, petDefaultValues, breedType, locationType } from "~/lib/types"

// //Create Form Schema
export type formType = z.infer<typeof petFormSchema>

const OTHERS = [
  'Rabbits',
  'Birds',
  'Horses',
  'Small Animals',
  'Reptiles, Amphibians, and/or Fish',
  'Farm-Type Animals',
]


export default function FormComponent():JSX.Element{
  const [isPending, startTransition] = useTransition();
  const [breeds,setBreeds ] = useState<breedType[]>([]);
  const [locations,setLocations] = useState<locationType[]>([]);
  const router = useRouter();
  const formState = useForm<formType>({
    resolver:zodResolver(petFormSchema),
    defaultValues:petDefaultValues
  })
  const typeValue = formState.watch('type');

  async function onSubmit(values: z.infer<typeof petFormSchema>) {
    const form = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        value.forEach((file,i) => {
          if (file instanceof File) {
            form.append(`${key}`, file);
          }
        });
      }else {
        form.append(key, value);
      }
    }
    startTransition(async() => {
    try{
      const res = await storePet(form)
      if(res.status){
        toast({
          description: res.message,
        })
        setTimeout(()=>{
          console.log('came inside')
          router.push('/sellers/pets');
          router.refresh();
        },1000)
      }else{
        if(res.error){
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: res.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }else{
          toast({
            title: "Uh oh! Something went wrong.",
            description: res.message,
          })
        }
      }
    }catch(err:any){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    });
  }

  const { data, error, isLoading, isError, isSuccess }   =  api.pet.getBreed.useQuery(
    { type: typeValue },
    {
      enabled: !!typeValue && typeValue === PetType.DOG,
    }
  );

  const locationQuery = api.pet.getLocation.useQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setBreeds(data.breeds);
    }
    if(locationQuery.isSuccess && locationQuery.data){
      setLocations(locationQuery.data.locations)
    }
    
  }, [isSuccess, data,locationQuery.isSuccess,locationQuery.data]);


  if (isError) {
    toast({description:error.message})
  }



  return (
    <>
    <Form {...formState}>
    <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-8">
      {/* Name */}
      <FormField
        control={formState.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Image */}
      <FormField control={formState.control} name="image_url" render={({field: { value, onChange, ...fieldProps } })=>{
        return(
          <FormItem>
            <FormLabel>Main Image</FormLabel>
            <FormControl>
              <Input type="file" id="picture" {...fieldProps}   accept="image/*"
              onChange={(e) =>onChange(e.target?.files?.[0])}>
            </Input>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )
      }}></FormField>
      {/* Sub Images */}
      <FormField control={formState.control} name="sub_url" render={({field: { value, onChange, ...fieldProps } })=>{
        return(
          <FormItem>
            <FormLabel>Sub Images</FormLabel>
            <FormControl>
              <Input type="file" id="picture" {...fieldProps}  multiple  accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                onChange(files);
              }}>
            </Input>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )
      }}></FormField>
      {/* Sex */}
      <FormField
          control={formState.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PetSex.MALE}>Male</SelectItem>
                  <SelectItem value={PetSex.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Type */}
        <FormField
          control={formState.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PetType.DOG}>Dog</SelectItem>
                  <SelectItem value={PetType.CAT}>Cat</SelectItem>
                  <SelectItem value={PetType.OTHERS}>Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          {/* Others */}
            {
            typeValue==PetType.OTHERS && (
              <FormField
              control={formState.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Others</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select other type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OTHERS.map(other => {
                        return (
                          <SelectItem key={other} value={other}>{other}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
              />
            )
            }
            {/* Age */}
            <FormField
              control={formState.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Age" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PetAge.YOUNG}>{PetAge.YOUNG}</SelectItem>
                      <SelectItem value={PetAge.ADULT}>{PetAge.ADULT}</SelectItem>
                      <SelectItem value={PetAge.SENIOR}>{PetAge.SENIOR}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
              />
            {/* Breed */}
            {
              typeValue == PetType.DOG && (
                <FormField
                  control={formState.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={isLoading ? 'Breeds are loading':'Select a Breed'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isSuccess && breeds.map(breed=>{
                            return (
                              <SelectItem key={breed.id} value={(breed.id).toString()}>{breed.name}</SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            {/* Location */}
                <FormField
                  control={formState.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={locationQuery.isLoading ? 'Location are loading':'Select a Location'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locationQuery.isSuccess && locations.map(location=>{
                            return (
                              <SelectItem key={location.id} value={(location.id).toString()}>{location.name}</SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      <Button type="submit" disabled={isPending}>Submit</Button>
    </form>
  </Form>
  <Toaster />
  </>
  )
}