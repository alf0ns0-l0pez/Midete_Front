import Donut from "../charts/Donut"
import Line from "../charts/Line"
import {
    TabPanel,
} from '@tremor/react';
import { sumProp } from "../../utils/utils";


const listSet = (data, key) => {
    const newList = data.map((row) => row[key].name)
    return new Set(newList);
}

const filterProp = (data, key, target) => {
    const filterData = data.filter((row) => row[key].name === target);
    return filterData;
}

const buildDataDonut = (data, prop) => {
    const keys = listSet(data, prop);
    const listDonut = Array.from(keys).map((key) => {
        const filterData = filterProp(data, prop, key)
        return {
            name: key,
            amount: sumProp(filterData, "amount"),
            share: '14.3%',
            color: 'bg-fuchsia-500',
        }
    })
    return listDonut;
    
}

export default function Dashboard({ expenses, refreshReq }) {
    //console.log(expenses)
    //console.log(sumProp(expenses, "amount"));
    //console.log(filterProp(expenses, "store", "Amazon"));
    //console.log(listSet(expenses, "store"));
    console.log(buildDataDonut(expenses, "store"));
    return (
        <TabPanel>
            <div className="grid grid-cols-2 gap-6 mt-10">
                <Donut
                    title="Total expenses by Payment"
                    data={buildDataDonut(expenses, "payment")} />
                <Donut
                    title="Total expenses by category"
                    data={buildDataDonut(expenses, "category")} />
                                <Donut
                    title="Total expenses by store"
                    data={buildDataDonut(expenses, "store")} />
            </div>
            <Line />
        </TabPanel>

    )
}