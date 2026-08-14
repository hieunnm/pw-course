import { test } from '@playwright/test';

test.describe('Register Page Tests', () => {
  test('test1', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');

    // Click vào "Bài học 1: Register Page"
    await page.getByText('Bài học 1: Register Page').click();

    // ----- Nhập Username -----
    await page.locator('//input[@id="username"]').fill('hieunnm');

    // ----- Nhập Email -----
    await page.locator('//input[@id="email"]').fill('hieunnm@example.com');

    // ----- Chọn Gender (radio) -----
    await page.locator('//input[@name="gender" and @value="female"]').check();

    // ----- Chọn Hobbies (checkbox - có thể chọn nhiều) -----
    await page.locator('//input[@name="hobbies" and @value="reading"]').check();
    await page.locator('//input[@name="hobbies" and @value="traveling"]').check();

    //  ----- Interests (select multiple -> selectOption với mảng) -----
    await page.locator("//select[@id='interests']").selectOption(['Sports' , 'Technology' ]);

    // ----- Chọn Country (dropdown đơn) -----
    await page.locator('//select[@id="country"]').selectOption('United States');

    // ----- Date of Birth (input type=date -> fill format YYYY-MM-DD) -----
    await page.locator('//input[@id="dob"]').fill('1998-08-07');

    // ----- Profile Picture (input type=file -> setInputFiles) -----
    //await page.locator('//input[@id="profile"]').setInputFiles('CV_NguyenNuMinhHieu_QE_EN');

    // ----- Biography (textarea -> fill) -----
    await page.locator('//textarea[@id="bio"]').fill('My name is Hieu. I am a QA Engineer at V company, working on payment testing.');

    // ----- Click Register -----
    await page.locator("//button[@type='submit']").click();
    //await page.locator("//button[text()='Register']").click();
  });
});