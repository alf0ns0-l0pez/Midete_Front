// 'use client';
import TableCardGridCard from './TableCardGridCard';

import {
    TabPanel,
} from '@tremor/react';

export default function TableCardGrid({expenses, refreshReq}) {
    return (
        <TabPanel>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {expenses.map((expense) => (
                    <TableCardGridCard expense={expense} refreshReq={refreshReq}/>
                ))}
            </div>
        </TabPanel>
    );
}