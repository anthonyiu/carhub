import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheckCircle } from "react-icons/bi";
import { Fragment } from "react";
import type { OptionProps } from "@/types";

type ListBoxType = {
  options: OptionProps[];
  selected: OptionProps;
  setSelected: (e: OptionProps) => void;
  updateHandler: (e: OptionProps) => void;
};

const ListBox = ({
  options,
  selected,
  setSelected,
  updateHandler: handleUpdateParams,
}: ListBoxType) => {
  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        setSelected(e); // Update the selected option in state
        handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
      }}
    >
      <div className="relative w-fit z-10">
        {/* Button for the listbox */}
        <Listbox.Button className="custom-filter__btn">
          <span className="block truncate">{selected.title}</span>
          <Image
            src="/chevron-up-down.svg"
            width={20}
            height={20}
            className="ml-4 object-contain"
            alt="chevron_up-down"
          />
        </Listbox.Button>
        {/* Transition for displaying the options */}
        <Transition
          as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="custom-filter__options">
            {/* Map over the options and display them as listbox options */}
            {options.map((option) => (
              <Listbox.Option
                key={option.title}
                className={({ active, selected }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {/* {option.title} */}
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-pribg-primary-purple"
                        }`}
                      >
                        <BiCheckCircle />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
export default ListBox;
