import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/userProvided';

export default function DeleteForm(props) {
  const {isOpen, clickHandle, title, msg, buttonText, refreshReq, itemId} = props;

  const user = useUserContext();
  const host = import.meta.env.VITE_API_HOST;
  const successHandle = () => {
    clickHandle(false);
    refreshReq();
}

  const deleteExpense = useFetch(
    `${host}/expenses/${itemId}`,
    {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        }
    }
    ,
    successHandle
);
  return (
    <Dialog open={isOpen} onClose={(val) => clickHandle(val)} static={true}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{title}</h3>
        <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {msg}
        </p>
        <Button color="red" className="mt-8 w-full" onClick={deleteExpense.handleRequest}>
          {buttonText}
        </Button>
      </DialogPanel>
    </Dialog>
  );
}