# Tổng hợp kiến thức bổ sung - Playwright Actions & Options

## 1. Navigate (page.goto)

### Cú pháp cơ bản

```javascript
import { test } from '@playwright/test';

test.describe('Navigate test', async () => {
  test("Navigate basic", async ({ page }) => {
    await page.goto("https://tailieu.hoctest.com/");
  });
```

### Option `referer`

Giả lập trang mà từ đó user "đến" trang hiện tại (giống header Referer trong HTTP request).

```javascript
  test("Navigate with option referer", async ({ page }) => {
    await page.goto("https://tailieu.hoctest.com/", {
      referer: "https://playwright.com",
    });
  });
};
```

### Option `timeout`

Thời gian tối đa chờ trang load xong, tính bằng mili giây.

```javascript
  test("Navigate with option - timeout", async ({ page }) => {
    await page.goto("https://tailieu.hoctest.com/", {
      timeout: 1000,   // 1 giây
      // Bình thường: 1 - 30s
    });
  });
});
```

### Option `waitUntil`

Xác định thời điểm coi là "trang đã load xong" để chạy bước tiếp theo.

```javascript
test("Navigate with option - waitUntil", async ({ page }) => {
  await page.goto("https://tailieu.hoctest.com/", {
    waitUntil: "commit",
    // → Chỉ cần biết server đã response
    // → Không quan tâm nội dung trang
    // → Không dùng để kiểm tra redirect
  });
});
```

**3 giá trị của `waitUntil`:**

| Giá trị                    | Ý nghĩa                                                               | Khi dùng                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `domcontentloaded` (nhanh) | Khi nào xong? DOM đã được parse xong, có thể truy cập elements | Cần tương tác elements ngay, không cần đợi images/CSS load nặng, trang cũ tài nguyên nặng                          |
| `load` (khuyến dùng)     | Đợi trang load đầy đủ (kể cả ảnh, css)                         | Chắc chắn trang hiển thị đầy đủ, cần chụp screenshot, test giao diện —**90% trường hợp dùng option này** |
| `commit`                   | Chỉ cần biết server đã response, không quan tâm nội dung trang  | Kiểm tra redirect                                                                                                              |

Ví dụ `domcontentloaded`:

```javascript
await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
```

Ví dụ `load` (mặc định, có thể không cần ghi):

```javascript
await page.goto('https://example.com', { waitUntil: 'load' });
// Có thể không cần ghi vì mặc định
await page.goto('https://example.com');
```

---

## 2. Locate (page.locator)

```javascript
import { test } from '@playwright/test';

test.describe('Locate tests', async () => {
  test("Locate basic", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");

    const adsLoc = page.locator("//div[@id='ads-here']");
    const bai1Loc = page.locator("//a[@href='01-xpath-register-page.html']");
  });
});
```

---

## 3. Click

Tham khảo: `playwright.dev/docs/actionability`

```javascript
import { test } from '@playwright/test';

test.describe('Click tests', async () => {
  test("click basic", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");

    const clickArea = page.locator("//div[@id='clickArea']");

    await clickArea.click();
    await clickArea.click({ button: "right" });
    await clickArea.click({ button: "middle" });
    await clickArea.click({ clickCount: 100 });
    // await clickArea.click({ delay: 3000 });

    await clickArea.click({ force: true });     // → Không nên dùng
    await clickArea.click({ modifiers: ['Alt'] });
    await clickArea.click({ position: { x: 100, y: 100 } });
    await clickArea.click({ trial: true });      // → thử mà k thực hiện click
  });
});
```

### Các option của `.click()`

| Option          | Ý nghĩa                                                                  |
| --------------- | -------------------------------------------------------------------------- |
| `button`      | Chọn nút chuột:`"left"` (mặc định), `"right"`, `"middle"`      |
| `clickCount`  | Số lần click liên tiếp                                                 |
| `delay`       | Thời gian giữ chuột giữa mousedown và mouseup                         |
| `force: true` | Ép click dù phần tử không actionable —**không nên dùng**    |
| `modifiers`   | Giữ phím khi click, ví dụ`['Alt']`                                   |
| `position`    | Click vào tọa độ cụ thể trong phần tử:`{ x, y }`                 |
| `trial: true` | Thử xem có click được không nhưng**không thực hiện click** |

