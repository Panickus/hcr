"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const database_1 = __importDefault(require("../config/database"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.sync({ force: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.close();
}));
describe('User API', () => {
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/register')
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    }));
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/register')
            .send({
            email: 'testlogin@example.com',
            password: 'password123',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/login')
            .send({
            email: 'testlogin@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }));
});
