const ip = "http://192.168.100.200:4000";

class Api {
  //Auth
  static signUpApi = `${ip}/auth/signUp`;
  static signInApi = `${ip}/auth/signIn`;

  //User
  static getDataApi = `${ip}/user/data`;
}

export default Api;
