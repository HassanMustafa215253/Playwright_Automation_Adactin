import {test, expect} from '@playwright/test';
import loginData from '../testdata/loginData.json';
import searchData from '../testdata/searchData.json';
import bookingData from '../testdata/bookingData.json';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage';
import SelectPage from '../pages/SelectPage';
import BookingPage from '../pages/BookingPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import ItineraryPage from '../pages/ItineraryPage';

test('TC02 - Successful login with valid credentials', async ({page}) => {

    const login = new LoginPage(page);
    const user = loginData.validUsers[0];

    await login.gotoURL();
    await expect(login.loginButton).toBeEnabled();
    await login.login(user.username, user.password);

    await expect((login.message).first()).toHaveText(user.ExpectedMsg);
    await expect(page).toHaveTitle('Adactin.com - Search Hotel');

});

test('TC03 - Valid hotel search with correct filters', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];

    await login.gotoURL();
    await login.login(user.username, user.password);

    await expect(search.searchButton).toBeEnabled();
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);

    await expect(page).toHaveTitle('Adactin.com - Select Hotel');
    await expect(select.continueButton).toBeEnabled();

});

test('TC04 - Successful hotel selection and booking', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];
    const b = bookingData.validBooking[0];

    await login.gotoURL();
    await login.login(user.username, user.password);
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);
    await select.selectFirstHotel();

    await expect(page).toHaveTitle('Adactin.com - Book A Hotel');
    await expect(booking.bookNowButton).toBeEnabled();

    await booking.fillBookingForm(b.firstName, b.lastName, b.address, b.ccNumber, b.ccType, b.ccMonth, b.ccYear, b.cvv);
    await booking.clickBookNow();

    await expect(page).toHaveURL('https://adactinhotelapp.com/BookingConfirm.php', {timeout: 20000});

});

test('TC05 - Booking confirmation shown', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const confirm = new ConfirmationPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];
    const b = bookingData.validBooking[0];

    await login.gotoURL();
    await login.login(user.username, user.password);
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);
    await select.selectFirstHotel();
    await booking.fillBookingForm(b.firstName, b.lastName, b.address, b.ccNumber, b.ccType, b.ccMonth, b.ccYear, b.cvv);
    await booking.clickBookNow();

    await expect(confirm.orderNumber).toBeVisible({timeout: 20000});
    await expect(confirm.orderNumber).not.toHaveValue('');
    await expect(confirm.myItineraryButton).toBeEnabled();
    await expect(page).toHaveTitle('Adactin.com - Hotel Booking Confirmation');

});

test('TC06 - Successful logout after booking', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const confirm = new ConfirmationPage(page);
    const itinerary = new ItineraryPage(page);
    const user = loginData.validUsers[0];
    const s = searchData.validSearch[0];
    const b = bookingData.validBooking[0];

    await login.gotoURL();
    await login.login(user.username, user.password);
    await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults, s.children);
    await select.selectFirstHotel();
    await booking.fillBookingForm(b.firstName, b.lastName, b.address, b.ccNumber, b.ccType, b.ccMonth, b.ccYear, b.cvv);
    await booking.clickBookNow();
    await expect(confirm.orderNumber).toBeVisible({timeout: 20000});

    await itinerary.logout();

    await expect(itinerary.logoutMessage).toContainText('You have successfully logged out');
    await expect(page).toHaveTitle('Adactin.com - Logout');

});