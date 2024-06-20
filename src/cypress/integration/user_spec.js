describe('User Endpoints', () => {
   it('should register a new user', () => {
     cy.request('POST', 'http://localhost:5005/api/users/register', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       expect(response.status).to.eq(201);
       expect(response.body).to.have.property('token');
     });
   });
 
   it('should login a user', () => {
     cy.request('POST', 'http://localhost:5005/api/users/login', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('token');
     });
   });
 
   it('should get user details', () => {
     cy.request('POST', 'http://localhost:5005/api/users/login', {
       email: 'test@example.com',
       password: 'password123',
     }).then((loginResponse) => {
       const token = loginResponse.body.token;
 
       cy.request({
         method: 'GET',
         url: 'http://localhost:5005/api/users/profile',
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((profileResponse) => {
         expect(profileResponse.status).to.eq(200);
         expect(profileResponse.body).to.have.property('email', 'test@example.com');
       });
     });
   });
 });
 