import { test } from '@playwright/test';

test.describe('Todo Page Tests', () => {
  test('test3', async ({ page }) => {
    // ===== Truy cập trang và vào bài học 3 =====
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText('Bài học 3: Todo page').click();

    // ===== Khai báo locator input và nút Add (TODO: điền sau khi Inspect) =====
    const todoInput = page.locator('//input[@id="new-task"]');
    const addButton = page.locator('//button[@id="add-task"]');

    // ===== Bước 1: Thêm mới 100 todo item, nội dung "Todo <i>" =====
    for (let i = 1; i <= 100; i++) {
      await todoInput.fill(`Todo ${i}`);
      await addButton.click();
    }
    
    // ===== Đăng ký xử lý dialog: tự động bấm OK mỗi khi có confirm() =====
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    // ===== Bước 2: Xoá các todo có số lẻ =====
    for (let i = 1; i <= 100; i++) {
      if (i % 2 !== 0) {
        // TODO: điền locator nút xoá tương ứng với item "Todo ${i}"
        const deleteButton = page.locator(`//button[@id="todo-${i}-delete"]`);
        await deleteButton.click();
      }
    }
  });
});