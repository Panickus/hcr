describe('Room Endpoints', () => {
   let token;
   let hotelId;
   let roomId;
 
   before(() => {
     cy.request('POST', 'http://localhost:5005/api/users/login', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       token = response.body.token;
 
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
         hotelId = response.body.id;
       });
     });
   });
 
   it('should create a new room', () => {
     cy.request({
       method: 'POST',
       url: 'http://localhost:5005/api/rooms',
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: {
         hotelId,
         number: 101,
         type: 'single',
         price: 100,
         description: 'Single room with one bed',
         available: true,
       },
     }).then((response) => {
       expect(response.status).to.eq(201);
       expect(response.body).to.have.property('id');
       roomId = response.body.id;
     });
   });
 
   it('should get room details', () => {
     cy.request({
       method: 'GET',
       url: `http://localhost:5005/api/rooms/${roomId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('number', 101);
     });
   });
 
   it('should update room details', () => {
     cy.request({
       method: 'PUT',
       url: `http://localhost:5005/api/rooms/${roomId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: {
         number: 102,
         type: 'double',
         price: 150,
         description: 'Double room with two beds',
         available: false,
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('number', 102);
     });
   });
 
   it('should delete a room', () => {
     cy.request({
       method: 'DELETE',
       url: `http://localhost:5005/api/rooms/${roomId}`,
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }).then((response) => {
       expect(response.status).to.eq(204);
     });
   });
 });
 