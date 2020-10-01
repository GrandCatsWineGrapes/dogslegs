export interface Autodata {
    clicheId: string;
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    service: string;
    url: string;
    isScreenshot: boolean;
    step?: number;
    SDNumber?: string;
    functionality?: string;
}

export interface AutomatonWorker {
    data: Autodata;
}

export class AutomatonWorker implements AutomatonWorker {
    private _data: Autodata;
    constructor(receivedData: Autodata) {
        this._data = receivedData
    }
    
    clicheHandler():Promise<string> {
        return new Promise((resolve, reject) => {
            let cliche: string = '';
            switch (this._data.clicheId) {
                case 'problem_unconfirmed':
                    cliche = (()=> {
                        const {date_start, date_end, time_start, time_end, service, url, isScreenshot} = this._data
                        return `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
                            При проверке вручную недоступность или некорректная работа раздела не зафиксирована${isScreenshot ? ' (см. снимок экрана во вложении)': ''}.
                            В ${time_end} система мониторинга сообщила о восстановлении работоспособности раздела «${service}».`
                    })();
                    break;
                case 'problem_confirmed':
                    cliche = (() => {
                        const {date_start, date_end, time_start, time_end, service, url, isScreenshot, SDNumber} = this._data
                        return `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
                        При проверке вручную проблема подтвердилась ${isScreenshot && ' (см. снимок экрана во вложении)'}.
                        Проблема передана для решения ответственным лицам. / Для решения проблемы направлено обращение в ЦПГУ №${SDNumber}.
                        ${date_end} в ${time_end} система мониторинга / технические специалисты / СТП ЦПГУ, в рамках ${SDNumber} сообщили о восстановлении работоспособности раздела «${service}».
                        
                        Время начала - ${date_start} ${time_start}
                        Время окончания - ${date_end} ${time_end}
                        Затронутый временной интервал - ХХ часов ХХ минут`
                    })();
                    //some countings here + выбор между "разделом", "услугой", др.
                    break;
                case 'problem_stillFailing':
                    cliche = (() => {
                        const {date_start, time_start, time_end, service, url, SDNumber, functionality} = this._data
                        return `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
                        При проверке вручную некорректная работа раздела не зафиксирована (см. снимок экрана во вложении). Сценарий функционального тестирования провалился из-за изменений ${functionality} в рамках запланированного релиза.
                        
                        Для корректировки сценария функционального тестирования в СТП С-М направлено обращение №${SDNumber}. В ${time_end} по ${SDNumber} получен ответ - сценарий скорректирован. С указанного времени сборки функциональных тестов выполняются корректно.`
                    })()
                    break;
                case 'problem_underThreshold':
                    cliche = (() => {
                        const {url, isScreenshot, step} =this._data;
                        return `Тест зафиксировал незначительное увеличение времени полной загрузки страницы ${url}, вследствие чего было превышено контрольное время выполнения сценария по шагу №${step}.
                        При проверке вручную, задержек при загрузке страницы обнаружено не было${isScreenshot && ' (см. снимок экрана во вложении)'}.
                        `
                    })()
                    break;
            }

            resolve(cliche);
            reject(new Error('Error in handling cliche'))
        })
    }
}

