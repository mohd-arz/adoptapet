"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { breedType, locationType, petDefaultValues } from "~/lib/types"
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from "~/server/api/root";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Suspense, startTransition, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { PetAge, PetSex, PetType } from "@prisma/client"
import { toast } from "~/components/ui/use-toast"
import { api } from "~/trpc/react"
import Image from "next/image"
import Link from "next/link"
import { updatePet } from "~/lib/action"
import { ToastAction } from "~/components/ui/toast"
import { Toaster } from "~/components/ui/toaster"
import { useRouter } from "next/navigation"

const OTHERS = [
  'Rabbits',
  'Birds',
  'Horses',
  'Small Animals',
  'Reptiles, Amphibians, and/or Fish',
  'Farm-Type Animals',
]
const MAX_FILE_SIZE = 3 * 1024 * 1024; 

export const petFormSchema = z.object({
  name: z.string().min(2).max(50),
  image_url: z.instanceof(File).optional().refine(file=> !file || file.size <= MAX_FILE_SIZE,{message:'Main Image should not exceed 3MB'}),
  sub_url: z.array(z.instanceof(File),{message:'Sub Image is required'})
  .max(4, { message: 'You can only upload up to 4 images' }) 
  .refine(files => files.every(file => !file || file.size <= MAX_FILE_SIZE), {
    message: 'Each Sub Image should not exceed 3MB',
  }).optional(),
  sex: z.enum([PetSex.FEMALE,PetSex.MALE],{message:"Gender is required"}),
  age: z.enum([PetAge.YOUNG,PetAge.ADULT,PetAge.SENIOR],{message:'Age is required'}),
  type: z.enum([PetType.DOG,PetType.CAT,PetType.OTHERS],{message:"Type is required"}),
  other:z.string().optional(),
  breed: z.string().optional(),
  location: z.string({message:"Location is required"})
}).refine(data => {
  if (data.type === PetType.OTHERS) {
    return data.other && data.other.trim() !== '';
  }
  return true;
}, {
  message: "Other's field is required when type is 'OTHERS'",
  path: ['other']
}).refine(data=>{
  if(data.type === PetType.DOG){
    return data.breed && data.breed.trim() !== '';
  }
  return true;
},{
  message:'Breed is required',
  path:['breed']
});


export type petType= inferRouterOutputs<AppRouter>['pet']['getPet']['pet'];

export type formType = z.infer<typeof petFormSchema>

export default function FormComponent({pet}:{pet:petType}):JSX.Element{
  if(!pet)return(
    <div>Error</div>
  )
  const BASE_URL = "http://localhost:3000";
  const [breeds,setBreeds ] = useState<breedType[]>([]);
  const [locations,setLocations] = useState<locationType[]>([]);
  const router = useRouter()
  const formState = useForm<formType>({
    resolver:zodResolver(petFormSchema),
    defaultValues:{
      name:pet?.name,
      image_url:undefined,
      sub_url: undefined,
      sex:pet.sex ? pet.sex : undefined,
      type:pet.type,
      age:pet.age ? pet.age : undefined,
      other:pet.other ? pet.other : '',
      breed:pet.breed_id ? pet.breed_id.toString() : undefined,
      location:pet.location_id ? pet.location_id.toString() : undefined,
    },
  })

    const typeValue = formState.watch('type');

    const { data, error, isLoading, isError, isSuccess }   = api.pet.getBreed.useQuery(
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


  async function onSubmit(values:formType){
    const stringify:string = JSON.stringify(values);
    startTransition(async()=>{
      try{
      const form = new FormData();
      if(values.image_url)
      form.append('image',values.image_url);
      if (Array.isArray(values.sub_url)) {
        values.sub_url.forEach((file,i) => {
          if (file instanceof File) {
            form.append(`sub_url`, file);
          }
        });
      }
      const res = await updatePet(stringify,form,pet as petType)
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
        console.log(res.error)

        if(res.error){
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: res.error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }else{
          console.log(res.message)
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
    })
  }
  return (
    <>
      <Form {...formState}>
        <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={formState.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <Suspense fallback={<div>Loading</div>}>
          <Link href={`${BASE_URL}/${pet.image_url}`} target="_blank">
            <Image
              src={`${BASE_URL}/${pet.thumb_url}`}
              width={100}
              height={100}
              alt={`${pet.name}'s profile picture`}
              className="border border-blue-300 rounded-xl"
            />
          </Link>
      </Suspense>
        {/* Image */}
        <FormField control={formState.control} name="image_url" render={({field: { value, onChange, ...fieldProps } })=>{
          return(
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" id="picture" {...fieldProps}   accept="image/*"
                onChange={(e) =>onChange(e.target?.files?.[0])}>
              </Input>
              </FormControl>
              <FormDescription>Upload New Image <em>If needed</em></FormDescription>
              <FormMessage/>
            </FormItem>
          )
        }}></FormField>
        <div className="flex flex-row gap-4">
          {
            pet.SubImages && pet.SubImages.map(img=>
              <Suspense key={img.id} fallback={<div>Loading</div>}>
                  <Link href={`${BASE_URL}/${img.sub_url}`} key={img.id} target="_blank">
                    <Image
                      src={`${BASE_URL}/${img.sub_url}`}
                      width={100}
                      height={100}
                      alt={`${pet.name}'s sub picture`}
                      className="border border-blue-300 rounded-xl"
                    />
                  </Link>
              </Suspense>
            )
          }
        </div>
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
              <FormDescription>Upload New Sub Images If needed</FormDescription>
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
                <Select onValueChange={field.onChange} defaultValue={pet.sex ? pet.sex : undefined}>
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
                  <Select onValueChange={field.onChange} defaultValue={pet.type}>
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
                      <Select onValueChange={field.onChange} defaultValue={pet.other ? pet.other : undefined}>
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
                      <Select onValueChange={field.onChange} defaultValue={pet.age ? pet.age : undefined}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Age"/>
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
                        <Select onValueChange={field.onChange} defaultValue={pet.breed_id ? pet.breed_id.toString() : undefined}>
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
                      <Select onValueChange={field.onChange} defaultValue={pet.location_id ? pet.location_id.toString() : undefined}>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Toaster/>
    </>
  )
}