---

## 4. Input (text-based)

**3 hàm chính:** `fill`, `press`, `pressSequentially`

```javascript
import { test } from '@playwright/tests';

test.describe('input test', async () => {
  test("Test-based", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/08-input-practice.html");

    const input = page.locator("input[@id='username']");

    // Normal fill
    await input.fill("HocTest.Com");

    // With option
    await input.fill("HocTest.Com", {
      force: true,
      timeout: 10000,
    });
  });
});
```

### Hàm `press()` - bấm 1 phím

```javascript
await input.press("a", {
  delay: 3000,
  timeout: 10000,
});
```

- Có thể bấm phím đặc biệt: `Fn`, hoặc phím thường `A`, `1`,...
- Tham khảo danh sách phím: `developer.mozilla.org/en-US/docs/web/...`

### Hàm `pressSequentially()` - gõ tuần tự từng ký tự

```javascript
await input.pressSequentially("HocTest.Com", {
  delay: 3000,
  timeout: 10000,
});
```

- Giả lập việc gõ phím thật, từng ký tự một, có delay giữa mỗi ký tự.

---

## 5. Input (date, time)

```javascript
import { test } from '@playwright/test';

test.describe('input tests', async () => {
  test("Text-based", async ({ page }) => {
    // ...
  });

  test("Input date", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/03-input-practice.html");

    const birthdayInput = page.locator("//input[@id='birthday']");
    await birthdayInput.fill("2026-01-20");
  });
});
```

### Các loại input date/time và format tương ứng

| Loại input        | Format               | Ví dụ                                    |
| ------------------ | -------------------- | ------------------------------------------ |
| `date`           | `YYYY-MM-DD`       | `2026-01-20`                             |
| `datetime-local` | `YYYY-MM-DDTHH:mm` | `2026-02-01T14:30`                       |
| `month`          | `YYYY-MM`          | `2026-02`                                |
| `week`           | `YYYY-Www`         | `2026-W05` (tuần thứ 5 của năm 2026) |

Ví dụ `datetime-local`:

```javascript
test("Input datetime-local", async ({ page }) => {
  await page.goto("...");

  const meetingInput = page.locator("//input[@id='meeting']");
  // Format: YYYY-MM-DDTHH:mm
  await meetingInput.fill("2026-02-01T14:30");
});
```

Ví dụ `month`:

```javascript
test("Input month", async ({ page }) => {
  await page.goto("...");

  const startMonthInput = page.locator("//input[@id='start-month']");
  // Format: YYYY-MM
  await startMonthInput.fill("2026-02");
});
```

Ví dụ `week`:

```javascript
test("Input week", async ({ page }) => {
  await page.goto("...");

  const workWeekInput = page.locator("//input[@id='work-week']");
  // Format: YYYY-Www (VD: tuần thứ 5 của năm 2026)
  await workWeekInput.fill("2026-W05");
});
```

---

## 6. Selection Inputs (Radio, Checkbox, Dropdown)

### Radio

```javascript
test("Radio - select gender", async ({ page }) => {
  const maleRadio = page.locator("input[name='gender'][value='male']");
  const femaleRadio = page.locator("input[name='gender'][value='female']");

  // Select male
  await maleRadio.check();
  await expect(maleRadio).toBeChecked();

  // Select female (should uncheck male)
  await femaleRadio.check();
  await expect(femaleRadio).toBeChecked();
  await expect(maleRadio).not.toBeChecked();
});
```

### Checkbox

