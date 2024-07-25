'use client'

import  { ForwardedRef, forwardRef, useEffect, useState } from 'react';

// ** Third Party
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import Select, { ActionMeta, SingleValue } from 'react-select';

// ** Icons
import { ChevronDown } from 'lucide-react';

// ** Styles
import './style.scss';

type ICustomInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  disabled?: any;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  password?: boolean;
  onChange?: (value: string) => void;
  rules?: Partial<FieldValues>;
  formatAmountInput?: boolean
} 

export const CustomInputField = forwardRef(function CustomTextField(
  {
    name,
    label,
    defaultValue,
    placeholder,
    type = 'text',
    maxLength,
    rules,
    formatAmountInput,
    password,
    onChange,
    ...rest
  }: ICustomInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [show, setShow] = useState(false);
  const { register, formState: { errors }, watch, setValue, trigger } = useFormContext<FieldValues>();
  const watchedValue = watch(name);



  useEffect(() => {
    register(name, rules);
  }, [name, register, rules]);

  const formatValue = (value: string | number) => {
    if (typeof value === 'string') {
      // Remove thousands separators before parsing the number
      const parsedValue = parseFloat(value.replace(/,/g, ''));
      if (!isNaN(parsedValue)) {
        // Format the parsed value with thousands separators
        return parsedValue.toLocaleString();
      }
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(name, value); // Update the field value
    trigger(name); // Trigger validation for the field

    if (onChange) {
      onChange(value); // Call the onChange prop with the updated value
    }
  };

  const hasError = errors[name] !== undefined;

  return (
    <div className='form-field'>
      <label htmlFor={name} className="mb-4">{label}</label>
      <input
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={show ? 'text' : type}
        value={formatAmountInput ? formatValue(watchedValue): watchedValue}
        onChange={handleChange}
        maxLength={maxLength}
        style={{ borderColor: hasError ? 'red' : undefined, marginTop: 3}}
        {...rest}
      />
      {password &&
      <span className={label ? "p_visible absolute right-2 top-10 mr-2": "p_visible absolute right-2 top-5 mr-2"} onClick={() => setShow(!show)}>
            {!show ? <p className='text-primary text-xs font-semibold uppercase cursor-pointer'>show</p> 
              :  <p className='text-primary text-xs font-semibold uppercase cursor-pointer'>hide</p>
            }
          </span>}
      {errors[name] && (
        <span role="alert" className='text-r800 text-xs font-normal'>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
});

interface ICustomSelectProps {
  name: string;
  label?: string;
  setOptions: { value: string; label: string }[] | undefined;  // options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  rules?: Partial<FieldValues>;
}

export const CustomSelectField = forwardRef(
  function CustomSelectField({name, label,onChange, defaultValue,setOptions, rules}: ICustomSelectProps, ref: React.ForwardedRef<HTMLSelectElement>){
    const [options, setOptionsState] = useState<{ value: string; label: string }[]>([]);

    const { register, formState: { errors }, setValue, trigger, watch } = useFormContext<FieldValues>();
    const watchedValue = watch(name);

    useEffect(() => {
      register(name, rules);
    }, [name, register, rules]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setValue(name, value); // Update the field value
      trigger(name); // Trigger validation for the field

      if (onChange) {
        onChange(value); // Call the onChange prop with the updated value
      }
    };

    useEffect(() => {
      if(setOptions){
        setOptionsState(setOptions);
      }
    }, [setOptions]);

    return (
      <div className='form-field'>
        {label && <label className="" htmlFor={name}>{label}</label>}
        <div className="flex justify-center">
          <div className="w-full relative" >
            <select  className=" form-select appearance-none
              block
              w-full
              px-3
              py-2
              mt-1
              text-body4
              font-normal
              text-gray-400
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-p800 focus:outline-none" aria-label="Default select example"
                name = {name}
                id={name}
                value={watchedValue !== undefined ? watchedValue : defaultValue}                
                onChange={handleChange}
                ref={ref}        
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0  top-1 right-1 flex items-center px-2 text-gray-700">
              <ChevronDown  size={22} />            
            </div>
          </div>
        </div>
        {errors[name] && (
          <span role="alert" className='text-r800 text-xs font-normal'>{String(errors[name]?.message)}</span>
        )}
      </div>
    )
  }
)


interface Option {
  value: string;
  label: string;
}

interface CustomReactSelectFieldProps {
  name: string;
  control: any; 
  defaultValue?: any;
  options: Option[];
  label: string;
}

export const CustomReactSelectField: React.FC<CustomReactSelectFieldProps> = ({ name, control, defaultValue, options, label }) => (
  <div className='form-field'>
    <label htmlFor={name} className="mb-4">{label}</label>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          onChange={(value) => field.onChange(value)}
          styles={{
            control: (provided) => ({
              ...provided,
              height: '40px',
              minHeight: "40px", 
              border: "2px solid #545f7d26",
              '&:hover': {
                outline: 'none',
                border: '2px solid #545f7d26'
              },
            }),
            input: (provided, state) => ({
              ...provided,
              marginBofttom: '0px',
            }),
        
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#39CDCC' : 'white',              
              '&:hover': {
                backgroundColor: '#dbffff',
              },
            }),
            indicatorSeparator: () => ({
              display: 'none', 
            }),
            indicatorsContainer:  (provided, state) => ({
              ...provided,
              height: "40px",
              margin: "0",
              padding:"0"
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              height: '10px',
              padding: '0 14px'
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black !important'
            }),
          }}
        />
      )}
    />
  </div>
);


