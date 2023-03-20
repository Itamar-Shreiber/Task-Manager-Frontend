abstract class Config {}

class Development extends Config {
    public urls = {
        login: "http://localhost:8080/api/login",
        admin: "http://localhost:8080/api/admin",
        user: "http://localhost:8080/api/user",
    };
}

class Production extends Config {
    public urls = {
        login: "http://localhost:8080/api/login",
        admin: "http://localhost:8080/api/admin",
        user: "http://localhost:8080/api/user",
    };
}

const global =
    process.env.NODE_ENV === "development"
        ? new Development()
        : new Production();
export default global;
