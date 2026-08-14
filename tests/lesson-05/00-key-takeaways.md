<option <wbr>

# Tổng hợp kiến thức - Buổi 5

## 1. DOM (Document Object Model)

- **DOM** là cấu trúc cây biểu diễn các phần tử HTML trên trang web, giúp automation "nhìn thấy" và tương tác được với các phần tử.
- Quan hệ **thẻ cha → thẻ con**:

```
  <html>
    <head>
    <body>
```

### Các loại thẻ

- **Thẻ mở**: `<option value="usa">` — có thuộc tính (attribute) và giá trị thuộc tính.
- **Thẻ đóng**: `</option>`
- **Thẻ tự đóng** (self-closing): `<img src="image.jpg" alt="Image description" />`

### Thuộc tính (attribute) trong thẻ HTML

```html
<option value="Phong">Xin chao VN</option>
```

- `value` = thuộc tính, `"Phong"` = giá trị thuộc tính, `Xin chao VN` = text (nội dung hiển thị).

```html
<option value="Phong" selected color="red">Xin chao</option>
```

- `selected`: thuộc tính không có giá trị (empty attribute).
- `value`, `color`: thuộc tính có giá trị.

Ví dụ liệt kê node DOM của 1 thẻ:

```html
<span class="form-control" disabled>Red</span>
```

- `class="form-control"` → thẻ mở, có attribute `class`, value `form-control`
- `disabled` → attribute không có giá trị
- `Red` → text
- `</span>` → thẻ đóng

---

## 2. Cấu trúc chuẩn của 1 trang HTML

```
<html>                     Thẻ gốc của trang
  <head>                   Chứa metadata: tiêu đề, tab, browser
    - Tiêu đề, tab, browser
    - Link CSS, Javascript
    - Thông tin cho Google (SEO)
    - Icon tab (favicon)
  <body>                   Nội dung hiển thị của website
    - Logo
    - Menu
    - Nội dung trang
    - Hình ảnh
    - Footer
```

**Metadata** là gì? → Ví dụ: 1 link khi dán vào chat/mạng xã hội sẽ hiện kênh, tiêu đề, mô tả... đó chính là metadata (thông tin chi tiết, không hiển thị trực tiếp trên trang nhưng máy/Google đọc được).

### Các thẻ HTML thường gặp

**1. Thẻ cấu trúc khung trang:**

| Thẻ       | Ý nghĩa                                                   |
| ---------- | ----------------------------------------------------------- |
| `<html>` | Thẻ gốc của trang                                        |
| `<head>` | Chứa metadata: tiêu đề website, hiển thị trên Google |
| `<body>` | Nội dung của website hiển thị                           |

**2. Thẻ bố cục và ngữ nghĩa (semantic tags):**

| Thẻ          | Ý nghĩa                                 |
| ------------- | ----------------------------------------- |
| `<div>`     | Khối / container chung                   |
| `<header>`  | Thẻ ngữ nghĩa - phần đầu trang      |
| `<footer>`  | Thẻ ngữ nghĩa - phần chân trang      |
| `<nav>`     | Navigation - thanh điều hướng         |
| `<section>` | Thẻ ngữ nghĩa - phân đoạn nội dung |

- `div` = **divide** → dùng để chia ra các khối trong trang.
- `nav` = **navigation**.

**3. Thẻ nội dung:**

| Thẻ                    | Ý nghĩa                                         |
| ----------------------- | ------------------------------------------------- |
| `<h1>` đến `<h6>` | Tiêu đề (heading), giảm dần độ quan trọng |
| `<p>`                 | Paragraph - thẻ đoạn văn                      |
| `<a href="...">`      | Thẻ liên kết (link)                            |
| `<img>`               | Thẻ hình ảnh                                   |
| `<ul>`                | Unordered list - danh sách không thứ tự       |
| `<ol>`                | Ordered list - danh sách có thứ tự            |
| `<li>`                | List item - phần tử trong danh sách            |

**4. Thẻ bảng (table):**

| Thẻ        | Ý nghĩa                           |
| ----------- | ----------------------------------- |
| `<table>` | Bảng                               |
| `<thead>` | Phần đầu bảng (tiêu đề cột) |
| `<tbody>` | Phần thân bảng (dữ liệu)       |
| `<tr>`    | Table row - hàng                   |
| `<th>`    | Ô tiêu đề                       |
| `<td>`    | Table data - ô dữ liệu           |

Cấu trúc DOM của table:

```
table
├── thead (phần đầu)
│   └── tr (hàng tiêu đề)  → hàng
│       └── th (ô tiêu đề)
└── tbody (phần thân)
    └── tr (hàng dữ liệu)  → hàng
        └── td (ô dữ liệu) → table data
```

---

## 3. Automation & Selector

**Automation** = thao tác tự động các phần tử trên trang web (thay vì làm tay).

Các hành động phổ biến: **Input, Fill, Click**.

### Selector (bộ chọn phần tử) - có 3 loại:

1. **XPath**
2. **CSS Selector**
3. **Playwright Selector**

Ví dụ Playwright selector:

```javascript
page.getByText("Add to cart")
```

---

## 4. XPath

**XPath = XML Path** — cú pháp để "đi dọc" theo cấu trúc DOM, dựa vào đặc tính của phần tử để định vị nó.

### Phân loại

- **XPath tuyệt đối**: bắt đầu bởi `1 /` (một dấu `/`) — đi từ gốc DOM, đường dẫn cụ thể qua từng cấp.
- **XPath tương đối**: bắt đầu bởi `2 //` (hai dấu `/`) — tìm phần tử từ bất kỳ đâu trong DOM, không cần đi từ gốc.

### Ví dụ XPath tuyệt đối

