export type LoginBody = {
  url: string;
  email: string;
  password: string;
};

export type LoginResp = {
  data: {
    refreshToken: string;
    accessToken: string;
    user: {
      id: string;
    };
  };
};
