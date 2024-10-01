// 'use client';

import {
    Table,
    TableBody,
    TableHead,
    TableHeaderCell,
    TableRow,
    TabPanel,
} from '@tremor/react';



import TableCardListRow from './TableCardListRow';

export default function TableCardList({ expenses, refreshReq }) {
    return (
        <TabPanel>
            <Table>
                <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Fecha
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Categoria
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Tienda
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Tipo de Pago
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong w-2">
                            Descripcion
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Costo
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Meses del Credito
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Suscripcion
                        </TableHeaderCell>
                        <TableHeaderCell>
                            <span className="sr-only">Actions</span>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableCardListRow 
                            expense={expense}
                            refreshReq={refreshReq}/>
                    ))}
                </TableBody>
            </Table>

        </TabPanel>
    )
}