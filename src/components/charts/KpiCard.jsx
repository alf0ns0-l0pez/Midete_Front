import { sumProp } from '../../utils/utils';


export default function KpiCard({ expenses, year, month }) {
    return (
        <div className='mb-4'>
            <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Gasto Total
            </h3>
            <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                ${sumProp(expenses, "amount")}
            </p>
            <p className="mt-1 text-tremor-default font-medium">
                <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
                    Fecha:
                </span>
                <span className="ml-2 text-emerald-700 dark:text-emerald-500">
                    {year}/{month}
                </span>
            </p>

        </div>
    );
}