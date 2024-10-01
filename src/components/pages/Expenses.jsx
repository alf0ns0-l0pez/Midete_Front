import { useEffect, useState } from 'react';
import {
    Divider,
    TabGroup,
    TabPanels,
} from '@tremor/react';
import TableCardButtons from '../tables/TableCardButtons';
import TableCardGrid from '../tables/TableCardGrid';
import TableCardList from '../tables/TableCardList';
import Dashboard from '../layouts/Dashboard';
import KpiCard from '../charts/KpiCard';

import { useUserContext } from '../../context/userProvided';
import useFetch from '../../hooks/useFetch';


export default function TableCard() {
    const [ year, setYear] = useState(new Date().getFullYear());
    const [ month, setMonth] = useState(new Date().getMonth());
    const user = useUserContext();
    const host = import.meta.env.VITE_API_HOST;  
    const successHandle=()=>{

    }
    const expensesRequest = useFetch(
        `${host}/expenses/user/${user.userId}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({year:year,month:month})
        }
        ,
        successHandle
    );
    useEffect(()=>{
        expensesRequest.handleRequest();
    },[user])
    return (
        <div className="lg:px-10">
            <KpiCard expenses={expensesRequest.data}
                year={year}
                month={month}/>
            <TabGroup className="text-right">
                <TableCardButtons refreshReq={expensesRequest.handleRequest}/>
                <Divider className="my-4" />
                <TabPanels>
                    <Dashboard expenses={expensesRequest.data} 
                        refreshReq={expensesRequest.handleRequest}/>
                    <TableCardGrid expenses={expensesRequest.data} 
                        refreshReq={expensesRequest.handleRequest} />
                    <TableCardList expenses={expensesRequest.data} 
                        refreshReq={expensesRequest.handleRequest}/>

                </TabPanels>
            </TabGroup>
        </div>
    );
}