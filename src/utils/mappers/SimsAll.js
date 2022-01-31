import { createTooltip} from '@/utils';



export const getTableHeaders = () => [
    { name: 'Оператор', key: 'provider', link: false },
    { name: 'Номер в системе', key: 'number', unsortable: false },
    { name: 'IMSI', key: 'imsi', link: false },
    { name: 'Статус', key: 'status', link: false },
    { name: 'Траффик', key: 'traffic', link: false },
    { name: 'Расход', key: 'expense', link: false },
    { name: 'Оборудование', key: 'equipment', link: false }

];

export const getTableFields = (data, props) => data.map(sim => ({
    provider: "Гудлайн",
    imsi: sim.imsi,
    number: sim.number,
    props,
    route: `/fiscalAll/edit/${sim.imsi}`
}));
