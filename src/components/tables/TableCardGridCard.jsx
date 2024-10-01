import { useState } from 'react';
import {
    RiStoreFill, RiCalculatorFill, RiCalendar2Fill,
    RiPresentationFill, RiWallet3Fill,
    RiDeleteBin5Fill, RiFileEditFill
} from '@remixicon/react';
import { Callout, Card, Button, Badge } from '@tremor/react';
import DeleteForm from '../forms/DeleteForm';
import ExpenseForm from '../forms/ExpenseForm';

export default function TableCardGridCard({ expense, refreshReq }) {
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const clickEditHandle = (value) => {
        setIsOpenEdit(value);
    }
    const clickDeleteHandle = (value) => {
        setIsOpenDel(value);
    }
    return (
        <Card className="w-full">

            <div className='flex'>
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">${expense.amount}</p>
                <div className='grow' />
                <Badge 
                    className='dark:text-white'
                    color="gray" 
                    icon={RiCalendar2Fill}>
                    {expense.expensedAt.slice(0,10)}
                </Badge>
            </div>


            <div className='flex flex-wrap mt-2 space-x-2'>
                <Badge color="orange" icon={RiStoreFill}>{expense.store.name}</Badge>
                <Badge color="purple" icon={RiPresentationFill}>{expense.category.name}</Badge>
                <Badge color="green" icon={RiWallet3Fill}>{expense.payment.name}</Badge>
            </div>
            <Callout
                className="mt-4 dark:text-white"
                title="Descripcion"
                icon={RiCalculatorFill}
                color="gray"
            >
                {expense.details}
            </Callout>
            <div className="flex space-x-2 mt-4">
                <Button
                    onClick={() => clickDeleteHandle(true)}
                    color="red"
                    icon={RiDeleteBin5Fill}
                    variant="secondary">
                    Borrar
                </Button>
                <div className='grow' />
                <Button
                    onClick={() => setIsOpenEdit(true)}
                    color="blue"
                    icon={RiFileEditFill}
                    variant="secondary">
                    Editar
                </Button>
            </div>
            <DeleteForm
                itemId={expense.id}
                refreshReq={refreshReq}
                isOpen={isOpenDel}
                clickHandle={clickDeleteHandle}
                title="Borrar Gasto"
                msg="Este gasto se eliminara permanentemente, si estas de acuerdo presiona Borrar."
                buttonText="Borrar" />
            <ExpenseForm
                isOpen={isOpenEdit}
                clickHandle={clickEditHandle}/>
        </Card>

    )
}