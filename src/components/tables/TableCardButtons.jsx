import { useState } from 'react';
import {
    RiLayoutGridLine,
    RiListCheck,
    RiFilterLine,
    RiLineChartFill,
    RiAddCircleLine
} from '@remixicon/react';
import {
    Tab,
    TabList,
} from '@tremor/react';
import { Button } from '@tremor/react';
import ExpenseForm from '../forms/ExpenseForm';
import { useUserContext } from '../../context/userProvided';
import FilterForm from '../forms/FilterForm';

export default function TableCardButtons({refreshReq}) {
    const [isOpenExpenseForm, setIsOpenExpenseForm] = useState(false);
    const [isOpenFilterForm, setIsOpenFilterForm] = useState(false);
    const clickExpenseFormHandle = (value) => {
        setIsOpenExpenseForm(value);
    }
    const clickFilterFormHandle = (value) => {
        setIsOpenFilterForm(value);
    }
    
    const user = useUserContext();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => clickExpenseFormHandle(true)}
                    color='green'
                    variant="primary"
                    icon={RiAddCircleLine}
                    size='xs'
                    loading={false}>Agregar</Button>
                <Button
                    onClick={() => clickFilterFormHandle(true)}
                    variant="secondary"
                    icon={RiFilterLine}
                    size='xs'
                    loading={false}>Filtrar</Button>
            </div>
            <TabList
                variant="solid"
                className="bg-transparent dark:bg-transparent"
            >
                <Tab
                    icon={RiLineChartFill}
                    className="text-tremor-content ui-selected:text-tremor-content-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
                />
                <Tab
                    icon={RiLayoutGridLine}
                    className="text-tremor-content ui-selected:text-tremor-content-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
                />
                <Tab
                    icon={RiListCheck}
                    className="text-tremor-content ui-selected:text-tremor-content-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
                />

            </TabList>
            <ExpenseForm
                refreshReq={refreshReq}
                isOpen={isOpenExpenseForm}
                clickHandle={clickExpenseFormHandle} />
            <FilterForm
                refreshReq={refreshReq}
                isOpen={isOpenFilterForm}
                clickHandle={clickFilterFormHandle} />
        </div>
    );
}