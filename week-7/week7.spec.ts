import { test, expect } from '@playwright/test';
import data from './week7.json'

test('API testing', async({request})=>{
    let baseURL = data.baseURL;

    let r1 = await request.post(`${baseURL}/auth`, {
        data: {
            username: data.username,
            password: data.password
        }, ignoreHTTPSErrors: true
    })
    console.log(await r1.json());
    expect(r1.status()).toBe(200);
  let token = (await r1.json()).token;
    console.log(token);


    let r2 = await request.get(`${baseURL}/booking`, {
        ignoreHTTPSErrors: true
    })
    console.log(await r2.json());
    expect(r2.status()).toBe(200);
    expect((await r2.json()).length).toBeGreaterThan(0);
    let bookingId = (await r2.json())[0].bookingid;
    console.log(bookingId);


    


    let r3 = await request.get(`${baseURL}/booking/${bookingId}`, {
        ignoreHTTPSErrors: true
    })
    console.log(await r3.status());
    console.log(await r3.json());


    expect(r3.status()).toBe(200);
    expect((await r3.json()).totalprice).toBeGreaterThan(0);






    let r4 = await request.post(`${baseURL}/booking`, {
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            totalprice: data.totalprice,
            depositpaid: data.depositpaid,
            bookingdates: {
                checkin: data.bookingdates.checkin,
                checkout: data.bookingdates.checkout
            },
            additionalneeds: data.additionalneeds
        }, ignoreHTTPSErrors: true
    })



    console.log(await r4.status());
    console.log(await r4.json());
    expect(r4.status()).toBe(200);
    expect((await r4.json()).bookingid).toBeTruthy();
    expect((await r4.json()).booking.firstname).toBe(data.firstname);
    expect((await r4.json()).booking.lastname).toBe(data.lastname);
    expect((await r4.json()).booking.totalprice).toBe(data.totalprice);
    expect((await r4.json()).booking.depositpaid).toBe(data.depositpaid);

    let newBookingId = (await r4.json()).bookingid;
    console.log(newBookingId);


  


    let r5 = await request.put(`${baseURL}/booking/${newBookingId}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            totalprice: data.totalprice,
            depositpaid: data.depositpaid,
            bookingdates: {
                checkin: data.bookingdates.checkin,
                checkout: data.bookingdates.checkout
            },
            additionalneeds: data.additionalneeds
        }, ignoreHTTPSErrors: true
    })


    console.log(await r5.status());
    console.log(await r5.json());
    expect(r5.status()).toBe(200);
    expect((await r5.json()).firstname).toBe(data.firstname);
    expect((await r5.json()).lastname).toBe(data.lastname);
    expect((await r5.json()).totalprice).toBe(data.totalprice);
    expect((await r5.json()).depositpaid).toBe(data.depositpaid);

    // Partial Update Booking
    let r6 = await request.patch(`${baseURL}/booking/${newBookingId}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: {
            firstname: data.partialFirstname,
            lastname: data.partialLastname
        }, ignoreHTTPSErrors: true
    })
    console.log(await r6.status());
    console.log(await r6.json());
    expect(r6.status()).toBe(200);
    expect((await r6.json()).firstname).toBe(data.partialFirstname);
    expect((await r6.json()).lastname).toBe(data.partialLastname);




})