
import { useEffect } from 'react';
import useFetchSelector from '../../hooks/useFetchSelector';
import { Select, SelectItem } from '@tremor/react';
import { Dialog, DialogPanel } from '@tremor/react';

import { Divider } from '@tremor/react';
import { useUserContext } from '../../context/userProvided';


export default function FilterForm({ isOpen, clickHandle,refreshReq}) {

    const user = useUserContext();
    const host = import.meta.env.VITE_API_HOST;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    };
    const Categories = useFetchSelector(`${host}/categories`, options);
    const Payments = useFetchSelector(`${host}/payments`, options);
    const Stores = useFetchSelector(`${host}/store`, options);
    const Costlevels = useFetchSelector(`${host}/costlevels`, options);

    useEffect(() => {
        Categories.handleRequest();
        Payments.handleRequest();
        Stores.handleRequest();
        Costlevels.handleRequest();
    }, [user]);

    return (
        <Dialog open={isOpen} onClose={(val) => clickHandle(val)} static={true}>
            <DialogPanel>
                <div className="sm:mx-auto sm:max-w-2xl">
                    <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Filtrar Gastos
                    </h3>
                    <form className="mt-8">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                            <div className="flex items-center col-span-full lg:flex-row flex-col space-x-2">
                                <div className='basis-1/2 w-full '>
                                    <label
                                        htmlFor="first-name"
                                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                    >
                                        Tienda
                                    </label>
                                    <Select
                                        className="mt-2">
                                        {
                                            Stores.data.map((item, index) => (
                                                <SelectItem key={index} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}

                                    </Select >
                                </div>

                                <div className={`w-full basis-1/2`}>
                                    <label
                                        htmlFor="last-name"
                                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                    >
                                        Metodo de pago
                                    </label>
                                    <Select
                                        className="mt-2">
                                        {
                                            Payments.data.map((item, index) => (
                                                <SelectItem key={index} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                    </Select >
                                </div>
                            </div>
                            <div className="flex items-center col-span-full lg:flex-row flex-col space-x-2">
                                <div className='basis-1/2 w-full'>
                                    <label
                                        htmlFor="first-name"
                                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                    >
                                        Categoria
                                    </label>
                                    <Select
                                        className="mt-2">
                                        {
                                            Categories.data.map((item, index) => (
                                                <SelectItem key={index} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}

                                    </Select >
                                </div>
                            </div>

                        </div>
                        <Divider />
                        <div className="flex items-center justify-end space-x-4">
                            <button
                                onClick={() => clickHandle(false)}
                                type="button"
                                className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </DialogPanel>
        </Dialog>
    );
}