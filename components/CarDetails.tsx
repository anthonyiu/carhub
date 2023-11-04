import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
  carRent: string;
  carImageID: string;
}

const CarDetails = ({
  isOpen,
  closeModal,
  car,
  carRent,
  carImageID,
}: CarDetailsProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-out duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
              <button
                type="button"
                className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                onClick={closeModal}
              >
                <Image
                  src="/close.svg"
                  alt="close"
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </button>

              <div className="flex-1 flex flex-col gap-3">
                <div className="relative w-full bg-white bg-cover bg-center rounded-lg aspect-[16/9]">
                  <Image
                    src={`/cars/car${carImageID}_front.jpg`}
                    alt="car model"
                    fill
                    priority
                    className="object-contain rounded-lg"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 relative w-full h-24 rounded-lg">
                    <Image
                      src={`/cars/car${carImageID}_side.jpg`}
                      alt="car model"
                      fill
                      priority
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 relative w-full h-24 rounded-lg">
                    <Image
                      src={`/cars/car${carImageID}_aerial.jpg`}
                      alt="car model"
                      fill
                      priority
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 relative w-full h-24 rounded-lg">
                    <Image
                      src={`/cars/car${carImageID}_rear.jpg`}
                      alt="car model"
                      fill
                      priority
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl capitalize text-primary-blue">
                    {car.make} {car.model}
                  </h2>

                  <p className="flex text-[32px] leading-[38px] font-extrabold">
                    <span className="self-start text-[14px] leading-[17px] font-semibold">
                      £
                    </span>
                    {carRent}
                    <span className="self-end text-[14px] leading-[17px] font-medium">
                      /day
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  {Object.entries(car).map(([key, value]) => (
                    <div
                      className="flex justify-between gap-5 w-full text-right"
                      key={key}
                    >
                      <h4 className="text-primary-blue capitalize">
                        {key.split("_").join(" ")}
                      </h4>
                      <p className="text-black-100 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default CarDetails;
