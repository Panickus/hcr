describe('User Registration and Authentication', () => {
   it('should register a new user', () => {
     cy.request('POST', 'http://localhost:5005/api/users/register', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       expect(response.status).to.eq(201);
       expect(response.headers).to.have.property('set-cookie');
       const cookie = response.headers['set-cookie'][0];
       cy.setCookie('token', cookie);
     });
   });
 
   it('should login a user', () => {
     cy.request('POST', 'http://localhost:5005/api/users/login', {
       email: 'test@example.com',
       password: 'password123',
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.headers).to.have.property('set-cookie');
       const cookie = response.headers['set-cookie'][0];
       cy.setCookie('token', cookie);
     });
   });
 
   it('should get user profile with cookie token', () => {
     // Asume que el usuario ya ha iniciado sesión y la cookie está establecida
     cy.setCookie('token', Cypress.env('token')); // Establece el token desde la variable de entorno si es necesario
 
     cy.request({
       method: 'GET',
       url: 'http://localhost:5005/api/users/profile',
       headers: {
         Cookie: `token=${Cypress.env('token')}`,
       },
     }).then((response) => {
       expect(response.status).to.eq(200);
       expect(response.body).to.have.property('email', 'test@example.com');
     });
   });
 });
 