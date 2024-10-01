import {
    TableCell,
    TableRow,
    Button,
    Badge,
    Icon
} from '@tremor/react';
import DeleteForm from '../forms/DeleteForm';
import ExpenseForm from '../forms/ExpenseForm';
import {
    RiWallet3Fill,
    RiPresentationFill,
    RiStoreFill,
    RiDeleteBin5Fill,
    RiFileEditFill,
    RiCalendar2Fill,
    RiRestartFill,
    RiCloseCircleLine
} from '@remixicon/react';
import { useState } from 'react';
export default function TableCardListRow({ expense, refreshReq }) {
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const clickEditHandle = (value) => {
        setIsOpenEdit(value);
    };
    const clickDeleteHandle = (value) => {
        setIsOpenDel(value);
    };
    console.log(expense)
    return (
        <TableRow
            key={expense.id}
            className="hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
        >
            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <Badge
                    className='dark:text-white'
                    color="gray"
                    icon={RiCalendar2Fill}>
                    {expense.expensedAt.slice(0, 10)}
                </Badge>
            </TableCell>
            <TableCell>
                <Badge color="purple" icon={RiPresentationFill}>{expense.category.name}</Badge>
            </TableCell>
            <TableCell>
                <Badge color="orange" icon={RiStoreFill}>{expense.store.name}</Badge>
            </TableCell>
            <TableCell>
                <Badge color="green" icon={RiWallet3Fill}>{expense.payment.name}</Badge>
            </TableCell>
            <TableCell >
                <div className='w-60'>
                    <p className='dark:text-white whitespace-normal '>
                        {expense.details}
                    </p>
                </div>


            </TableCell>
            <TableCell className="text-right">
                <p className="text-2xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">${expense.amount}</p>
            </TableCell>
            <TableCell className="text-right">
                <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                    {expense.loanMonths ? `${expense.loanMonths} Meses` : "Usa sola Exhibición"}</p>
            </TableCell>
            <TableCell className="text-right">
                <Icon icon={expense.isMonthly ? RiRestartFill : RiCloseCircleLine}
                    color={expense.isMonthly ? "green" : "red"}
                    variant="outlined" tooltip="outlined" size="md" />
            </TableCell>
            <TableCell className="text-right">
                <Button
                    onClick={() => setIsOpenEdit(true)}
                    className='mr-4'
                    color="blue"
                    icon={RiFileEditFill}
                    variant="secondary">
                    Editar
                </Button>
                <Button
                    onClick={() => clickDeleteHandle(true)}
                    color="red"
                    icon={RiDeleteBin5Fill}
                    variant="secondary">
                    Borrar
                </Button>
            </TableCell>
            <DeleteForm
                itemId={expense.id}
                refreshReq={refreshReq}
                isOpen={isOpenDel}
                clickHandle={clickDeleteHandle}
                title="Borrar Gasto"
                msg="Este gasto se eliminara permanentemente, si estas de acuerdo presiona Borrar."
                buttonText="Borrar" />
            <ExpenseForm
                cardInfo={{
                    id:expense.id,
                    categoryId: expense.categoryId,
                    paymentId: expense.paymentId,
                    details: expense.details,
                    expensedAt: new Date(expense.expensedAt),
                    loanMonths: expense.loanMonths,
                    amount: expense.amount,
                    isMonthly: expense.isMonthly,
                    storeId: expense.storeId
                }}
                isOpen={isOpenEdit}
                clickHandle={clickEditHandle} 
                newExpense={false}
                refreshReq={refreshReq}/>
        </TableRow>
    );
}