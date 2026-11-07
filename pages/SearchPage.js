class SearchPage {

    constructor(page)
    {
        this.page = page;

        this.location = page.locator('#location');
        this.hotels = page.locator('#hotels');
        this.roomType = page.locator('#room_type');
        this.roomNos = page.locator('#room_nos');
        this.checkIn = page.locator('#datepick_in');
        this.checkOut = page.locator('#datepick_out');
        this.adults = page.locator('#adult_room');
        this.children = page.locator('#child_room');
        this.searchButton = page.locator('#Submit');
        this.locationError = page.locator('#location_span');
        this.logoutLink = page.locator('a[href="Logout.php"]');
    }

    async gotoSearchURL()
    {
        await this.page.goto('https://adactinhotelapp.com/SearchHotel.php');
    }

    async searchHotel(location, hotel, roomType, rooms, checkIn, checkOut, adults, children)
    {
        await this.location.selectOption(location);
        await this.hotels.selectOption(hotel);
        await this.roomType.selectOption(roomType);
        await this.roomNos.selectOption(rooms);
        await this.checkIn.fill(checkIn);
        await this.checkOut.fill(checkOut);
        await this.adults.selectOption(adults);
        await this.children.selectOption(children);
        await this.searchButton.click();
    }

    async clickSearch()
    {
        await this.searchButton.click();
    }

    async logout()
    {
        await this.logoutLink.click();
    }

}
export default SearchPage;