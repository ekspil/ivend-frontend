export const controllerHeaders = {
    number: "Номер контроллера",
    state: "Состояние контроллера",
    mode: "Режим контроллера",
    statMode: "Режим считывания статистики",
    terminalMode: "Режим терминала",
    fiscalMode: "Режим фискализации",
    version: "Версия контроллера",
    printer: "Номер принтера",
    sim: "Номер сим терминала",
    controllerSim: "Номер сим контроллера",
    imsi: "IMSI сим контроллера"
}


export const controllerStates = [
    {name: "Работает", value: "ENABLED"},
    {name: "Не работает", value: "DISABLED"},
    {name: "Отладка", value: "DEBUG"},
]

export const controllerFiscalType = [
    {name: "Нефискальный", value: "NO_FISCAL"},
    {name: "Фискальный", value: "UNAPPROVED"}
]
export const controllerStatType = [
    {name: "Монетник", value: "COINBOX"},
    {name: "Автомат", value: "MACHINE"},
    {name: "Монетник+автомат", value: "COINBOX_MACHINE"},
]
export const controllerType = [
    {name: "PULSE", value: "ps_m_D"},
    {name: "MDB", value: "mdb"},
    {name: "CASHLESS", value: "cashless"},
    {name: "EXE", value: "exe"},
    {name: "RS232", value: "rs232"},
    // {name: "MDB1", value: "mdb1"},
    {name: "MDB2", value: "mdb2"},
    {name: "MECHANIC", value: "mech"},
    // {name: "CASHLESS2", value: "cashless2"},
    // {name: "CASHLESS3", value: "cashless_free"},
    // {name: "PULSE2", value: "ps_m_2"},
    // {name: "PULSE3", value: "ps_m_3"},
    // {name: "PULSE4", value: "ps_p"},
    // {name: "CCTALK", value: "cctlk"},
    // {name: "CCNET", value: "ccnet"},
]
export const controllerTerminal = [
    {name: "Без терминала", value: "NO_BANK_TERMINAL"},
    {name: "PAX D200 Инпас", value: "d200i"},
    {name: "PAX D200 Сбер", value: "d200s"},
    {name: "Vendista", value: "vda1"},
    // {name: "Vendista V2", value: "vda2"},
    {name: "Vendotek VL", value: "vdkl"},
    {name: "Vendotek VX", value: "vdkx"},
    {name: "Worldline VALINA", value: "wvln"},
    // {name: "CASTLES MP200 Vend", value: "mp200_v"},
    // {name: "CASTLES MP200 Trade", value: "mp200_t"},
    // {name: "OTI UNO Vend", value: "otiu_v"},
    // {name: "OTI UNO Trade", value: "otiu_t"},
    // {name: "OTI TRIO Vend", value: "otit_v"},
    // {name: "OTI TRIO Trade", value: "otit_t"},
    // {name: "2CAN V20 Vend", value: "2c20_v"},
    // {name: "2CAN V20 Trade", value: "2c20_t"},
]






export const getStatus = status => {
    switch (status) {
        case 'ENABLED':
            return '<span class="status-icon bg-success"></span> Работает';
        case 'DISABLED':
            return '<span class="status-icon bg-danger"></span> Не работает';
        case 'PAUSED':
            return '<span class="status-icon bg-secondary"></span> Приостановлен';
        case 'DEBUG':
            return '<span class="status-icon bg-yellow"></span> Отладка';
        case 'TRAINING':
            return '<span class="status-icon bg-info"></span> Обучение';
    }
};


export const mapFiscalizationMode = (mode) => {

    const data = controllerFiscalType.find((item) => item.value === mode)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }
}

export const getTerminal = (status) => {
    const data = controllerTerminal.find((item) => item.value === status)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }

}
export const getMode = (mode) => {

    const data = controllerType.find((item) => item.value === mode)
    if(data){
        return data.name
    }
    else {
        return "Неверный тип"
    }
}
