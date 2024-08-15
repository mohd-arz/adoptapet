"use client"

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { PetAge, PetSex } from '@prisma/client';
import { breedType, locationType } from '~/lib/types';
import Box from '@mui/material/Box';
import { OTHERS } from '~/lib/utils';
import { CheckCheckIcon, CheckCircleIcon, CheckIcon, CircleCheck } from 'lucide-react';

const CustomPaper = (props:any) => (
  <Paper
    {...props}
    sx={{
      marginTop: '8px',
    }}
  />
);

export function LocationInput({locations,setLocation}:{locations:locationType[],setLocation:React.Dispatch<React.SetStateAction<locationType>>}){

  return (
    <Autocomplete
        id="free-solo-2-demo"
        className="relative flex-1 bg-white border-black border rounded-md"
        options={locations}
        getOptionLabel={(option) => option.name}
        onChange={(e, value) => value ? setLocation(value) :''}
        PaperComponent={CustomPaper}
        renderInput={(params) => (
          <TextField
          {...params}
          label="Location"
          variant="outlined"
          sx={{
              '& .MuiOutlinedInput-root': {
                paddingBottom:'.3rem',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& input': {
                fontSize:'1.2rem',
                padding: '0', // Remove padding from the input field
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Set the label color
                '&.Mui-focused': {
                  color: 'black', // Set the label color when focused
                },
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(6px, 1px) scale(.8)', // Center the label at the top border line
              },
          }}
        />
        )}
      />
  )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      marginTop: '8px',
    },
  },
};
type ageType = {
  value:PetAge,
  name:string,
}

export function AgeInput({ages,age,setAge}:{ages:ageType[],age:PetAge[],setAge:React.Dispatch<React.SetStateAction<PetAge[]>>}) {
  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    const {
      target: { value },
    } = event;
    setAge(
      typeof value === 'string' ? value.split(',') as PetAge[] : value,
    );
  };

  return (
    <div className='basis-1/6'>
      <FormControl className='w-full'  sx={{ m: 1,
        '&.MuiFormControl-root':{
          'margin':0,
          '&.label:focused': {
            color: 'black',
          },
          '& label':{
            color: 'black', 
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(6px, 1px) scale(.8)', 
          },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
       }}>
        <InputLabel 
          id="demo-multiple-checkbox-label">Age</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          className="relative flex-1 bg-white border-black border rounded-md"
          value={age}
          onChange={handleChange}
          input={<OutlinedInput label="Age" />}
          renderValue={(selected) => selected.map(value => ages.find(age => age.value === value)?.name).join(', ')}
          MenuProps={MenuProps}
        >
          {ages.map((item) => (
              <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={age.indexOf(item.value) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export function BreedInput({breed,breeds,setBreed}:{breed:breedType[],breeds:breedType[],setBreed:any}) {
  const handleChange = (event:any, value:any) => {
    setBreed(value)
  };
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      className="bg-white border-black border rounded-md basis-1/4"
      options={breeds}
      disableCloseOnSelect
      value={breed} // controlled component
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      PaperComponent={CustomPaper}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Breed"
        InputProps={{
          ...params.InputProps,
          startAdornment: breed.length > 1
            ? `${breed.length} selected`
            : breed.map(opt => opt.name).join(', ')
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            paddingBottom:'.25rem',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& input': {
            fontSize:'1.2rem',
            padding: '0', // Remove padding from the input field
          },
          '& .MuiInputLabel-root': {
            color: 'black', // Set the label color
            '&.Mui-focused': {
              color: 'black', // Set the label color when focused
            },
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(6px, 1px) scale(.8)', // Center the label at the top border line
          },
      }}/>
      )}
    />
  );
}

type sexType = {
  value:PetSex,
  name:String,
}

export function SexInput({sexs,sex,setSex}:{sexs:sexType[],sex:PetSex[],setSex:React.Dispatch<React.SetStateAction<PetSex[]>>}) {
  const handleChange = (event: SelectChangeEvent<typeof sex>) => {
    const {
      target: { value },
    } = event;
    setSex(
      typeof value === 'string' ? value.split(',') as PetSex[] : value,
    );
  };

  return (
    <div className='basis-1/5'>
      <FormControl className='w-full'  sx={{ m: 1,
        '&.MuiFormControl-root':{
          'margin':0,
          '&.label:focused': {
            color: 'black',
          },
          '& label':{
            color: 'black', 
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(6px, 1px) scale(.8)', 
          },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
       }}>
        <InputLabel 
          id="demo-multiple-checkbox-label">Sex</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          className="relative flex-1 bg-white border-black border rounded-md"
          value={sex}
          onChange={handleChange}
          input={<OutlinedInput label="Sex" />}
          renderValue={(selected) => selected.map(value => sexs.find(sex => sex.value === value)?.name).join(', ')}
          MenuProps={MenuProps}
        >
          {sexs.map((item) => (
              <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={sex.indexOf(item.value) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default function OthersSelect({other,setOther}:{other:string,setOther:React.Dispatch<React.SetStateAction<string>>}) {

  const handleChange = (event: SelectChangeEvent) => {
    setOther(event.target.value as string);
  };

  return (
    <Box className="basis-1/3">
      <FormControl fullWidth  sx={{ m: 1,
        '&.MuiFormControl-root':{
          'margin':0,
          '&.label:focused': {
            color: 'black',
          },
          '& label':{
            color: 'black', 
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(6px, 1px) scale(.8)', 
          },
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
       }}>
        <InputLabel id="demo-simple-select-label">Other Pets</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          className="relative flex-1 bg-white border-black border rounded-md"
          id="demo-simple-select"
          value={other}
          label="Other Pets"
          onChange={handleChange}
          renderValue={(selected) => selected}
        >
          {OTHERS.map(item => {
            return (
              <MenuItem key={item} value={item}>
                <Box display="flex" alignItems="center" className={`flex justify-between  w-full ${other==item ? 'text-cyan':''}`}>
                  <span style={{ flexGrow: 1 }}>{item}</span>
                  {other === item && <CircleCheck />}
                </Box>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}