Với DOM:

```html
<html>
  <body>
    <form>
      <div class="form-control">
        <input type="text" />
        <span>Username</span>
      </div>
    </form>
  </body>
</html>
```

XPath tuyệt đối tìm thẻ `span`:

```
/html/body/form/div/span
```

→ Nếu có nhiều span cùng cấp, dùng chỉ số index:

```
/span[index]
```

- Lưu ý: index trong XPath **bắt đầu từ 1**, không phải từ 0 (khác với mảng trong JS).

### XPath tương đối

```
//input[@id='user']
```

- Tìm bất kỳ đâu trong DOM có `input` với thuộc tính `id = 'user'`.

> **Mẹo**: Luôn kết hợp attributes như `@id`, `@class`, `@name` để XPath chính xác hơn.

### XPath với text

```html
<div class="playwright">this is a
```

## 5. Playwright cơ bản

### Định nghĩa

**test**: Đơn vị cơ bản để khai báo 1 test.

### Cú pháp khai báo test

```javascript
import { test } from '@playwright/test';

test('<tên test>', async ({ page }) => {
  // Code của test
});
```

### `test.step` - chia test thành các bước rõ ràng

Cú pháp chung của 1 step:

```javascript
await test.step('Tên step', async () => {
  // Code here
});
```

Một test có thể chứa **nhiều step lồng bên trong**:

```javascript
test('tên test', async ({ page }) => {
  await test.step("step 1: Login", async () => {
    // code
  });

  await test.step("step 2: Login", async () => {
    // code
  });
  // ... có thể thêm nhiều step nữa
});
```

### Ví dụ 1 - test đơn giản

```javascript
import { test, expect } from '@playwright/test';

test('Test 1', async ({ page }) => {
  await test.step("Step 1: Fill login information", async () => {
    await page.goto("https://youtube.com");
  });
});
```

### Ví dụ 2 - test đầy đủ với XPath locator

```javascript
import { test, expect } from '@playwright/test';

test('Test 1', async ({ page }) => {
  await test.step("Step 1: Fill login information", async () => {
    await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
    await page.locator('//input[@id="username"]').fill("hihi");
    // Sau này dùng: pressSequentially("...", { delay: 200 })
  });
});
```

### Các hàm thao tác

| Hàm                                          | Ý nghĩa                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `page.goto(url)`                            | Điều hướng đến trang                                                  |
| `page.locator(xpath)`                       | Định vị phần tử bằng XPath/selector                                   |
| `.fill("text")`                             | Điền text vào input (điền nhanh, không giả lập gõ)                 |
| `.click()`                                  | Single click                                                                |
| `.dblclick()`                               | Double click                                                                |
| `pressSequentially("text", { delay: 200 })` | Gõ từng ký tự, có delay giữa mỗi ký tự (giả lập gõ phím thật) |

---

## 6. Buổi tiếp theo (preview)

- **Git**: remote, push, pull, stashing
- **JavaScript**: class
- **Kiến thức bổ sung**: Cấu trúc DOM table

```
table
├── thead (phần đầu)
│   └── tr (hàng tiêu đề) → hàng
│       └── th (ô tiêu đề)
└── tbody (phần thân)
    └── tr (hàng dữ liệu) → hàng
        └── td (ô dữ liệu) → table data
```

### XPath với table

```
// Lấy toàn bộ table
//table[@id='students']

// Lấy hàng 2 trong tbody
//table[@id='students']//tbody/tr[2]

// Lấy cột họ tên ở hàng 1
//table[@id='students']//tbody/tr[1]/td[2]
```

### Bổ sung hàm `test()`

Với DOM sau:
```html
<div class="playwright">this is a text</div>
```
```
//div[text()='this is a text']
```

### Hàm `contains()`

Dùng khi trong phần tử HTML có thể bị thừa/thiếu khoảng trắng hoặc các giá trị không cố định trong text.

```html
<div>Tôi là Alex</div>   <!-- text này có 1 ký tự space ở đầu và ở đuôi -->
<div>Bây giờ là 8:07</div>   <!-- time thay đổi mỗi lần truy cập web -->
```

→ Dùng `contains()`:
```
//div[contains(text(), 'Tôi là Alex')]
//div[contains(text(), 'Bây giờ là:')]
```
Kiến thức bổ sung để làm bài: hàm text()
Hàm text()dùng để tìm ra phần tử có text tương ứng. Ví dụ

Với DOM sau:

<div @class=”playwright”>This is a text</div>

 ## 7. Kiến thức trong bài tập

Để chọn phần tử này, ta dùng cú pháp như sau:

//div[text()=’This is a text’]

Giải thích: Chọn phần tử div mà có text là This is a text

Kiến thức bổ sung để làm bài: hàm contains()
Đôi khi trong phần tử HTML, phần tử sẽ bị thừa khoảng trắng, hoặc có các giá trị không cố định trong text. Ví dụ

<div> Tôi là Alex </div> // Text này có 1 ký tự space ở đầu và ở đuôi

<div> Bây giờ là: 08:07 </div> // Thời gian sẽ tuỳ vào thời điểm truy cập trang web


Để chọn các phần tử này, ta dùng hàm contains(text(), <giá trị cố định>). Ví dụ:

//div[contains(text(), ‘Tôi là Alex’)]

Giải thích: chọn thẻ div, có text chứa cụm từ “Tôi là Alex” – đoạn text có bị thừa space ở đầu và ở cuối, selector vẫn tìm được bình thường.

//div[contains(text(), ‘Bây giờ là:’)]

Giải thích: chọn thẻ div, có chứa cụm từ “Bây giờ là” – đoạn thời gian phía sau có thay đổi thì selector vẫn tìm được bình thường.