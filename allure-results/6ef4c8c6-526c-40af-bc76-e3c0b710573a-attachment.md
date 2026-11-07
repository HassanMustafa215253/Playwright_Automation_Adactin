# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: positive.spec.js >> TC05 - Booking confirmation shown
- Location: tests\positive.spec.js:70:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#location')

```

# Test source

```ts
  1  | class SearchPage {
  2  | 
  3  |     constructor(page)
  4  |     {
  5  |         this.page = page;
  6  | 
  7  |         this.location = page.locator('#location');
  8  |         this.hotels = page.locator('#hotels');
  9  |         this.roomType = page.locator('#room_type');
  10 |         this.roomNos = page.locator('#room_nos');
  11 |         this.checkIn = page.locator('#datepick_in');
  12 |         this.checkOut = page.locator('#datepick_out');
  13 |         this.adults = page.locator('#adult_room');
  14 |         this.children = page.locator('#child_room');
  15 |         this.searchButton = page.locator('#Submit');
  16 |         this.locationError = page.locator('#location_span');
  17 |         this.logoutLink = page.locator('a[href="Logout.php"]');
  18 |     }
  19 | 
  20 |     async gotoSearchURL()
  21 |     {
  22 |         await this.page.goto('https://adactinhotelapp.com/SearchHotel.php');
  23 |     }
  24 | 
  25 |     async searchHotel(location, hotel, roomType, rooms, checkIn, checkOut, adults, children)
  26 |     {
> 27 |         await this.location.selectOption(location);
     |                             ^ Error: locator.selectOption: Test timeout of 60000ms exceeded.
  28 |         await this.hotels.selectOption(hotel);
  29 |         await this.roomType.selectOption(roomType);
  30 |         await this.roomNos.selectOption(rooms);
  31 |         await this.checkIn.fill(checkIn);
  32 |         await this.checkOut.fill(checkOut);
  33 |         await this.adults.selectOption(adults);
  34 |         await this.children.selectOption(children);
  35 |         await this.searchButton.click();
  36 |     }
  37 | 
  38 |     async clickSearch()
  39 |     {
  40 |         await this.searchButton.click();
  41 |     }
  42 | 
  43 |     async logout()
  44 |     {
  45 |         await this.logoutLink.click();
  46 |     }
  47 | 
  48 | }
  49 | export default SearchPage;
```