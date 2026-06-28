const { Builder, By } = require('selenium-webdriver');
const path = require('path');

async function testCalc() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('file:///' + path.resolve('calculator.html'));

        async function setAndClick(a, b, btn) {
            await driver.findElement(By.id('num1')).clear();
            await driver.findElement(By.id('num2')).clear();

            await driver.findElement(By.id('num1')).sendKeys(String(a));
            await driver.findElement(By.id('num2')).sendKeys(String(b));

            await driver.findElement(By.xpath(`//button[text()='${btn}']`)).click();

            return await driver.findElement(By.id('result')).getText();
        }

        // Test Case 1: Addition
        let r = await setAndClick(10, 5, 'ADD');
        console.log(`ADD 10+5 = ${r} | Expected: 15 | ${r==='15'?'PASS':'FAIL'}`);

        // Test Case 2: Subtraction
        r = await setAndClick(10, 3, 'SUB');
        console.log(`SUB 10-3 = ${r} | Expected: 7 | ${r==='7'?'PASS':'FAIL'}`);

        // Test Case 3: Multiplication
        r = await setAndClick(4, 5, 'MUL');
        console.log(`MUL 4*5 = ${r} | Expected: 20 | ${r==='20'?'PASS':'FAIL'}`);

        // Test Case 4: Division
        r = await setAndClick(20, 4, 'DIV');
        console.log(`DIV 20/4 = ${r} | Expected: 5 | ${r==='5'?'PASS':'FAIL'}`);

    } finally {
        await driver.quit();
    }
}

testCalc();
