const {Builder, By, Key, until}= require('selenium-webdriver');
const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send('test');
})

app.get('/test', (req, res) => {
    const requestSimBody = {
        clicheCode: 'problem_unconfirmed',
        date_start: '12.02.2020',
        date_end:'30.05.2021',
        time_start: '10:00',
        time_end: '22:00',
        service: 'Собачьи ножки',
        isScreenshot: true,
        url: 'https://dogslegs.ru'
    }
    const response = clicheHandler(requestSimBody);
    // console.log(response)
    res.send(response)
})

const clicheHandler = (data) => {
    const {clicheCode, date_start, date_end, time_start, time_end, service, url, isScreenshot} = data;
    switch(clicheCode) {
        case 'problem_unconfirmed':
            return `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
            При проверке вручную недоступность или некорректная работа раздела не зафиксирована${isScreenshot && ' (см. снимок экрана во вложении)'}.
            В ${time_end} система мониторинга сообщила о восстановлении работоспособности раздела «${service}».`
            break;
        case 'problem_confirmed':
            return `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
            При проверке вручную проблема подтвердилась ${isScreenshot && ' (см. снимок экрана во вложении)'}.
            Проблема передана для решения ответственным лицам. / Для решения проблемы направлено обращение в ЦПГУ №${SDNumber}.
            ${date_end} в ${time_end} система мониторинга / технические специалисты / СТП ЦПГУ, в рамках ${SDNumber} сообщили о восстановлении работоспособности раздела «${service}».
            
            Время начала - ${date_start} ${time_start}
            Время окончания - ${date_end} ${time_end}
            Затронутый временной интервал - ХХ часов ХХ минут` //some countings here + выбор между "разделом", "услугой", др.
            break;
        case 'problem_stillFailing':
            `${date_start} в ${time_start} система мониторинга сообщила о возникновении проблем в работе раздела «${service}» - ${url}.
            При проверке вручную некорректная работа раздела не зафиксирована (см. снимок экрана во вложении). Сценарий функционального тестирования провалился из-за изменений ${functionality} в рамках запланированного релиза.
            
            Для корректировки сценария функционального тестирования в СТП С-М направлено обращение №${SDNumber}. В ${time_end} по ${SDNumber} получен ответ - сценарий скорректирован. С указанного времени сборки функциональных тестов выполняются корректно.`
            break;
        case 'problem_underThreshold':
            `Тест зафиксировал незначительное увеличение времени полной загрузки страницы ${url}, вследствие чего было превышено контрольное время выполнения сценария по шагу №${StepN}.
            При проверке вручную, задержек при загрузке страницы обнаружено не было${isScreenshot && ' (см. снимок экрана во вложении)'}.
            `
            break;
    }
}

async function hpsmLogin (driver) {
    try {
        const username = await driver.wait(until.elementLocated(By.id('LoginUsername')), 10000);
        const password = await driver.wait(until.elementLocated(By.id('LoginPassword')), 10000)
        await username.sendKeys('BibaevGA');
        await password.sendKeys('xgQtx7nR')
        await driver.findElement(By.id('loginBtn')).click()
    } catch(err) {
        console.log(err)
    }
}

async function getHpsmQuery(driver, query_id) {
    try {
        const selected = await driver.wait(until.elementLocated(By.id(query_id)), 15000);
        await selected.click();
    } catch(err) {
        console.log(err)
    }
}

async function hpsmQuery() {
    try {
        const driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://sm.mos.ru');

        await hpsmLogin(driver);

        const query_id = 'X6Popup_1';
        await getHpsmQuery(driver, query_id);
    } catch(err) {
        console.log(err)
    }
}

// hpsmQuery();

app.listen(3000)