```javascript
test("Checkbox - check and uncheck single", async ({ page }) => {
  const agreeTerms = page.locator("#agree-terms");
  const subscribe = page.locator("#subscribe");

  // Check checkbox
  await agreeTerms.check({ force: true });
  let isChecked = await agreeTerms.isChecked();
  console.log(isChecked);

  // Uncheck checkbox (đã checked by default)
  isChecked = await subscribe.isChecked();
  console.log(isChecked);
  await subscribe.uncheck();
  isChecked = await subscribe.isChecked();
  console.log(isChecked);
});
```

Checkbox nhóm (chọn nhiều):

```javascript
test("Checkbox group - select multiple hobbies", async ({ page }) => {
  const hobbies = page.locator("input[name='hobbies']");

  // Check multiple checkboxes
  await page.locator("input[name='hobbies'][value='gaming']").check();
  await page.locator("input[name='hobbies'][value='traveling']").check();

  // Verify checked
  await expect(page.locator("input[name='hobbies'][value='gaming']")).toBeChecked();
  await expect(page.locator("input[name='hobbies'][value='traveling']")).toBeChecked();
});
```

### Dropdown - Select (`<select>` element)

Chọn theo **value**:

```javascript
test("Select - single dropdown by value", async ({ page }) => {
  const countrySelect = page.locator("#country");

  // Select by value
  await countrySelect.selectOption("vn");
  await expect(countrySelect).toHaveValue("vn");
});
```

Chọn theo **label**:

```javascript
test("Select - single dropdown by label", async ({ page }) => {
  const countrySelect = page.locator("#country");

  // Select by label
  await countrySelect.selectOption({ label: "Japan" });
  await expect(countrySelect).toHaveValue("jp");
});
```

Chọn **nhiều giá trị** (multiple select):

```javascript
test("Select - multiple select", async ({ page }) => {
  const languagesSelect = page.locator("#languages");

  // Select multiple options
  await languagesSelect.selectOption(["vi", "en", "jp"]);

  // Verify selected values
});
```

Chọn từ **optgroup**:

```javascript
test("Select - with optgroup", async ({ page }) => {
  const citySelect = page.locator("#city");

  // Select from Vietnam group
  await citySelect.selectOption("hcm");
  await expect(citySelect).toHaveValue("hcm");

  // Select from USA group
  await citySelect.selectOption({ label: "New York" });
  await expect(citySelect).toHaveValue("nyc");
});
```

### Datalist (dropdown gợi ý + cho phép nhập tự do)

```javascript
test("Datalist - fill with suggestion", async ({ page }) => {
  const frameworkInput = page.locator("#framework");

  // Fill directly (datalist provides autocomplete suggestions)
  await frameworkInput.fill("Playwright");
  await expect(frameworkInput).toHaveValue("Playwright");
});

test("Datalist - fill custom value", async ({ page }) => {
  const frameworkInput = page.locator("#framework");

  // Fill a value not in datalist
  await frameworkInput.fill("Robot Framework");
  await expect(frameworkInput).toHaveValue("Robot Framework");
});
```

- Khác với `<select>`, datalist **cho phép nhập giá trị tùy ý**, không bắt buộc chọn trong danh sách gợi ý.

---

## 7. Upload file

```javascript
import { test } from '@playwright/test';

test.describe('Upload tests', async () => {
  test("Single file upload - using setInputFiles", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/030-upload.html");

    await page.locator("//input[@id='singleFile']").setInputFiles("data/demo.txt");
    await page.locator("//button[@id='uploadSingle']").click();
  });
});
```

- `setInputFiles(path)`: gán file cho input type="file" bằng đường dẫn tới file trên máy.
- Có thể gán trực tiếp trên `page.locator(...).setInputFiles(...)` mà không cần khai báo biến riêng.

---

## 8. Hover

```javascript
import { test } from '@playwright/test';

test.describe('Hover tests', async () => {
  test("Hover tests", async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/pages/003-hover.html");
    await page.locator("//div[@id='tooltip-info']").hover();
  });
});
```

- `.hover()`: di chuột vào phần tử (không click), dùng để test tooltip, menu sổ xuống khi hover, v.v.

---


