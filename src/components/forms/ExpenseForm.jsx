
import { useState, useEffect } from 'react';
import useFetchSelector from '../../hooks/useFetchSelector';
import useFetch from '../../hooks/useFetch';
import { Select, SelectItem } from '@tremor/react';
import { NumberInput } from '@tremor/react';
import { DatePicker, Callout } from '@tremor/react';
import { Dialog, DialogPanel, Switch } from '@tremor/react';

import { Divider, TextInput } from '@tremor/react';
import { useUserContext } from '../../context/userProvided';


export default function ExpenseForm({ isOpen, clickHandle,refreshReq,newExpense=true,
    cardInfo =
    {
        categoryId: 0,
        paymentId: 0,
        details: "",
        expensedAt: new Date(),
        loanMonths: 0,
        amount: 0,
        isMonthly: false,
        storeId: 0
    } }) {
    const [formCheck, setFormCheck] = useState('');
    const [formData, setFormData] = useState(cardInfo);

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

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };
    const successHandle = () => {
        clickHandle(false);
        refreshReq();
    }
    const createExpense = useFetch(
        `${host}/expenses`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData,
                userId:user.userId,
            })
        }
        ,
        successHandle
    );
    const updateExpense = useFetch(
        `${host}/expenses/${cardInfo.id}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData,
                userId:user.userId,
            })
        }
        ,
        successHandle
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.amount) setFormCheck("Monto invalido, costo 0.");
        else if (!formData.details) setFormCheck("Comentario vacio.");
        else if (!formData.expensedAt) setFormCheck("Selecciona una fecha.");
        else if (!formData.storeId) setFormCheck("Selecciona una Tienda.");
        else if (!formData.categoryId) setFormCheck("Selecciona una Categoria.");
        else if (!formData.paymentId) setFormCheck("Selecciona un Metodo de Pago.");
        else {
            setFormCheck('');
            if(newExpense){
                createExpense.handleRequest();
            }
            else{
                updateExpense.handleRequest();
            }
        }
    };


    return (
        <Dialog open={isOpen} onClose={(val) => clickHandle(val)} static={true}>
            <DialogPanel>
                <div className="sm:mx-auto sm:max-w-2xl">
                    <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Crear Nuevo Gasto
                    </h3>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Registra un gasto en solo unos pasos, y en caso de hacer un registro rapido solo llena los campos principales.
                    </p>
                    <form className="mt-8" onSubmit={handleSubmit}>
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
                                        value={formData.storeId}
                                        onValueChange={(e) => handleChange("storeId", e)}
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
                                        value={formData.paymentId}
                                        onValueChange={(e) => handleChange("paymentId", e)}
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
                                <div className='basis-1/2 w-full '>
                                    <Switch
                                        id="switch"
                                        onChange={(e) => handleChange("isMonthly", e)}
                                        checked={formData.isMonthly}
                                    />
                                    <label htmlFor="switch" className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                        Cobrar este gasto{' '}
                                        <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Mensualmente</span>
                                    </label>
                                </div>

                                <div className={`w-full basis-1/2 `}>
                                    <label
                                        htmlFor="address"
                                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                    >
                                        Fecha de Compra
                                        {!formData.isMonthly && (<span className="text-red-500">*</span>)}

                                    </label>
                                    {
                                        formData.isMonthly?
                                                                            <NumberInput
                                                                            value={formData.loanMonths}
                                                                            onValueChange={(e) => handleChange("loanMonths", e)}
                                                                            className="w-full mt-2"
                                                                            placeholder="0.00"
                                                                            required />:
                                                                            <DatePicker
                                                                            placeholder="Fecha"
                                                                            value={formData.expensedAt}
                                                                            onValueChange={(e) => handleChange("expensedAt", e)}
                                                                            disabled={formData.isMonthly} />
                                    }

                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="comentario"
                                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                >
                                    Comentario
                                    <span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    value={formData.details}
                                    onValueChange={(e) => handleChange("details", e)}
                                    id="comentario"
                                    name="comentario"
                                    autoComplete="comentario"
                                    placeholder="Ejemplo. Cafe en el Starbucks, Alimento para perro, etta."
                                    className="mt-2"
                                    required
                                />
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
                                        value={formData.categoryId}
                                        onValueChange={(e) => handleChange("categoryId", e)}
                                        className="mt-2">
                                        {
                                            Categories.data.map((item, index) => (
                                                <SelectItem key={index} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}

                                    </Select >
                                </div>

                                <div className={`w-full basis-1/2`}>
                                    <label
                                        htmlFor="first-name"
                                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                    >
                                        Monto
                                    </label>

                                    <NumberInput
                                        value={formData.amount}
                                        onValueChange={(e) => handleChange("amount", e)}
                                        className="w-full mt-2"
                                        placeholder="0.00"
                                        required />
                                </div>
                            </div>

                        </div>
                        <Divider />
                        {
                            formCheck &&
                            (<Callout title="Campos incompletos." color="red">
                                {formCheck}
                            </Callout>)
                        }
                        <div className="flex items-center justify-end space-x-4">
                            <button
                                onClick={() => clickHandle(false)}
                                type="button"
                                className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </DialogPanel>
        </Dialog>
    );
}