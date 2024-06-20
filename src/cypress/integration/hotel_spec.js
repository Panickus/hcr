describe('Hotel Endpoints', () => {
   let token;
   let hotelId;
 
   before(() => {
     cy.request('POST', 'http://localhost:5005/api/users/login', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       token = response.body.token;
     });
   });
 
   it('should create a new hotel', () => {
     cy.request({
       method: 'POST',
       url: 'http://localhost:5005/api/hotels',
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: {
         name: 'Hotel Test',
         location: 'Test Location',
         description: 'A nice place to stay',
         contactInfo: 'test@example.com',
       },
     }).then((response) => {
       expect(response.status).to.eq(201);
       expect(response.body).to.have.property('id');
       hotelId = response.body.id;
     });
   });
 
   it('should get hotel details', () => {
     cy.request({
       method: 'GET',
       url: `http://localhost:5005/api/hotels/${hotelId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('name', 'Hotel Test');
     });
   });
 
   it('should update hotel details', () => {
     cy.request({
       method: 'PUT',
       url: `http://localhost:5005/api/hotels/${hotelId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: {
         name: 'Updated Hotel Test',
         location: 'Updated Location',
         description: 'An even nicer place to stay',
         contactInfo: 'updated@example.com',
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('name', 'Updated Hotel Test');
     });
   });
 
   it('should delete a hotel', () => {
     cy.request({
       method: 'DELETE',
       url: `http://localhost:5005/api/hotels/${hotelId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }).then((response) => {
       expect(response.status).to.eq(204);
     });
   });
 });
 