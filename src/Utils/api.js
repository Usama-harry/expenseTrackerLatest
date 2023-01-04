const ip = "http://192.168.100.200:4000";

class Api {
  static signUpApi = `${ip}/auth/signUp`;
  static signInApi = `${ip}/auth/signIn`;
}

export default Api;
