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
import { PetAge } from '@prisma/client';
import { breedType, locationType } from '~/lib/types';

const CustomPaper = (props:any) => (
  <Paper
    {...props}
    sx={{
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
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
                padding: '0', 
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black', 
                },
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(6px, 1px) scale(.8)',
              },
          }}
        />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            className={`hover:bg-slate-100 hover:font-bold px-2 py-1`}
          >
            {option.name}
          </li>
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
    <div>
      <FormControl sx={{ m: 1, width: 200,
        '&.MuiFormControl-root':{
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
          className="relative flex-1 bg-white border-black border rounded-md "
          value={age}
          onChange={handleChange}
          input={<OutlinedInput label="Age" />}
          renderValue={(selected) => selected.map(value => ages.find(age => age.value === value)?.name).join(', ')}
          MenuProps={MenuProps}
        >
          {ages.map((item) => (
              <MenuItem key={item.value} value={item.value}   
              sx={{
                '&:hover': {
                  backgroundColor: '#f1f5f9', 
                },
              }} >
              <Checkbox 
              checked={age.indexOf(item.value) > -1}   
              sx={{
                color: 'black', 
                '&.Mui-checked': {
                  color: 'black', 
                },
              }}/>
              <ListItemText primary={item.name}/>
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
      className="bg-white border-black border rounded-md"
      options={breeds}
      disableCloseOnSelect
      value={breed} // controlled component
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      PaperComponent={CustomPaper}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps} className='hover:bg-slate-100 hover:font-bold'>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
              sx={{
                '&.Mui-checked': {
                  color: 'black', 
                },
              }}/>
            {option.name}
          </li>
        );
      }}
      style={{ width: 300 }}
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
            padding: '0', 
          },
          '& .MuiInputLabel-root': {
            color: 'black', 
            '&.Mui-focused': {
              color: 'black', 
            },
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(6px, 1px) scale(.8)', 
          },
      }}/>
      )}
    />
  );
}