import {test, expect} from '@playwright/test';
import loginData from '../testdata/loginData.json';
import searchData from '../testdata/searchData.json';
import bookingData from '../testdata/bookingData.json';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage';
import SelectPage from '../pages/SelectPage';
import BookingPage from '../pages/BookingPage';

test('TC07 - Login with invalid username/password', async ({page}) => {

    const login = new LoginPage(page);
    const user = loginData.invalidUsers[0];

    await login.gotoURL();
    await login.login(user.username, user.password);

    await expect(login.errorMessage).toContainText(user.ExpectedMsg);
    await expect(page).toHaveTitle('Adactin.com - Hotel Reservation System');
    await expect(login.loginButton).toBeEnabled();

});

test('TC08 - Search hotel without selecting mandatory fields', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];

    await login.gotoURL();
    await login.login(user.username, user.password);

    await search.clickSearch();

    await expect(search.locationError).toHaveText(s.ExpectedError);
    await expect(page).toHaveTitle('Adactin.com - Search Hotel');

});

test('TC09 - Booking with missing personal details', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];

    await login.gotoURL();
    await login.login(user.username, user.password);
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);
    await select.selectFirstHotel();

    // click Book Now without filling the form
    await booking.clickBookNow();

    await expect(booking.firstNameError).toHaveText('Please Enter your First Name');
    await expect(booking.lastNameError).toHaveText('Please Enter you Last Name'); //Spelling mistake in the website
    await expect(booking.addressError).toHaveText('Please Enter your Address');
    await expect(page).toHaveTitle('Adactin.com - Book A Hotel');

});

test('TC10 - Invalid credit card details during payment', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];
    const b = bookingData.invalidCard[0];

    await login.gotoURL();
    await login.login(user.username, user.password);
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);
    await select.selectFirstHotel();

    await booking.fillBookingForm(b.firstName, b.lastName, b.address, b.ccNumber, b.ccType, b.ccMonth, b.ccYear, b.cvv);
    await booking.clickBookNow();

    await expect(booking.ccNumberError).toHaveText(b.ExpectedError);
    await expect(booking.bookNowButton).toBeEnabled();
    await expect(page).toHaveTitle('Adactin.com - Book A Hotel');

});

test('TC11 - Logout attempt without logging in', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);

    // open a page which needs login, without logging in
    await search.gotoSearchURL();

    await expect(login.loginButton).toBeVisible();
    await expect(page).toHaveTitle('Adactin.com - Hotel Reservation System');

});