const { Builder, By } = require('selenium-webdriver');
const path = require('path');

async function testLogin() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Correct file path
        let filePath = 'file:///' + path.resolve('login.html');
        await driver.get(filePath);

        // Test 1: Valid login
        await driver.findElement(By.id('username')).sendKeys('admin');
        await driver.findElement(By.id('password')).sendKeys('pass123');
        await driver.findElement(By.css('button')).click();

        let msg = await driver.findElement(By.id('msg')).getText();
        console.log('Test 1 (Valid):', msg);

        // Clear fields
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();

        // Test 2: Invalid login
        await driver.findElement(By.id('username')).sendKeys('wrong');
        await driver.findElement(By.id('password')).sendKeys('wrong');
        await driver.findElement(By.css('button')).click();

        msg = await driver.findElement(By.id('msg')).getText();
        console.log('Test 2 (Invalid):', msg);

    } finally {
        await driver.quit();
    }
}

testLogin();
