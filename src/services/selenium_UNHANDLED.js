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

const testGoogle = async () => {
    try {
        const driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://google.com')
        await driver.takeScreenshot(image, err) {
            // require('fs').writeFile() 
        }
    } catch(err) {
        console.log(err);
    }

}

hpsmQuery();
