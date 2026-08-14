import { test, Locator } from '@playwright/test';

test.describe('Product Page Tests', () => {
  test('test2', async ({ page }) => {
    // ===== Truy cập trang và vào bài học 2 =====
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText('Bài học 2: Product page').click();

    // ===== Khai báo locator nút Add to cart của từng sản phẩm =====
    // TODO: điền locator thật sau khi Inspect
    const addToCartProduct1 = page.locator('//button[@data-product-id="1"]');
    const addToCartProduct2 = page.locator('//button[@data-product-id="2"]');
    const addToCartProduct3 = page.locator('//button[@data-product-id="3"]');

    // ===== Thêm sản phẩm vào giỏ hàng theo đúng số lượng yêu cầu =====
    // Sản phẩm 1: 2 sản phẩm
    await addProductToCart(addToCartProduct1, 2);

    // Sản phẩm 2: 3 sản phẩm
    await addProductToCart(addToCartProduct2, 3);

    // Sản phẩm 3: 1 sản phẩm
    await addProductToCart(addToCartProduct3, 1);
  });
});

// ===== Hàm phụ: click nút Add to cart N lần =====
// Mỗi lần click = 1 lần trang ghi nhận thêm 1 sản phẩm vào giỏ hàng
async function addProductToCart(button: Locator, quantity: number) {
  for (let i = 0; i < quantity; i++) {
    await button.click();
  }
}